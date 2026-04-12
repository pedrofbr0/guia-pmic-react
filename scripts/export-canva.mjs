/**
 * export-canva.mjs
 *
 * Gera PDFs com texto nativo (não rasterizado) do guia e do flyer,
 * para que possam ser importados no Canva com texto editável.
 *
 * A diferença do export-pdf.mjs (que usa screenshots → imagens no PDF)
 * é que aqui o Playwright gera o PDF direto do HTML, preservando texto,
 * vetores e formas como objetos editáveis.
 *
 * Uso:
 *   1. npm run dev              (servidor Vite rodando)
 *   2. npm run export:canva     (gera os PDFs em output/)
 *   3. No Canva: crie um design → File → Upload → selecione o PDF
 *      O Canva converte cada página em um design editável.
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT = resolve(ROOT, 'output');

const DEV_URL = process.env.DEV_URL || 'http://localhost:5173';
const GUIDE_OUT = resolve(OUTPUT, 'canva-guia-pmic-2026.pdf');
const FLYER_OUT = resolve(OUTPUT, 'canva-flyer-pmic-2026.pdf');

mkdirSync(OUTPUT, { recursive: true });

// ---------------------------------------------------------------------------
// helpers — all functions below run inside page.evaluate (browser context)
// ---------------------------------------------------------------------------

const NS_SVG = 'http://www.w3.org/2000/svg';

/**
 * Materialise CSS pseudo-elements (::before / ::after) into real DOM nodes.
 * Circular pseudo-elements (border-radius ≥ 50% of size) become SVGs so that
 * Canva imports them as circles instead of squares.
 */
function materializePseudos() {
  const style = document.createElement('style');
  style.textContent = [
    '.__pm-b::before{display:none!important;content:none!important}',
    '.__pm-a::after{display:none!important;content:none!important}',
  ].join('');
  document.head.appendChild(style);

  const NS = 'http://www.w3.org/2000/svg';
  const allEls = document.querySelectorAll('.pdf-page *, .flyer-page *');

  for (const el of allEls) {
    for (const pseudo of ['::before', '::after']) {
      let ps;
      try { ps = getComputedStyle(el, pseudo); } catch { continue; }
      if (!ps) continue;
      let content = ps.content;
      if (!content || content === 'none' || content === 'normal' || content === '""') continue;

      // ── Resolve content string ──
      let text = content.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

      // Handle counter()
      if (text.indexOf('counter(') !== -1 || text === content) {
        const cm = content.match(/counter\((\w+)/);
        if (cm) {
          const cname = cm[1];
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
        if (text === content || text.indexOf('counter(') !== -1) continue;
      }

      if (!text.trim() && ps.width === 'auto' && ps.height === 'auto') continue;

      // ── Detect circular pseudo-elements ──
      const w = parseFloat(ps.width);
      const h = parseFloat(ps.height);
      const br = parseFloat(ps.borderRadius);
      const bg = ps.backgroundColor;
      const hasBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
      const isCircular = w > 0 && h > 0 && w < 200 && br >= Math.min(w, h) / 2 - 1 && hasBg;

      let node;
      if (isCircular) {
        // Create SVG circle instead of div (Canva can't handle border-radius)
        node = document.createElementNS(NS, 'svg');
        node.setAttribute('xmlns', NS);
        node.setAttribute('width', String(w));
        node.setAttribute('height', String(h));
        node.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        node.style.cssText = 'overflow:visible;flex-shrink:0;';
        node.style.width = w + 'px';
        node.style.height = h + 'px';

        const circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('cx', String(w / 2));
        circle.setAttribute('cy', String(h / 2));
        circle.setAttribute('r', String(Math.min(w, h) / 2));
        circle.setAttribute('fill', bg);
        node.appendChild(circle);

        if (text.trim()) {
          const t = document.createElementNS(NS, 'text');
          t.setAttribute('x', '50%');
          t.setAttribute('y', '50%');
          t.setAttribute('text-anchor', 'middle');
          t.setAttribute('dominant-baseline', 'central');
          t.setAttribute('fill', ps.color);
          t.setAttribute('font-size', ps.fontSize);
          t.setAttribute('font-weight', ps.fontWeight);
          t.setAttribute('font-family', ps.fontFamily);
          t.textContent = text;
          node.appendChild(t);
        }

        // Positioning
        const pos = ps.position;
        if (pos === 'absolute' || pos === 'fixed' || pos === 'relative') {
          node.style.position = pos;
          if (ps.top !== 'auto') node.style.top = ps.top;
          if (ps.left !== 'auto') node.style.left = ps.left;
        }
        node.style.zIndex = ps.zIndex !== 'auto' ? ps.zIndex : '';
        node.style.margin = ps.margin;

      } else {
        // Normal materialization as div
        node = document.createElement('div');
        node.textContent = text;
        const copyProps = [
          'position','display','width','height','minWidth','minHeight','maxWidth','maxHeight',
          'top','left','right','bottom',
          'fontSize','fontFamily','fontWeight','fontStyle','lineHeight','letterSpacing',
          'color','backgroundColor','backgroundImage','background',
          'borderRadius','borderTop','borderBottom','borderLeft','borderRight',
          'padding','margin','textAlign','textTransform',
          'alignItems','justifyContent',
          'zIndex','opacity','boxSizing','overflow',
        ];
        for (const prop of copyProps) {
          try { node.style[prop] = ps[prop]; } catch { /* skip */ }
        }
        node.style.printColorAdjust = 'exact';
        node.style.webkitPrintColorAdjust = 'exact';
      }

      if (pseudo === '::before') {
        el.insertBefore(node, el.firstChild);
        el.classList.add('__pm-b');
      } else {
        el.appendChild(node);
        el.classList.add('__pm-a');
      }
    }
  }
}

/**
 * Convert existing DOM elements with large border-radius + background
 * into SVG circles. This handles real elements (e.g. .guide-section-marker span)
 * that Canva would otherwise import as squares.
 */
function convertCirclesToSvg() {
  const NS = 'http://www.w3.org/2000/svg';
  const allEls = [...document.querySelectorAll('.pdf-page *, .flyer-page *')];

  for (const el of allEls) {
    if (!el.isConnected) continue;
    if (el.tagName === 'SVG' || el.tagName === 'svg' || el.closest('svg')) continue;

    const cs = getComputedStyle(el);
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w <= 0 || h <= 0 || w > 150) continue;

    const br = parseFloat(cs.borderRadius);
    if (isNaN(br) || br < Math.min(w, h) / 2 - 1) continue;

    const bg = cs.backgroundColor;
    if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;

    const color = cs.color;
    const text = el.textContent.trim();
    const fontSize = cs.fontSize;
    const fontWeight = cs.fontWeight;
    const fontFamily = cs.fontFamily;

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.cssText = 'overflow:visible;flex-shrink:0;';
    svg.style.width = w + 'px';
    svg.style.height = h + 'px';

    // Circle
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', String(w / 2));
    circle.setAttribute('cy', String(h / 2));
    circle.setAttribute('r', String(Math.min(w, h) / 2));
    circle.setAttribute('fill', bg);
    svg.appendChild(circle);

    // Text
    if (text) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', '50%');
      t.setAttribute('y', '50%');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('fill', color);
      t.setAttribute('font-size', fontSize);
      t.setAttribute('font-weight', fontWeight);
      t.setAttribute('font-family', fontFamily);
      t.textContent = text;
      svg.appendChild(t);
    }

    // Positioning
    const pos = cs.position;
    if (pos === 'absolute' || pos === 'fixed' || pos === 'relative') {
      svg.style.position = pos;
      if (cs.top !== 'auto') svg.style.top = cs.top;
      if (cs.left !== 'auto') svg.style.left = cs.left;
      if (cs.right !== 'auto') svg.style.right = cs.right;
      if (cs.bottom !== 'auto') svg.style.bottom = cs.bottom;
    }
    svg.style.zIndex = cs.zIndex !== 'auto' ? cs.zIndex : '';
    svg.style.margin = cs.margin;

    const d = cs.display;
    if (d.includes('inline')) {
      svg.style.display = 'inline-block';
      svg.style.verticalAlign = 'middle';
    }

    // Check for box-shadow and add a blurred circle behind
    const shadow = cs.boxShadow;
    if (shadow && shadow !== 'none') {
      const m = shadow.match(/rgba?\([^)]+\)\s+([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/);
      if (m) {
        const blur = parseFloat(m[3]);
        const sc = document.createElementNS(NS, 'circle');
        sc.setAttribute('cx', String(w / 2));
        sc.setAttribute('cy', String(h / 2 + parseFloat(m[2])));
        sc.setAttribute('r', String(Math.min(w, h) / 2));
        sc.setAttribute('fill', 'rgba(0,0,0,0.08)');
        sc.setAttribute('filter', 'url(#blur)');
        // Insert shadow circle before main circle
        svg.insertBefore(sc, circle);
      }
    }

    el.replaceWith(svg);
  }
}

/**
 * Fix word boundaries for Canva's PDF parser.
 * Canva often merges words because Chrome's PDF text output uses glyph-level
 * positioning that doesn't explicitly mark word boundaries.
 *
 * Strategy:
 * 1. Aggressive word-spacing CSS (0.2em) — widens the gap Chrome writes
 *    into the PDF's TJ operator, making word boundaries unambiguous.
 * 2. On leaf text elements, set white-space: pre-wrap so Chrome preserves
 *    explicit space characters in the PDF stream rather than optimising them
 *    into glyph offsets.
 */
function fixWordBoundaries() {
  // Global CSS fix
  const s = document.createElement('style');
  s.textContent = [
    '* {',
    '  word-spacing: 0.2em !important;',
    '  -webkit-print-color-adjust: exact !important;',
    '  print-color-adjust: exact !important;',
    '}',
  ].join('\n');
  document.head.appendChild(s);

  // Walk leaf text elements and force pre-wrap
  const allEls = document.querySelectorAll('.pdf-page *, .flyer-page *');
  for (const el of allEls) {
    if (el.children.length > 0) continue; // only leaf elements
    if (!el.textContent || !el.textContent.trim()) continue;
    const tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG') continue;
    if (el.closest('svg')) continue;

    const cs = getComputedStyle(el);
    // Don't override if already pre/nowrap for a reason
    if (cs.whiteSpace === 'nowrap' || cs.whiteSpace === 'pre') continue;

    el.style.whiteSpace = 'pre-wrap';
  }
}

async function waitForServer(url, maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return true;
    } catch { /* retry */ }
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

/**
 * Prepara a página para impressão:
 *   - Remove toolbars de preview
 *   - Força dimensões exatas de A4 em cada .pdf-page / .flyer-page
 *   - Remove sombras e margens de visualização
 */
async function prepareForPrint(page, selector, containerSelector) {
  // Measure exact A4 pixel dimensions in this browser
  const dims = await page.evaluate(() => {
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

  await page.evaluate(({ sel, contSel, pw, ph }) => {
    // Hide preview toolbar
    const toolbars = document.querySelectorAll(
      '.guide-preview-toolbar, .flyer-preview-toolbar, .no-print'
    );
    toolbars.forEach(t => { t.style.display = 'none'; });

    // Reset body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#fff';

    // Reset container
    if (contSel) {
      const cont = document.querySelector(contSel);
      if (cont) {
        cont.style.margin = '0';
        cont.style.padding = '0';
        cont.style.width = pw + 'px';
      }
    }

    // Force each page to exact A4
    document.querySelectorAll(sel).forEach(p => {
      p.style.width = pw + 'px';
      p.style.height = ph + 'px';
      p.style.minHeight = ph + 'px';
      p.style.maxHeight = ph + 'px';
      p.style.margin = '0';
      p.style.boxShadow = 'none';
      p.style.borderRadius = '0';
      p.style.overflow = 'hidden';
    });

    // Prevent body overflow on page-body elements
    document.querySelectorAll('.page-body').forEach(b => {
      b.style.overflow = 'hidden';
    });
  }, { sel: selector, contSel: containerSelector, pw: dims.w, ph: dims.h });

  await page.waitForTimeout(300);
  return dims;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Verificando servidor em ${DEV_URL} …`);
  if (!(await waitForServer(DEV_URL))) {
    console.error('Servidor não encontrado. Execute "npm run dev" primeiro.');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });

  // ── Guide ──────────────────────────────────────────────────
  console.log('\n──── Exportando Guia (texto editável) ────');
  const guideCtx = await browser.newContext({
    viewport: { width: 1200, height: 900 },
  });
  const guidePage = await guideCtx.newPage();
  await guidePage.goto(DEV_URL, { waitUntil: 'networkidle' });
  await guidePage.waitForFunction(() => document.fonts.ready);
  await guidePage.waitForTimeout(800);

  await prepareForPrint(guidePage, '.pdf-page', '.guide-document');
  await guidePage.evaluate(materializePseudos);
  await guidePage.evaluate(convertCirclesToSvg);
  await guidePage.evaluate(fixWordBoundaries);
  await guidePage.waitForTimeout(300);
  await guidePage.emulateMedia({ media: 'print' });

  const guideCount = await guidePage.evaluate(
    () => document.querySelectorAll('.pdf-page').length,
  );

  await guidePage.pdf({
    path: GUIDE_OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });
  console.log(`Guia: ${guideCount} páginas → ${GUIDE_OUT}`);
  await guideCtx.close();

  // ── Flyer ─────────────────────────────────────────────────
  console.log('\n──── Exportando Flyer (texto editável) ────');
  const flyerCtx = await browser.newContext({
    viewport: { width: 1200, height: 900 },
  });
  const flyerPage = await flyerCtx.newPage();
  await flyerPage.goto(`${DEV_URL}/flyer.html`, { waitUntil: 'networkidle' });
  await flyerPage.waitForFunction(() => document.fonts.ready);
  await flyerPage.waitForTimeout(800);

  await prepareForPrint(flyerPage, '.flyer-page', null);
  await flyerPage.evaluate(materializePseudos);
  await flyerPage.evaluate(convertCirclesToSvg);
  await flyerPage.evaluate(fixWordBoundaries);
  await flyerPage.waitForTimeout(300);
  await flyerPage.emulateMedia({ media: 'print' });

  await flyerPage.pdf({
    path: FLYER_OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });
  console.log(`Flyer: 1 página → ${FLYER_OUT}`);
  await flyerCtx.close();

  await browser.close();

  console.log('\n✓ Concluído!');
  console.log('Próximo passo: importe os PDFs no Canva');
  console.log('  → canva.com ▸ Create a Design ▸ Import file (PDF)');
  console.log('  → O Canva converterá cada página em design editável');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
