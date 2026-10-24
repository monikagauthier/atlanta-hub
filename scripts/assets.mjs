// Pipeline dos assets oficiais (imagenspag/ e imagenspag2/) → public/img/*.webp + src/assets.gen.ts
// Usa o Chromium para: recortar bordas transparentes, remover fundos claros "assados",
// redimensionar com alta qualidade e codificar WebP com alfa. Não gera imagens novas.
// Uso: CHROME_PATH=... PLAYWRIGHT_CORE=... node scripts/assets.mjs
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'img');
mkdirSync(out, { recursive: true });

/**
 * mode: none   = imagem opaca (fundo faz parte da arte)
 *       alpha  = já tem transparência; só recorta as bordas vazias
 *       flood  = fundo claro conectado às bordas → transparente; faixa de borda com "color-to-alpha"
 *       global = todo pixel claro e neutro → transparente (moldura com xadrez assado)
 */
const MAP = [
  ['hero-bg', 'imagenspag/hero.png', 'none', [960, 1672], 0.8],
  ['devices', 'imagenspag/Dispositivos futuristas com interface Atlanta.png', 'alpha', [720, 1440]],
  ['logo', 'imagenspag/Logo futurista ATLANTA HUB em cromo e neon vermelho.png', 'alpha', [320, 800, 1600]],
  ['emblem', 'imagenspag/Emblema A Metálico Vermelho Futurista.png', 'alpha', [160, 480]],
  ['box-ia', 'imagenspag/Caixa futurista de inteligência artificial.png', 'alpha', [480, 960]],
  ['box-marketing', 'imagenspag/Kit de Marketing Digital Cyberpunk.png', 'flood', [480, 960]],
  ['box-tools', 'imagenspag2/Caixa futurista de ferramentas digitais.png', 'flood', [480, 960]],
  ['box-media', 'imagenspag2/Caixa Cyberpunk de Edição Multimídia.png', 'flood', [480, 960]],
  ['box-atlanta', 'imagenspag2/Caixa futurista ATLANTA HUB.png', 'alpha', [480, 960]],
  ['phone-channels', 'imagenspag2/Smartphone futurista com Discord Atlanta.png', 'alpha', [400, 800]],
  ['phone-logo', 'imagenspag/Smartphone gamer com Discord neon vermelho.png', 'alpha', [400, 800]],
  ['phone-ui', 'imagenspag/Smartphone gamer com interface neon vermelha.png', 'alpha', [400, 800]],
  ['panel-channels', 'imagenspag2/Painel Cyberpunk de Canais Digitais.png', 'flood', [720, 1440]],
  ['library', 'imagenspag/Biblioteca de Arquivos Cyberpunk Neon.png', 'alpha', [720, 1355]],
  ['monitor-pt', 'imagenspag/Monitor gamer futurista com Discord em português.png', 'alpha', [720, 1440]],
  ['monitor-chat', 'imagenspag/Monitor Discord Atlanta em Neon Vermelho.png', 'alpha', [720, 1440]],
  ['setup', 'imagenspag2/Setup Gamer Futurista ATLANTA em Neon Vermelho.png', 'alpha', [720, 1440]],
  ['cards', 'imagenspag2/Cartões futuristas Atlanta Hub em metal.png', 'alpha', [480, 960]],
  ['kit', 'imagenspag2/Kit Cyber-Tech Atlanta Hub.png', 'flood', [720, 1440]],
  ['pack', 'imagenspag2/Pacote Tech Cyberpunk Atlanta Hub.png', 'flood', [480, 960]],
];
const only = process.argv.slice(2);

const srv = createServer((q, r) => {
  createReadStream(join(root, decodeURIComponent(q.url.split('?')[0].slice(1))))
    .on('error', () => r.writeHead(404).end())
    .pipe(r);
}).listen(4340);

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('http://localhost:4340/package.json');

const manifest = {};
for (const [key, src, mode, widths, q = 0.84] of MAP) {
  if (only.length && !only.includes(key)) continue;
  const res = await page.evaluate(
    async ({ url, mode, widths, q }) => {
      const img = new Image();
      img.src = url;
      await img.decode();
      let W = img.naturalWidth, H = img.naturalHeight;
      const c = new OffscreenCanvas(W, H);
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0);
      const id = x.getImageData(0, 0, W, H);
      const d = id.data;
      const N = W * H;
      const isLight = (i) => {
        const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2];
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        return mn > 188 && mx - mn < 30;
      };
      const c2a = (i) => {
        // "color to alpha" contra o branco: separa o brilho vermelho do fundo claro.
        const p = i * 4;
        const r = d[p], g = d[p + 1], b = d[p + 2];
        const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
        if (a <= 0.004) { d[p + 3] = 0; return; }
        d[p] = Math.round((r - (1 - a) * 255) / a);
        d[p + 1] = Math.round((g - (1 - a) * 255) / a);
        d[p + 2] = Math.round((b - (1 - a) * 255) / a);
        d[p + 3] = Math.round(d[p + 3] * a);
      };
      if (mode === 'flood') {
        const bg = new Uint8Array(N);
        const q = new Int32Array(N);
        let h = 0, t = 0;
        const push = (i) => { if (!bg[i] && isLight(i)) { bg[i] = 1; q[t++] = i; } };
        for (let i = 0; i < W; i++) { push(i); push((H - 1) * W + i); }
        for (let j = 0; j < H; j++) { push(j * W); push(j * W + W - 1); }
        while (h < t) {
          const i = q[h++], px = i % W;
          if (px > 0) push(i - 1);
          if (px < W - 1) push(i + 1);
          if (i >= W) push(i - W);
          if (i < N - W) push(i + W);
        }
        // faixa de transição (até 10 px do fundo)
        const dist = new Uint8Array(N).fill(255);
        h = 0; t = 0;
        for (let i = 0; i < N; i++) if (bg[i]) { dist[i] = 0; q[t++] = i; }
        while (h < t) {
          const i = q[h++], px = i % W, nd = dist[i] + 1;
          if (nd > 10) continue;
          for (const n of [px > 0 ? i - 1 : -1, px < W - 1 ? i + 1 : -1, i - W, i + W]) {
            if (n >= 0 && n < N && dist[n] > nd) { dist[n] = nd; q[t++] = n; }
          }
        }
        for (let i = 0; i < N; i++) {
          if (bg[i]) d[i * 4 + 3] = 0;
          else if (dist[i] <= 10) c2a(i);
        }
      } else if (mode === 'global') {
        for (let i = 0; i < N; i++) {
          if (isLight(i)) d[i * 4 + 3] = 0;
          else c2a(i);
        }
      }
      if (mode !== 'none') x.putImageData(id, 0, 0);

      // recorte das bordas transparentes
      let sx = 0, sy = 0, ex = W, ey = H;
      if (mode !== 'none') {
        let x0 = W, y0 = H, x1 = 0, y1 = 0;
        for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
          if (d[(j * W + i) * 4 + 3] > 10) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
        }
        const pad = Math.round(Math.max(W, H) * 0.01);
        sx = Math.max(0, x0 - pad); sy = Math.max(0, y0 - pad);
        ex = Math.min(W, x1 + pad + 1); ey = Math.min(H, y1 + pad + 1);
      }
      const cw = ex - sx, ch = ey - sy;
      const files = [];
      for (const w of widths) {
        const tw = Math.min(w, cw), th = Math.round((ch * tw) / cw);
        // redução em etapas (metade por vez) para nitidez
        let srcC = c, srcX = sx, srcY = sy, srcW = cw, srcH = ch;
        while (srcW / 2 > tw) {
          const hw = Math.round(srcW / 2), hh = Math.round(srcH / 2);
          const m = new OffscreenCanvas(hw, hh);
          const mx = m.getContext('2d');
          mx.imageSmoothingQuality = 'high';
          mx.drawImage(srcC, srcX, srcY, srcW, srcH, 0, 0, hw, hh);
          srcC = m; srcX = 0; srcY = 0; srcW = hw; srcH = hh;
        }
        const o = new OffscreenCanvas(tw, th);
        const ox = o.getContext('2d');
        ox.imageSmoothingQuality = 'high';
        ox.drawImage(srcC, srcX, srcY, srcW, srcH, 0, 0, tw, th);
        const blob = await o.convertToBlob({ type: 'image/webp', quality: q });
        const buf = new Uint8Array(await blob.arrayBuffer());
        let s = '';
        for (let k = 0; k < buf.length; k += 0x8000) s += String.fromCharCode(...buf.subarray(k, k + 0x8000));
        files.push({ w: tw, h: th, b64: btoa(s) });
      }
      return { files, cw, ch };
    },
    { url: '/' + encodeURIComponent(src).replace(/%2F/g, '/'), mode, widths, q },
  );
  const srcs = [];
  for (const f of res.files) {
    const name = `${key}-${f.w}.webp`;
    if (!srcs.find((s) => s.w === f.w)) {
      writeFileSync(join(out, name), Buffer.from(f.b64, 'base64'));
      srcs.push({ w: f.w, file: `/img/${name}`, kb: Math.round(Buffer.from(f.b64, 'base64').length / 1024) });
    }
  }
  manifest[key] = { w: res.cw, h: res.ch, src, srcs };
  console.log(`✓ ${key.padEnd(15)} ${res.cw}×${res.ch}  ${srcs.map((s) => `${s.w}w ${s.kb}kB`).join(' · ')}`);
}

await browser.close();
srv.close();

if (!only.length) {
  const body = Object.entries(manifest)
    .map(([k, v]) => `  '${k}': { w: ${v.w}, h: ${v.h}, src: ${JSON.stringify(v.src)}, srcs: [${v.srcs.map((s) => `{ w: ${s.w}, file: '${s.file}' }`).join(', ')}] },`)
    .join('\n');
  writeFileSync(
    join(root, 'src', 'assets.gen.ts'),
    `// GERADO por scripts/assets.mjs — não edite à mão.\nexport interface ImgAsset { w: number; h: number; src: string; srcs: { w: number; file: string }[] }\nexport const IMG = {\n${body}\n} satisfies Record<string, ImgAsset>;\nexport type ImgKey = keyof typeof IMG;\n`,
  );
  console.log('✓ src/assets.gen.ts');
}
