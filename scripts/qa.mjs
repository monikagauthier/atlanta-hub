// QA automatizado: overflow horizontal, imagens quebradas, erros de console,
// alvos de toque, filtros, FAQ, menu, abas e CTA de checkout — em 6 larguras.
// Requer playwright-core. Uso:
//   QA_URL=http://localhost:4173 CHROME_PATH=/caminho/chrome PLAYWRIGHT_CORE=/caminho/playwright-core node scripts/qa.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { startServer } from './serve.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let server = null;
if (!process.env.QA_URL) server = await startServer(4317);
const URL = process.env.QA_URL || 'http://localhost:4317';
const SHOTS = process.env.QA_SHOTS || join(root, 'qa', 'screens');
const FULL = process.env.QA_FULL !== '0';
const WIDTHS = [375, 390, 768, 1024, 1440, 1920];
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox'],
});

const results = [];
const fail = (r, msg) => r.issues.push(msg);

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += Math.round(innerHeight * 0.6)) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 400));
  });
}

for (const width of WIDTHS) {
  const height = width < 768 ? 812 : width < 1440 ? 900 : 1000;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: width < 1024 });
  const page = await ctx.newPage();
  const r = { width, issues: [], checks: [] };
  const consoleErrors = [];
  // Fontes do Google são ignoradas: sem internet no ambiente de QA, a página usa os fallbacks.
  const isFont = (u = '') => /fonts\.(googleapis|gstatic)\.com/.test(u);
  page.on('console', (m) => m.type() === 'error' && !isFont(m.location()?.url) && !isFont(m.text()) && consoleErrors.push(`${m.text()} @ ${m.location()?.url}`));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  page.on('requestfailed', (q) => !/fonts\.(googleapis|gstatic)/.test(q.url()) && consoleErrors.push('requestfailed ' + q.url()));

  await page.goto(URL, { waitUntil: 'load' });
  await scrollThrough(page);
  await page.screenshot({ path: join(SHOTS, `${width}-hero.png`) });
  if (FULL) await page.screenshot({ path: join(SHOTS, `${width}-full.png`), fullPage: true });

  // 1. Overflow horizontal
  const ov = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      if (s.position === 'fixed' || el.closest('[aria-hidden="true"], .ticker, .filters, .mnav, .final__word')) continue;
      const b = el.getBoundingClientRect();
      if (b.width && (b.right > vw + 1 || b.left < -1)) offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} (${Math.round(b.left)}→${Math.round(b.right)})`);
    }
    return { sw: document.documentElement.scrollWidth, vw, offenders: offenders.slice(0, 8) };
  });
  r.checks.push(`scrollWidth ${ov.sw} / viewport ${ov.vw}`);
  if (ov.sw > ov.vw) fail(r, `rolagem horizontal: ${ov.sw}px > ${ov.vw}px`);
  if (ov.offenders.length) fail(r, `elementos além da viewport: ${ov.offenders.join(', ')}`);

  // 2. Imagens quebradas
  // Força o carregamento das imagens lazy e espera decodificar: só falha de verdade conta.
  const broken = await page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); }));
    return imgs.filter((i) => i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
  });
  if (broken.length) fail(r, `imagens quebradas: ${broken.join(', ')}`);

  // 3. Alvos de toque (mobile) — botões e links interativos visíveis
  if (width < 768) {
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a.btn, button, .hdr__burger, .filter')]
        .filter((e) => e.offsetParent !== null)
        .map((e) => ({ t: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30), h: e.getBoundingClientRect().height }))
        .filter((x) => x.h < 40),
    );
    if (small.length) fail(r, `alvos de toque < 40px: ${JSON.stringify(small)}`);
    else r.checks.push('alvos de toque ≥ 40px');
  }

  // 4. Links internos apontam para IDs existentes
  const deadAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.querySelector(h)),
  );
  if (deadAnchors.length) fail(r, `âncoras sem destino: ${[...new Set(deadAnchors)].join(', ')}`);

  // 5. Filtros do catálogo
  const expected = await page.evaluate(() => {
    const out = {};
    document.querySelectorAll('[data-filter]').forEach((b) => {
      const f = b.dataset.filter;
      out[f] = f === 'todos' ? document.querySelectorAll('.tile').length : document.querySelectorAll(`.tile[data-groups~="${f}"]`).length;
    });
    return out;
  });
  for (const [f, n] of Object.entries(expected)) {
    await page.click(`[data-filter="${f}"]`);
    await page.waitForTimeout(80);
    const st = await page.evaluate(() => ({
      count: Number(document.querySelector('[data-cat-count]').textContent),
      visible: [...document.querySelectorAll('.tile')].filter((t) => !t.hidden).length,
      more: !document.querySelector('[data-cat-more]').hidden,
      pressed: document.querySelector('[data-filter][aria-pressed="true"]').dataset.filter,
    }));
    if (st.count !== n || st.pressed !== f) fail(r, `filtro ${f}: contador ${st.count}, esperado ${n}`);
    if (!st.more && st.visible !== n) fail(r, `filtro ${f}: ${st.visible} visíveis, esperado ${n}`);
    if (st.more) {
      await page.click('[data-cat-more]');
      const v = await page.evaluate(() => [...document.querySelectorAll('.tile')].filter((t) => !t.hidden).length);
      if (v !== n) fail(r, `filtro ${f} expandido: ${v} visíveis, esperado ${n}`);
    }
  }
  r.checks.push(`filtros ok (${Object.keys(expected).length})`);
  await page.click('[data-filter="todos"]');

  // 6. FAQ: abre e fecha, um por vez
  await page.locator('.qa__q').nth(0).click();
  await page.locator('.qa__q').nth(2).click();
  const faq = await page.evaluate(() => [...document.querySelectorAll('.qa__q')].map((b) => b.getAttribute('aria-expanded')));
  if (faq.filter((x) => x === 'true').length !== 1 || faq[2] !== 'true') fail(r, `FAQ estado inesperado: ${faq}`);
  else r.checks.push('FAQ acordeão ok');
  await page.locator('.qa__q').nth(2).click();

  // 7. Abas da plataforma
  const tabs = await page.$$('[data-zone-tab]');
  for (const t of tabs) {
    await t.click();
    const z = await t.getAttribute('data-zone-tab');
    const active = await page.getAttribute('[data-srv]', 'data-active');
    if (active !== z) fail(r, `aba ${z} não ativou a zona`);
  }
  r.checks.push(`abas da plataforma ok (${tabs.length})`);

  // 8. CTA de checkout
  const hasCheckout = await page.$('[data-checkout]');
  if (hasCheckout) {
    const href = await hasCheckout.getAttribute('href');
    r.checks.push(`checkout configurado → ${href}`);
  } else {
    await page.click('#acesso [data-checkout-missing]');
    const shown = await page.evaluate(() => !document.querySelector('[data-checkout-notice]').hidden && !document.querySelector('[data-toast]').hidden);
    if (!shown) fail(r, 'checkout ausente: aviso não apareceu');
    else r.checks.push('checkout ausente → aviso exibido');
  }

  // 9. Menu móvel
  if (width < 960) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.click('[data-burger]');
    await page.waitForTimeout(450);
    const open = await page.evaluate(() => !document.querySelector('[data-mnav-panel]').hidden);
    await page.screenshot({ path: join(SHOTS, `${width}-menu.png`) });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(450);
    const closed = await page.evaluate(() => document.querySelector('[data-mnav-panel]').hidden);
    if (!open || !closed) fail(r, `menu móvel: abriu=${open} fechou=${closed}`);
    else r.checks.push('menu móvel abre/fecha (Esc)');
  }

  if (consoleErrors.length) fail(r, `erros de console: ${consoleErrors.join(' | ')}`);

  results.push(r);
  await ctx.close();
}

// Reduced motion: todo conteúdo visível sem rolar
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 812 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  const hiddenCount = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity !== '1').length);
  results.push({ width: '390 (prefers-reduced-motion)', issues: hiddenCount ? [`${hiddenCount} elementos invisíveis`] : [], checks: ['todos os elementos visíveis sem animação'] });
  await ctx.close();
}

await browser.close();
server?.close();
writeFileSync(join(root, 'qa', 'results.json'), JSON.stringify(results, null, 2));
let bad = 0;
for (const r of results) {
  console.log(`\n■ ${r.width}px`);
  r.checks.forEach((c) => console.log('  ✓ ' + c));
  r.issues.forEach((i) => console.log('  ✗ ' + i));
  bad += r.issues.length;
}
console.log(bad ? `\n${bad} problema(s) encontrado(s).` : '\nNenhum problema encontrado.');
process.exit(bad ? 1 : 0);
