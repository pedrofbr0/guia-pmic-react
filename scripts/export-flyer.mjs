import { chromium } from 'playwright';

const url = process.env.PMIC_FLYER_URL || 'http://localhost:5173/flyer.html';
const out = process.env.PMIC_FLYER_OUT || './output/pmic-flyer-uberlandia-2026.pdf';

try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log(`Flyer PDF gerado em ${out}`);
} catch (err) {
  console.error(`Erro ao gerar flyer PDF: ${err.message}`);
  if (err.message.includes('ERR_CONNECTION_REFUSED') || err.message.includes('net::')) {
    console.error('O servidor de desenvolvimento está rodando? Execute "npm run dev" primeiro.');
  }
  process.exit(1);
}
