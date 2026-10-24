// Em ambientes sem acesso ao Google Fonts, QA_FONT=/caminho/InterVariable.woff2
// faz as capturas usarem a Inter real, interceptando as requisições da fonte.
// Sem QA_FONT, não faz nada (a página usa a fonte de reserva do sistema).
import { readFileSync } from 'node:fs';

const file = process.env.QA_FONT;
const data = file ? readFileSync(file) : null;
const css = `@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:swap;src:url(https://fonts.gstatic.com/qa/inter.woff2) format('woff2')}`;

/** @param {{ route: Function }} target page ou context do Playwright */
export async function useLocalFont(target) {
  if (!data) return;
  await target.route(/fonts\.googleapis\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  await target.route(/fonts\.gstatic\.com/, (r) =>
    r.fulfill({ status: 200, contentType: 'font/woff2', body: data, headers: { 'access-control-allow-origin': '*' } }),
  );
}
