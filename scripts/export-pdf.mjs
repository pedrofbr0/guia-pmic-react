import { chromium } from 'playwright';

const url = process.env.PMIC_GUIDE_URL || 'http://localhost:5173';
const out = process.env.PMIC_GUIDE_OUT || './output/pmic-guia-uberlandia-2026.pdf';

try {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await ctx.newPage();

  await page.emulateMedia({ media: 'print' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForTimeout(400);

  // Keep the source HTML structure so Chromium can embed clickable links/anchors.
  await page.evaluate(() => {
    const toolbar = document.querySelector('.guide-preview-toolbar');
    if (toolbar) toolbar.style.display = 'none';

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#fff';

    const guideDoc = document.querySelector('.guide-document');
    if (guideDoc) {
      guideDoc.style.margin = '0';
      guideDoc.style.padding = '0';
      guideDoc.style.width = '210mm';
    }
  });

  const pageCount = await page.evaluate(() => document.querySelectorAll('.pdf-page').length);
  console.log(`Exportando ${pageCount} páginas preservando links e âncoras...`);

  await page.pdf({
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
