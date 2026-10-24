// Captura cada seção isoladamente (revisão visual). Uso: node scripts/sections.mjs 1440 390
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'qa', 'sections');
mkdirSync(out, { recursive: true });
const server = await startServer(4318);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
const widths = process.argv.slice(2).map(Number);
const sel = ['#inicio', '#ecossistema', '#conteudos', '#plataforma', '#como-funciona', '#por-que', '#acesso', '#faq', '.final', '.foot'];

for (const w of widths.length ? widths : [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 812 : 900 } });
  await page.goto('http://localhost:4318', { waitUntil: 'load' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1500);
  // Header fixo e skip link poluem capturas por elemento.
  await page.addStyleTag({ content: '.hdr,.skip{visibility:hidden!important}' });
  for (const s of sel) {
    const el = await page.$(s);
    await el.screenshot({ path: join(out, `${w}-${s.replace(/[#.]/g, '')}.png`) });
  }
  await page.close();
}
await browser.close();
server.close();
console.log('ok');
