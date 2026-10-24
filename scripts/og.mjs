// Gera public/og.png (1200×630), public/apple-touch-icon.png (180×180) e public/favicon.png (64×64)
// a partir dos assets OFICIAIS já processados em public/img (palco, logo, mockup e emblema).
// Uso: CHROME_PATH=... PLAYWRIGHT_CORE=... node scripts/og.mjs   (rode depois de scripts/assets.mjs)
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const srv = createServer((q, r) => createReadStream(q.url === '/__font' ? process.env.QA_FONT : join(pub, decodeURIComponent(q.url.slice(1)))).on('error', () => r.writeHead(404).end()).pipe(r)).listen(4341);
const u = (f) => `http://localhost:4341/${f}`;
// Inter local opcional (QA_FONT=/caminho/InterVariable.woff2); sem ela, usa a fonte do sistema.
const fontFile = process.env.QA_FONT || '';
const font = fontFile ? `@font-face{font-family:Inter;src:url(${u('__font')});font-weight:100 900}` : '';

const og = `<!doctype html><html><head><style>${font}</style></head><body style="margin:0;width:1200px;height:630px;background:#0E1014;overflow:hidden;position:relative;font-family:Inter,system-ui,sans-serif;color:#F5F6F8">
<img src="${u('img/hero-bg-1672.webp')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 100%;opacity:.3;filter:saturate(.35)">
<div style="position:absolute;inset:0;background:linear-gradient(90deg,#0E1014 0%,rgba(14,16,20,.8) 42%,rgba(14,16,20,0) 72%)"></div>
<img src="${u('img/devices-1428.webp')}" style="position:absolute;right:-30px;bottom:30px;width:620px;filter:drop-shadow(0 28px 36px rgba(0,0,0,.55))">
<img src="${u('img/logo-800.webp')}" style="position:absolute;left:72px;top:68px;height:76px">
<div style="position:absolute;left:74px;top:250px;font-weight:650;font-size:64px;line-height:1.04;letter-spacing:-.04em">Tudo para o digital.<br><span style="color:#9CA3AF">Em um só lugar.</span></div>
<div style="position:absolute;left:76px;bottom:70px;display:flex;align-items:center;gap:12px;font-weight:500;font-size:20px;color:#C4C9D1"><span style="width:8px;height:8px;border-radius:50%;background:#FF1E24"></span>Comunidade exclusiva no Discord</div>
</body></html>`;

const icon = (px) => `<!doctype html><html><body style="margin:0;width:${px}px;height:${px}px;background:#0E1014;display:grid;place-items:center"><img src="${u('img/emblem-480.webp')}" style="width:82%"></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(pub, 'og.png') });
for (const [px, name] of [[180, 'apple-touch-icon.png'], [64, 'favicon.png']]) {
  await page.setViewportSize({ width: px, height: px });
  await page.setContent(icon(px), { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(pub, name) });
}
await browser.close();
srv.close();
console.log('✓ public/og.png, public/apple-touch-icon.png, public/favicon.png');
