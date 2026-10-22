// Gera public/og.png (1200×630) e public/apple-touch-icon.png (180×180) a partir da identidade.
// Uso: CHROME_PATH=... PLAYWRIGHT_CORE=... node scripts/og.mjs
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const mark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" fill="none"><path d="M5.5 35 20 5.5 34.5 35" stroke="#F5F5F5" stroke-width="3.6" stroke-miterlimit="10"/><path d="M11.4 25h17.2" stroke="#FF1E24" stroke-width="3.6"/><circle cx="20" cy="25" r="3.9" fill="#080808" stroke="#FF1E24" stroke-width="2.6"/></svg>`;
const font = `'Space Grotesk','Inter',system-ui,sans-serif`;

const og = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#080808;overflow:hidden;font-family:${font};color:#F5F5F5;position:relative">
<div style="position:absolute;inset:0;background-image:linear-gradient(rgba(245,245,245,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,245,245,.06) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 80% 30%,#000,transparent 75%)"></div>
<div style="position:absolute;right:-220px;top:-260px;width:900px;height:900px;background:radial-gradient(closest-side,rgba(255,30,36,.38),transparent)"></div>
<div style="position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:16px">${mark(52)}<span style="font-weight:700;font-size:30px;letter-spacing:.14em">ATLANTA</span><span style="font-family:monospace;font-size:15px;letter-spacing:.16em;color:#FF383B;border:1px solid rgba(255,30,36,.5);padding:5px 9px;border-radius:5px">HUB</span></div>
<div style="position:absolute;left:80px;bottom:150px;font-weight:700;font-size:92px;line-height:.9;letter-spacing:-.045em;text-transform:uppercase">Tudo para o digital.<br><span style="color:#FF1E24">Em um só lugar.</span></div>
<div style="position:absolute;left:80px;bottom:70px;font-family:monospace;font-size:18px;letter-spacing:.18em;color:#9CA3AF;text-transform:uppercase">Comunidade no Discord · IA · Marketing · Ferramentas · Tecnologia</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,#FF1E24,#FF383B 40%,transparent)"></div>
</body></html>`;

const icon = `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#080808;display:grid;place-items:center;background-image:radial-gradient(closest-side,rgba(255,30,36,.28),transparent)">${mark(112)}</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.screenshot({ path: join(pub, 'og.png') });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: join(pub, 'apple-touch-icon.png') });
await browser.close();
console.log('✓ public/og.png, public/apple-touch-icon.png');
