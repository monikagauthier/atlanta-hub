// Build estático: pré-renderiza o HTML a partir dos componentes TS compilados,
// concatena/minifica o CSS, copia o JS do cliente e os arquivos de /public.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const build = join(root, '.build');

if (!existsSync(join(build, 'render.js'))) {
  console.error('✗ .build/render.js não encontrado. Rode "npm run build" (compila o TypeScript antes).');
  process.exit(1);
}

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/:(is|where|not|has)\(/g, ':$1(')
    .trim();
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });

// CSS
const styleDir = join(root, 'src', 'styles');
const css = readdirSync(styleDir)
  .filter((f) => f.endsWith('.css'))
  .sort()
  .map((f) => readFileSync(join(styleDir, f), 'utf8'))
  .join('\n');
const cssMin = minifyCss(css);
const cssName = `atlanta.${hash(cssMin)}.css`;
writeFileSync(join(out, 'assets', cssName), cssMin);

// JS
const js = readFileSync(join(build, 'client', 'main.js'), 'utf8');
const jsName = `atlanta.${hash(js)}.js`;
writeFileSync(join(out, 'assets', jsName), js);

// HTML
const { renderPage, configWarnings } = await import(pathToFileURL(join(build, 'render.js')).href + `?t=${Date.now()}`);
// BASE_PATH: prefixo quando o site fica num subcaminho (ex.: GitHub Pages → "/atlanta-hub").
// SITE_URL: URL pública usada se BRAND.SITE_URL estiver vazio em src/config.ts.
const base = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const html = renderPage({
  css: `${base}/assets/${cssName}`,
  js: `${base}/assets/${jsName}`,
  base,
  siteUrl: process.env.SITE_URL || '',
});
if (base) console.log(`• BASE_PATH = ${base}`);
writeFileSync(join(out, 'index.html'), html);

// Public
const pub = join(root, 'public');
if (existsSync(pub)) cpSync(pub, out, { recursive: true });

const kb = (n) => (n / 1024).toFixed(1) + ' kB';
console.log('✓ dist/index.html', kb(Buffer.byteLength(html)));
console.log(`✓ dist/assets/${cssName}`, kb(Buffer.byteLength(cssMin)));
console.log(`✓ dist/assets/${jsName}`, kb(Buffer.byteLength(js)));

const warnings = configWarnings();
if (warnings.length) {
  console.log('\n⚠ Configuração comercial pendente (src/config.ts):');
  for (const w of warnings) console.log('  · ' + w);
}
