import { chromium } from 'playwright';

const url = process.env.PROPOSAL_URL || 'http://localhost:5173/proposal.html';
const out = process.env.PROPOSAL_OUT || './output/proposta-comercial-qv-2026.pdf';
const SCALE = 2;

try {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: SCALE,
  });
  const page = await ctx.newPage();

  await page.emulateMedia({ media: 'screen' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForTimeout(800);

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

  console.log(`A4 em pixels do browser: ${dims.w}×${dims.h}px`);

  await page.evaluate(({ pw, ph }) => {
    const toolbar = document.querySelector('.guide-preview-toolbar');
    if (toolbar) toolbar.style.display = 'none';

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#fff';

    const doc = document.querySelector('.guide-document');
    doc.style.margin = '0';
    doc.style.padding = '0';
    doc.style.width = pw + 'px';

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

  await page.waitForTimeout(300);

  const pageCount = await page.evaluate(() => document.querySelectorAll('.pdf-page').length);
  console.log(`Capturando ${pageCount} páginas...`);

  const screenshots = [];
  for (let i = 0; i < pageCount; i++) {
    await page.evaluate((idx) => {
      document.querySelectorAll('.pdf-page')[idx].scrollIntoView({ behavior: 'instant', block: 'start' });
    }, i);
    await page.waitForTimeout(100);

    const element = page.locator('.pdf-page').nth(i);
    const box = await element.boundingBox();
    const img = await element.screenshot({ type: 'png' });
    screenshots.push(img);
    console.log(`  Página ${i + 1}/${pageCount} capturada (${Math.round(box.width)}×${Math.round(box.height)}px)`);
  }

  const pdfPage = await ctx.newPage();
  await pdfPage.emulateMedia({ media: 'print' });

  const imagesBase64 = screenshots.map(buf => buf.toString('base64'));

  await pdfPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { size: A4 portrait; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 210mm; background: #fff; }
        .page-img {
          width: 210mm;
          height: 297mm;
          display: block;
          page-break-after: always;
          break-after: page;
          object-fit: fill;
        }
        .page-img:last-child {
          page-break-after: auto;
          break-after: auto;
        }
      </style>
    </head>
    <body>
      ${imagesBase64.map(b64 => `<img class="page-img" src="data:image/png;base64,${b64}" />`).join('\n')}
    </body>
    </html>
  `, { waitUntil: 'load' });

  await pdfPage.waitForTimeout(500);

  await pdfPage.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF gerado em ${out}`);
} catch (err) {
  console.error(`Erro ao gerar PDF: ${err.message}`);
  if (err.message.includes('ERR_CONNECTION_REFUSED') || err.message.includes('net::')) {
    console.error('O servidor de desenvolvimento está rodando? Execute "npm run dev" primeiro.');
  }
  process.exit(1);
}
