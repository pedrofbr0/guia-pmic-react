/**
 * export-figma.mjs
 *
 * Extrai a estrutura DOM do guia e do flyer renderizados pelo Vite,
 * gerando arquivos JSON que podem ser importados no Figma via o plugin
 * em  figma-plugin/.
 *
 * Uso:
 *   1. npm run dev          (servidor Vite rodando)
 *   2. npm run export:figma  (gera os JSONs em output/)
 *   3. No Figma Desktop: Plugins ▸ Development ▸ Import plugin from manifest
 *      → selecione  figma-plugin/manifest.json
 *   4. Execute o plugin, arraste/cole o JSON e clique "Importar".
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT = resolve(ROOT, 'output');

// ---------------------------------------------------------------------------
// Materialize pseudo-elements — runs in the browser before extraction
// Converts ::before / ::after into real DOM elements so the walker can see them
// ---------------------------------------------------------------------------
function materializePseudos() {
  // CSS to suppress original pseudo-elements after materialization
  const style = document.createElement('style');
  style.textContent = [
    '.__pm-b::before{display:none!important;content:none!important}',
    '.__pm-a::after{display:none!important;content:none!important}',
  ].join('');
  document.head.appendChild(style);

  const allEls = document.querySelectorAll('.pdf-page *, .flyer-page *');

  for (const el of allEls) {
    for (const pseudo of ['::before', '::after']) {
      let ps;
      try { ps = getComputedStyle(el, pseudo); } catch (e) { continue; }
      if (!ps) continue;
      let content = ps.content;
      if (!content || content === 'none' || content === 'normal' || content === '""') continue;

      // ── Resolve content string ──
      // Strip surrounding quotes
      let text = content.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

      // Handle counter()
      if (text.indexOf('counter(') !== -1 || text === content) {
        const cm = content.match(/counter\((\w+)/);
        if (cm) {
          const cname = cm[1];
          // Count preceding siblings with counter-increment for this counter
          const parent = el.parentElement;
          if (parent) {
            let idx = 0;
            for (let i = 0; i < parent.children.length; i++) {
              const sib = parent.children[i];
              const sibCs = getComputedStyle(sib);
              if (sibCs.counterIncrement && sibCs.counterIncrement.indexOf(cname) !== -1) {
                idx++;
              }
              if (sib === el) break;
            }
            text = String(idx);
          }
        }
        // If still unresolved, skip
        if (text === content || text.indexOf('counter(') !== -1) continue;
      }

      if (!text.trim() && ps.width === 'auto' && ps.height === 'auto') continue;

      // ── Create real element (div so the walker treats it as block, not inline) ──
      const span = document.createElement('div');
      span.textContent = text;
      span.className = '__pseudo-mat';

      // Copy visual styles from pseudo-element
      const copyProps = [
        'position','display','width','height','minWidth','minHeight','maxWidth','maxHeight',
        'top','left','right','bottom',
        'fontSize','fontFamily','fontWeight','fontStyle','lineHeight','letterSpacing',
        'color','backgroundColor',
        'borderRadius','borderTop','borderBottom','borderLeft','borderRight',
        'padding','margin','textAlign','textTransform',
        'alignItems','justifyContent',
        'zIndex','opacity','boxSizing','overflow',
      ];
      for (const prop of copyProps) {
        try { span.style[prop] = ps[prop]; } catch (e) { /* skip */ }
      }

      // Insert into DOM
      if (pseudo === '::before') {
        el.insertBefore(span, el.firstChild);
        el.classList.add('__pm-b');
      } else {
        el.appendChild(span);
        el.classList.add('__pm-a');
      }
    }
  }
}

// ---------------------------------------------------------------------------
// DOM walker — runs inside the browser context (Playwright page.evaluate)
// ---------------------------------------------------------------------------
function extractPages() {
  // ---------- helpers ----------
  function parseColor(raw) {
    if (!raw || raw === 'transparent' || raw === 'rgba(0, 0, 0, 0)') return null;
    const m = raw.match(
      /rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)/,
    );
    if (!m) return null;
    return {
      r: parseFloat(m[1]) / 255,
      g: parseFloat(m[2]) / 255,
      b: parseFloat(m[3]) / 255,
      a: m[4] !== undefined ? parseFloat(m[4]) : 1,
    };
  }

  // ---------- gradient parser ----------
  function parseGradient(bgImage) {
    if (!bgImage || bgImage === 'none') return null;
    const gm = bgImage.match(/linear-gradient\((.+)\)/);
    if (!gm) return null;

    const raw = gm[1];
    // Extract angle
    let angle = 180; // default top-to-bottom
    const am = raw.match(/^([\d.]+)deg/);
    if (am) angle = parseFloat(am[1]);
    else if (raw.startsWith('to ')) {
      const dm = raw.match(/^to\s+(top|bottom|left|right)/);
      if (dm) {
        const dirs = { top: 0, bottom: 180, left: 270, right: 90 };
        angle = dirs[dm[1]] ?? 180;
      }
    }

    // Extract color stops
    const stops = [];
    const colorRe = /rgba?\(\s*[\d.]+,\s*[\d.]+,\s*[\d.]+(?:,\s*[\d.]+)?\s*\)/g;
    let match;
    while ((match = colorRe.exec(raw)) !== null) {
      const c = parseColor(match[0]);
      if (c) stops.push(c);
    }
    if (stops.length < 2) return null;

    // Assign positions evenly
    return {
      angle,
      stops: stops.map((c, i) => ({
        c,
        p: i / (stops.length - 1),
      })),
    };
  }

  const INLINE_TAGS = new Set([
    'span','strong','b','em','i','a','u','sub','sup','small',
    'abbr','cite','code','mark','q','s','del','ins','kbd','var',
  ]);

  function isInlineEl(el) {
    const s = getComputedStyle(el);
    // Absolutely/fixed positioned elements are never inline for layout purposes
    if (s.position === 'absolute' || s.position === 'fixed') return false;
    // Elements with explicit background or display:flex/grid are blocks
    const d = s.display;
    if (d === 'flex' || d === 'grid' || d === 'inline-flex' || d === 'inline-grid') return false;
    if (INLINE_TAGS.has(el.tagName.toLowerCase())) {
      return d === 'inline' || d === 'inline-block' || d === '';
    }
    return d === 'inline' || d === 'inline-block';
  }

  function isTextLeaf(el) {
    if (el.tagName === 'IMG' || el.tagName === 'SVG' || el.tagName === 'svg') return false;
    const blockChild = Array.from(el.children).find(c => !isInlineEl(c));
    if (blockChild) return false;
    return el.textContent.trim().length > 0;
  }

  // ---------- border helpers ----------
  function parseBorders(s) {
    const sides = ['Top','Right','Bottom','Left'];
    const strokes = [];
    for (const side of sides) {
      const w = parseFloat(s['border' + side + 'Width']) || 0;
      const c = parseColor(s['border' + side + 'Color']);
      if (w > 0 && c && c.a > 0.01) {
        strokes.push({ side: side.toLowerCase(), c, w });
      }
    }
    return strokes;
  }

  // ---------- text runs ----------
  function getTextRuns(el) {
    const runs = [];
    function walk(node) {
      if (node.nodeType === 3) {
        if (node.textContent.length > 0) {
          const p = node.parentElement || el;
          const s = getComputedStyle(p);
          const lhPx = parseFloat(s.lineHeight);
          runs.push({
            t: node.textContent,
            ff: s.fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
            fs: Math.round(parseFloat(s.fontSize) * 10) / 10,
            fw: parseInt(s.fontWeight) || 400,
            fi: s.fontStyle === 'italic',
            c: parseColor(s.color),
            tt: s.textTransform || 'none',
            ls: Math.round((parseFloat(s.letterSpacing) || 0) * 10) / 10,
            lh: isFinite(lhPx) ? Math.round(lhPx * 10) / 10 : undefined,
            td: s.textDecorationLine !== 'none' ? s.textDecorationLine : undefined,
          });
        }
      } else if (node.nodeType === 1) {
        if (node.tagName === 'BR') {
          runs.push({ t: '\n' });
        } else {
          for (const c of node.childNodes) walk(c);
        }
      }
    }
    walk(el);
    return runs;
  }

  // ---------- image → data-url ----------
  function imgToDataUrl(img) {
    try {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return c.toDataURL('image/png');
    } catch (e) {
      return null;
    }
  }

  // ---------- SVG → data-url ----------
  function svgToDataUrl(svg) {
    try {
      const serializer = new XMLSerializer();
      const str = serializer.serializeToString(svg);
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      return null;
    }
  }

  // ---------- recursive walker ----------
  function walkEl(el, pRect, depth) {
    if (depth > 30) return null;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return null;

    const r = el.getBoundingClientRect();
    if (r.width < 0.5 && r.height < 0.5) return null;

    const round1 = v => Math.round(v * 10) / 10;
    const x = round1(r.left - pRect.left);
    const y = round1(r.top - pRect.top);
    const w = round1(r.width);
    const h = round1(r.height);

    const tag = el.tagName.toLowerCase();
    const cls = typeof el.className === 'string' ? el.className.trim() : '';
    const name = cls ? cls.split(/\s+/).filter(c => !c.startsWith('__p')).join('.') || tag : tag;

    const bgc = parseColor(s.backgroundColor);
    const grad = (!bgc || bgc.a < 0.01) ? parseGradient(s.backgroundImage) : null;
    const borders = parseBorders(s);
    const br = parseFloat(s.borderRadius) || 0;
    const op = parseFloat(s.opacity);
    const clip = s.overflow === 'hidden' || s.overflow === 'clip';

    // ---- SVG element → flatten as image ----
    if (tag === 'svg') {
      const dataUrl = svgToDataUrl(el);
      const node = { T: 'IMG', n: name, x, y, w, h, br, op };
      if (dataUrl) node.src = dataUrl;
      return node;
    }

    // ---- <img> ----
    if (tag === 'img') {
      const dataUrl = imgToDataUrl(el);
      const node = { T: 'IMG', n: name, x, y, w, h, br, op };
      if (dataUrl) node.src = dataUrl;
      const fit = s.objectFit;
      if (fit && fit !== 'fill') node.fit = fit;
      return node;
    }

    // ---- text leaf ----
    if (isTextLeaf(el)) {
      const runs = getTextRuns(el);
      if (runs.length === 0 || runs.every(r => !r.t.trim())) return null;

      // Detect text alignment — prefer flex centering over text-align
      const disp = s.display;
      let ta, va;
      if (disp === 'flex' || disp === 'inline-flex') {
        const jc = s.justifyContent;
        ta = (jc === 'center') ? 'CENTER' : (jc === 'flex-end' || jc === 'end') ? 'RIGHT' : 'LEFT';
        const ai = s.alignItems;
        va = (ai === 'center') ? 'CENTER' : (ai === 'flex-end' || ai === 'end') ? 'BOTTOM' : 'TOP';
      } else {
        ta = s.textAlign === 'center'
          ? 'CENTER'
          : s.textAlign === 'right' || s.textAlign === 'end'
            ? 'RIGHT'
            : s.textAlign === 'justify'
              ? 'JUSTIFIED'
              : 'LEFT';
        va = 'TOP';
      }

      // Account for CSS padding — text lives in the content area, not the border box
      const pl = parseFloat(s.paddingLeft) || 0;
      const pt = parseFloat(s.paddingTop) || 0;
      const pr2 = parseFloat(s.paddingRight) || 0;
      const pb = parseFloat(s.paddingBottom) || 0;
      const contentW = round1(Math.max(1, w - pl - pr2));
      const contentH = round1(Math.max(1, h - pt - pb));

      // If the element has a visible background, border or gradient, wrap in a frame
      const hasBg = bgc && bgc.a > 0.01;
      const hasBorder = borders.length > 0;
      const hasGrad = !!grad;
      if (hasBg || hasBorder || hasGrad) {
        const textChild = { T: 'TXT', n: name + '_txt', x: round1(pl), y: round1(pt), w: contentW, h: contentH, runs, ta, op: 1 };
        if (va !== 'TOP') textChild.va = va;
        const frame = {
          T: 'FRM',
          n: name,
          x, y, w, h,
          op,
          fills: hasBg ? [bgc] : [],
          strokes: hasBorder ? borders : [],
          br,
          clip,
          ch: [textChild],
        };
        if (hasGrad) frame.grad = grad;
        return frame;
      }

      // Standalone text — offset by padding
      const textNode = { T: 'TXT', n: name, x: round1(x + pl), y: round1(y + pt), w: contentW, h: contentH, runs, ta, op };
      if (va !== 'TOP') textNode.va = va;
      return textNode;
    }

    // ---- container / frame ----
    const hasBg = bgc && bgc.a > 0.01;
    const hasBorder = borders.length > 0;

    const node = {
      T: 'FRM',
      n: name,
      x, y, w, h, op,
      fills: hasBg ? [bgc] : [],
      strokes: hasBorder ? borders : [],
      br,
      clip,
      ch: [],
    };
    if (grad) node.grad = grad;

    for (const child of el.childNodes) {
      if (child.nodeType === 1) {
        const cn = walkEl(child, r, depth + 1);
        if (cn) node.ch.push(cn);
      } else if (child.nodeType === 3 && child.textContent.trim()) {
        // Bare text node inside a container
        const range = document.createRange();
        range.selectNodeContents(child);
        const tr = range.getBoundingClientRect();
        if (tr.width > 0.5 && tr.height > 0.5) {
          const ps = getComputedStyle(el);
          const blh = parseFloat(ps.lineHeight);
          node.ch.push({
            T: 'TXT',
            n: 'text',
            x: round1(tr.left - r.left),
            y: round1(tr.top - r.top),
            w: round1(tr.width),
            h: round1(tr.height),
            runs: [
              {
                t: child.textContent,
                ff: ps.fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
                fs: Math.round(parseFloat(ps.fontSize) * 10) / 10,
                fw: parseInt(ps.fontWeight) || 400,
                fi: ps.fontStyle === 'italic',
                c: parseColor(ps.color),
                tt: ps.textTransform || 'none',
                ls: Math.round((parseFloat(ps.letterSpacing) || 0) * 10) / 10,
                lh: isFinite(blh) ? Math.round(blh * 10) / 10 : undefined,
              },
            ],
            ta: 'LEFT',
            op: 1,
          });
        }
      }
    }

    return node;
  }

  // ---------- entry point ----------
  const pages = document.querySelectorAll('.pdf-page, .flyer-page');
  if (pages.length === 0) {
    const root = document.querySelector('#root');
    if (!root) return [];
    const rr = root.getBoundingClientRect();
    const result = walkEl(root, { left: rr.left, top: rr.top }, 0);
    return result ? [result] : [];
  }

  return Array.from(pages)
    .map((p, i) => {
      const pr = p.getBoundingClientRect();
      const node = walkEl(p, { left: pr.left, top: pr.top }, 0);
      if (node) node.n = `Page ${i + 1}`;
      return node;
    })
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
async function main() {
  const DEV_URL = process.env.DEV_URL || 'http://localhost:5173';

  console.log(`Verificando servidor em ${DEV_URL} …`);
  let serverOK = false;
  for (let i = 0; i < 10; i++) {
    try {
      const r = await fetch(DEV_URL);
      if (r.ok) { serverOK = true; break; }
    } catch { /* retry */ }
    await new Promise(r => setTimeout(r, 1000));
  }
  if (!serverOK) {
    console.error('Servidor de desenvolvimento indisponível. Execute:  npm run dev');
    process.exit(1);
  }

  mkdirSync(OUTPUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    // ---- Guia ----
    console.log('\n──── Extraindo Guia ────');
    const guideCtx = await browser.newContext({
      viewport: { width: 1200, height: 900 },
      deviceScaleFactor: 1,
    });
    const guidePage = await guideCtx.newPage();
    await guidePage.emulateMedia({ media: 'screen' });
    await guidePage.goto(DEV_URL, { waitUntil: 'networkidle' });
    await guidePage.waitForFunction(() => document.fonts.ready);
    await guidePage.waitForTimeout(1000);

    // Ensure each page has exact A4 dimensions
    const dims = await guidePage.evaluate(() => {
      const el = document.createElement('div');
      el.style.width = '210mm';
      el.style.height = '297mm';
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      document.body.appendChild(el);
      const rect = el.getBoundingClientRect();
      document.body.removeChild(el);
      return { w: Math.round(rect.width), h: Math.round(rect.height) };
    });

    await guidePage.evaluate(({ pw, ph }) => {
      const toolbar = document.querySelector('.guide-preview-toolbar');
      if (toolbar) toolbar.style.display = 'none';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      const doc = document.querySelector('.guide-document');
      if (doc) {
        doc.style.margin = '0';
        doc.style.padding = '0';
        doc.style.width = pw + 'px';
      }
      document.querySelectorAll('.pdf-page').forEach(p => {
        p.style.width = pw + 'px';
        p.style.height = ph + 'px';
        p.style.minHeight = ph + 'px';
        p.style.maxHeight = ph + 'px';
        p.style.margin = '0';
        p.style.boxShadow = 'none';
        p.style.borderRadius = '0';
        p.style.overflow = 'hidden';
      });
      document.querySelectorAll('.page-body').forEach(b => {
        b.style.overflow = 'hidden';
      });
    }, dims);

    await guidePage.waitForTimeout(400);

    // Materialize pseudo-elements (::before, ::after) into real DOM before extraction
    await guidePage.evaluate(materializePseudos);
    await guidePage.waitForTimeout(200);

    const guideNodes = await guidePage.evaluate(extractPages);
    const guidePath = resolve(OUTPUT, 'figma-guide.json');
    writeFileSync(
      guidePath,
      JSON.stringify({ name: 'Guia PMIC 2026', pages: guideNodes }, null, 2),
    );
    console.log(`Guia: ${guideNodes.length} páginas → ${guidePath}`);
    await guideCtx.close();

    // ---- Flyer ----
    console.log('\n──── Extraindo Flyer ────');
    const flyerCtx = await browser.newContext({
      viewport: { width: 1200, height: 900 },
      deviceScaleFactor: 1,
    });
    const flyerPage = await flyerCtx.newPage();
    await flyerPage.emulateMedia({ media: 'screen' });
    await flyerPage.goto(`${DEV_URL}/flyer.html`, { waitUntil: 'networkidle' });
    await flyerPage.waitForFunction(() => document.fonts.ready);
    await flyerPage.waitForTimeout(1000);

    // Materialize pseudo-elements (::before, ::after) into real DOM before extraction
    await flyerPage.evaluate(materializePseudos);
    await flyerPage.waitForTimeout(200);

    const flyerNodes = await flyerPage.evaluate(extractPages);
    const flyerPath = resolve(OUTPUT, 'figma-flyer.json');
    writeFileSync(
      flyerPath,
      JSON.stringify({ name: 'Flyer PMIC 2026', pages: flyerNodes }, null, 2),
    );
    console.log(`Flyer: ${flyerNodes.length} páginas → ${flyerPath}`);
    await flyerCtx.close();
  } finally {
    await browser.close();
  }

  console.log('\n✓ Concluído!');
  console.log('Próximo passo: importe os JSONs no Figma usando o plugin em figma-plugin/');
  console.log('  → Figma Desktop ▸ Plugins ▸ Development ▸ Import plugin from manifest');
  console.log('  → Selecione  figma-plugin/manifest.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
