/* =========================================================
 *  PMIC -> Figma Importer  --  Plugin code (code.js)
 *
 *  Le o JSON gerado por  scripts/export-figma.mjs  e recria
 *  a arvore visual no Figma como frames, textos, retangulos
 *  e imagens -- tudo 100% editavel.
 *
 *  NOTA: O sandbox do Figma usa um parser JS limitado (ES5).
 *  Nao usar: spread (...), for-of, arrow functions,
 *  template literals, shorthand properties, bare catch.
 * ========================================================= */

figma.showUI(__html__, { width: 520, height: 620, themeColors: true });

var fontCache = {};

function makeSolid(c, opOverride) {
  return {
    type: 'SOLID',
    color: { r: c.r, g: c.g, b: c.b },
    opacity: opOverride !== undefined ? opOverride : (c.a != null ? c.a : 1)
  };
}

function makeGradientFill(grad) {
  var stops = [];
  for (var g = 0; g < grad.stops.length; g++) {
    var s = grad.stops[g];
    stops.push({
      position: s.p,
      color: { r: s.c.r, g: s.c.g, b: s.c.b, a: s.c.a != null ? s.c.a : 1 }
    });
  }
  var angleRad = ((grad.angle || 180) - 90) * Math.PI / 180;
  var cos = Math.cos(angleRad);
  var sin = Math.sin(angleRad);
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: stops,
    gradientTransform: [
      [cos, sin, 0.5 - cos * 0.5 - sin * 0.5],
      [-sin, cos, 0.5 + sin * 0.5 - cos * 0.5]
    ]
  };
}

async function loadFontSafe(family, weight, italic) {
  var W = {
    100: 'Thin', 200: 'ExtraLight', 300: 'Light',
    400: 'Regular', 500: 'Medium', 600: 'SemiBold',
    700: 'Bold', 800: 'ExtraBold', 900: 'Black'
  };
  var bucket =
    weight <= 100 ? 100 :
    weight <= 250 ? 200 :
    weight <= 350 ? 300 :
    weight <= 450 ? 400 :
    weight <= 550 ? 500 :
    weight <= 650 ? 600 :
    weight <= 750 ? 700 :
    weight <= 850 ? 800 : 900;
  var style = W[bucket] || 'Regular';
  if (italic) style = style + ' Italic';
  var key = family + '::' + style;
  if (fontCache[key]) return fontCache[key];
  var attempts = [
    { family: family, style: style },
    { family: family, style: 'Regular' },
    { family: 'Inter', style: style },
    { family: 'Inter', style: 'Regular' }
  ];
  if (italic) {
    attempts.splice(1, 0, { family: family, style: W[bucket] || 'Regular' });
    attempts.splice(4, 0, { family: 'Inter', style: W[bucket] || 'Regular' });
  }
  for (var a = 0; a < attempts.length; a++) {
    try {
      await figma.loadFontAsync(attempts[a]);
      fontCache[key] = attempts[a];
      return attempts[a];
    } catch (e) { /* try next */ }
  }
  var fb = { family: 'Inter', style: 'Regular' };
  try { await figma.loadFontAsync(fb); } catch (e) { /* nothing */ }
  fontCache[key] = fb;
  return fb;
}

function applyStrokes(node, data) {
  if (!data.strokes || !data.strokes.length) return;
  var first = data.strokes[0];
  var uniform = true;
  for (var i = 1; i < data.strokes.length; i++) {
    var s = data.strokes[i];
    if (s.w !== first.w || s.c.r !== first.c.r || s.c.g !== first.c.g || s.c.b !== first.c.b) {
      uniform = false;
      break;
    }
  }
  if (data.strokes.length === 4 && uniform) {
    node.strokes = [makeSolid(first.c)];
    node.strokeWeight = first.w || 1;
  } else {
    node.strokes = [makeSolid(first.c)];
    var sideMap = { top: 0, right: 0, bottom: 0, left: 0 };
    for (var j = 0; j < data.strokes.length; j++) {
      sideMap[data.strokes[j].side] = data.strokes[j].w;
    }
    node.strokeTopWeight = sideMap.top;
    node.strokeRightWeight = sideMap.right;
    node.strokeBottomWeight = sideMap.bottom;
    node.strokeLeftWeight = sideMap.left;
  }
}

async function buildNode(data, parent) {
  if (!data) return null;
  var i, len, run, font;

  if (data.T === 'FRM') {
    var f = figma.createFrame();
    f.name = data.n || 'Frame';
    f.x = data.x || 0;
    f.y = data.y || 0;
    f.resize(Math.max(1, data.w || 1), Math.max(1, data.h || 1));
    f.layoutMode = 'NONE';
    f.clipsContent = data.clip ? true : false;
    if (data.grad) {
      f.fills = [makeGradientFill(data.grad)];
    } else if (data.fills && data.fills.length) {
      var fFills = [];
      for (i = 0; i < data.fills.length; i++) {
        fFills.push(makeSolid(data.fills[i]));
      }
      f.fills = fFills;
    } else {
      f.fills = [];
    }
    applyStrokes(f, data);
    if (data.br) f.cornerRadius = data.br;
    if (data.op != null && data.op < 1) f.opacity = data.op;
    if (data.ch) {
      for (i = 0; i < data.ch.length; i++) {
        await buildNode(data.ch[i], f);
      }
    }
    parent.appendChild(f);
    return f;
  }

  if (data.T === 'TXT') {
    var runs = data.runs || [];
    if (!runs.length) return null;
    var fullText = '';
    var resolvedRuns = [];
    for (i = 0; i < runs.length; i++) {
      run = runs[i];
      var txt = run.t || '';
      if (run.tt === 'uppercase') txt = txt.toUpperCase();
      else if (run.tt === 'lowercase') txt = txt.toLowerCase();
      else if (run.tt === 'capitalize') txt = txt.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
      resolvedRuns.push({
        t: run.t, ff: run.ff, fs: run.fs, fw: run.fw, fi: run.fi,
        c: run.c, tt: run.tt, ls: run.ls, lh: run.lh, td: run.td, resolved: txt
      });
      fullText = fullText + txt;
    }
    if (!fullText.trim()) return null;
    var t = figma.createText();
    t.name = data.n || 'Text';
    t.x = data.x || 0;
    t.y = data.y || 0;
    var first = null;
    for (i = 0; i < resolvedRuns.length; i++) {
      if (resolvedRuns[i].ff) { first = resolvedRuns[i]; break; }
    }
    if (!first) first = resolvedRuns[0];
    var defaultFont = await loadFontSafe(first.ff || 'Inter', first.fw || 400, first.fi || false);
    t.fontName = defaultFont;
    t.characters = fullText;
    // Figma font metrics render ~2-4% wider than Chrome for the same font/size.
    // Add a proportional width buffer so text wraps at the same points as in
    // the browser (preventing extra line breaks that cause overlap).
    // Min 3px to cover small text boxes (footer links, tags, etc.).
    var wBuf = Math.max(3, Math.round((data.w || 200) * 0.03));
    t.resize(Math.max(1, (data.w || 200) + wBuf), Math.max(1, data.h || 20));
    t.textAutoResize = 'HEIGHT';
    var alignMap = { LEFT: 'LEFT', CENTER: 'CENTER', RIGHT: 'RIGHT', JUSTIFIED: 'JUSTIFIED' };
    t.textAlignHorizontal = alignMap[data.ta] || 'LEFT';
    var vaMap = { TOP: 'TOP', CENTER: 'CENTER', BOTTOM: 'BOTTOM' };
    t.textAlignVertical = vaMap[data.va] || 'TOP';
    var off = 0;
    for (i = 0; i < resolvedRuns.length; i++) {
      run = resolvedRuns[i];
      len = run.resolved.length;
      if (len === 0) continue;
      try {
        if (run.ff) {
          font = await loadFontSafe(run.ff, run.fw || 400, run.fi || false);
          t.setRangeFontName(off, off + len, font);
        }
        if (run.fs) t.setRangeFontSize(off, off + len, run.fs);
        if (run.c) {
          t.setRangeFills(off, off + len, [makeSolid(run.c)]);
        }
        if (run.ls) {
          t.setRangeLetterSpacing(off, off + len, { value: run.ls, unit: 'PIXELS' });
        }
        if (run.lh) {
          t.setRangeLineHeight(off, off + len, { value: run.lh, unit: 'PIXELS' });
        }
      } catch (e) { /* skip */ }
      off = off + len;
    }
    if (data.op != null && data.op < 1) t.opacity = data.op;
    parent.appendChild(t);
    return t;
  }

  if (data.T === 'IMG') {
    var ri = figma.createRectangle();
    ri.name = data.n || 'Image';
    ri.x = data.x || 0;
    ri.y = data.y || 0;
    ri.resize(Math.max(1, data.w || 1), Math.max(1, data.h || 1));
    if (data.src) {
      try {
        var base64str = data.src.split(',')[1];
        var bytes = figma.base64Decode(base64str);
        var img = figma.createImage(bytes);
        var scaleMode = data.fit === 'contain' ? 'FIT' : 'FILL';
        ri.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: scaleMode }];
      } catch (e) {
        ri.fills = [{ type: 'SOLID', color: { r: 0.92, g: 0.92, b: 0.92 } }];
      }
    } else {
      ri.fills = [{ type: 'SOLID', color: { r: 0.92, g: 0.92, b: 0.92 } }];
    }
    if (data.br) ri.cornerRadius = data.br;
    if (data.op != null && data.op < 1) ri.opacity = data.op;
    parent.appendChild(ri);
    return ri;
  }

  if (data.T === 'RECT') {
    var rr = figma.createRectangle();
    rr.name = data.n || 'Rectangle';
    rr.x = data.x || 0;
    rr.y = data.y || 0;
    rr.resize(Math.max(1, data.w || 1), Math.max(1, data.h || 1));
    if (data.fills && data.fills.length) {
      var rectFills = [];
      for (i = 0; i < data.fills.length; i++) {
        rectFills.push(makeSolid(data.fills[i]));
      }
      rr.fills = rectFills;
    }
    if (data.br) rr.cornerRadius = data.br;
    if (data.op != null && data.op < 1) rr.opacity = data.op;
    parent.appendChild(rr);
    return rr;
  }

  return null;
}

figma.ui.onmessage = async function(msg) {
  if (msg.type === 'import') {
    var data = msg.data;
    var total = data.pages ? data.pages.length : 0;
    figma.notify('Importando ' + total + ' pagina(s)... aguarde.');
    try {
      for (var i = 0; i < total; i++) {
        var pd = data.pages[i];
        if (!pd) continue;
        pd.x = i * ((pd.w || 794) + 100);
        pd.y = 0;
        var node = await buildNode(pd, figma.currentPage);
        if (node) node.name = pd.n || ('Page ' + (i + 1));
        figma.ui.postMessage({ type: 'progress', current: i + 1, total: total });
      }
      figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
      figma.notify('Pronto! ' + total + ' pagina(s) importada(s) de "' + (data.name || 'design') + '"');
    } catch (err) {
      figma.notify('Erro na importacao: ' + err.message, { error: true });
    }
  }
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};