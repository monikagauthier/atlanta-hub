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
const srv = createServer((q, r) => createReadStream(join(pub, decodeURIComponent(q.url.slice(1)))).on('error', () => r.writeHead(404).end()).pipe(r)).listen(4341);
const u = (f) => `http://localhost:4341/${f}`;
const font = `@font-face{font-family:SG;src:url(${u('fonts/SpaceGrotesk-Variable.ttf')});font-weight:300 700}`;

const og = `<!doctype html><html><head><style>${font}</style></head><body style="margin:0;width:1200px;height:630px;background:#080808;overflow:hidden;position:relative;font-family:SG,sans-serif;color:#F5F5F5">
<img src="${u('img/hero-bg-1672.webp')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 100%">
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,8,8,.95) 0%,rgba(8,8,8,.75) 40%,rgba(8,8,8,.1) 70%)"></div>
<img src="${u('img/devices-1428.webp')}" style="position:absolute;right:-30px;bottom:24px;width:620px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.8))">
<img src="${u('img/logo-800.webp')}" style="position:absolute;left:72px;top:64px;height:92px">
<div style="position:absolute;left:76px;top:252px;font-weight:700;font-size:70px;line-height:.95;letter-spacing:-.04em;text-transform:uppercase">Tudo para<br>o digital.<br><span style="color:#FF1E24">Em um só lugar.</span></div>
<div style="position:absolute;left:78px;bottom:62px;font-weight:600;font-size:17px;letter-spacing:.14em;color:#d9dbe0;text-transform:uppercase">Comunidade exclusiva no Discord</div>
</body></html>`;

const icon = (px) => `<!doctype html><html><body style="margin:0;width:${px}px;height:${px}px;background:#080808;display:grid;place-items:center"><img src="${u('img/emblem-480.webp')}" style="width:82%"></body></html>`;

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
