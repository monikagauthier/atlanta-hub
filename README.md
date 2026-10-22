# ATLANTA HUB — Página de vendas

Página de vendas estática e pré-renderizada para a comunidade **ATLANTA** no Discord.
Código em TypeScript, CSS próprio (design system em tokens) e **nenhuma dependência de runtime**.

```
src/
  config.ts            ← ÚNICO arquivo comercial a editar (preço, checkout, prazos, suporte, legal)
  data.ts              ← textos: categorias, filtros, pilares, benefícios, etapas, estrutura do mockup
  icons.ts             ← 31 ícones de categoria + ícones de interface + símbolo ATLANTA (SVG próprio)
  lib.ts               ← estado derivado da oferta, formatação de preço, avisos de configuração
  render.ts            ← documento HTML, SEO, Open Graph, JSON-LD
  sections/*.ts        ← um componente por seção (header, hero, ecossistema, catálogo, plataforma…)
  client/main.ts       ← interações: menu, filtros FLIP, abas, FAQ, revelação, parallax, checkout
  styles/01…07-*.css   ← tokens → base → componentes → seções
public/                ← favicon, logo.svg, og.png, apple-touch-icon.png, robots.txt
scripts/
  build.mjs            ← pré-renderiza, minifica CSS, gera nomes com hash → dist/
  serve.mjs            ← servidor local de pré-visualização
  qa.mjs               ← QA automatizado em 6 larguras (Playwright)
  sections.mjs         ← capturas por seção para revisão visual
  og.mjs               ← gera og.png e apple-touch-icon.png
```

## Rodar

Requer Node 18+.

```bash
npm install          # instala apenas o TypeScript (dev)
npm run build        # compila e gera dist/
npm run preview      # http://localhost:4173
```

O build lista no terminal tudo o que ainda falta configurar.

## Configurar a oferta (`src/config.ts`)

| Variável | Efeito quando vazia |
|---|---|
| `PRODUCT_PRICE` | Mostra "Valor em definição" (nunca um preço fictício) |
| `ORIGINAL_PRICE` | Preço riscado só aparece se for **maior** que `PRODUCT_PRICE` |
| `CHECKOUT_URL` | O botão "Garantir meu acesso" mostra um aviso; os outros CTAs levam à oferta |
| `DISCORD_INVITE_URL` | Oculta o link "Já sou membro" no rodapé |
| `ACCESS_TYPE` / `ACCESS_DURATION` | "Informado(a) no checkout" na oferta e no FAQ |
| `PRODUCT_INCLUSIONS` | Lista "O que está incluído" — revise para refletir exatamente a entrega |
| `SUPPORT_CONTACT` | "Canal de suporte · em configuração" |
| `DELIVERY_INSTRUCTIONS`, `CONTENT_UPDATES` | Textos neutros no FAQ, sem prometer prazos ou atualizações |
| `LEGAL.TERMS_URL` / `PRIVACY_URL` | Itens do rodapé marcados como "em publicação" |
| `BRAND.SITE_URL` | Canonical e `og:image` ficam relativos (preencha antes de publicar) |
| `SERVER_SCREENSHOTS` | Com itens, a seção Plataforma exibe a galeria de capturas reais (`public/screens/`) |
| `ADMIN_HINTS` | `true` mostra etiquetas "Configurar" nos campos vazios. **Use `false` ao publicar.** |

Com preço **e** checkout preenchidos, o JSON-LD `Product` passa a incluir `offers`.

Os nomes de canais do mockup ficam em `SERVER_MAP` e `EXPLORER_ZONES` (`src/data.ts`) — troque pelos nomes reais do servidor.

## Publicar

`dist/` é um site estático. Qualquer host serve:

- **Vercel**: build command `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish `dist`.
- **Cloudflare Pages**: build `npm run build`, output `dist`.
- **Hospedagem comum / S3**: envie o conteúdo de `dist/`. Arquivos em `/assets/` têm hash no nome → cache longo (`max-age=31536000, immutable`); `index.html` → `no-cache`.

Antes de publicar: preencha `SITE_URL`, `CHECKOUT_URL`, preço, termos/privacidade e suporte, e mude `ADMIN_HINTS` para `false`.

## QA

```bash
CHROME_PATH=/caminho/do/chrome PLAYWRIGHT_CORE=/caminho/playwright-core npm run qa
```

Verifica em 375/390/768/1024/1440/1920 px: rolagem horizontal, elementos fora da viewport, imagens quebradas, erros de console, alvos de toque, âncoras, filtros (contagem por filtro), FAQ, abas, menu móvel, CTA de checkout e `prefers-reduced-motion`. Capturas são salvas em `qa/screens/`.
