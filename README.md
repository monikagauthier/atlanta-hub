# ATLANTA HUB — Página de vendas

Página de vendas estática e pré-renderizada para a comunidade **ATLANTA** no Discord.
Código em TypeScript, CSS próprio (design system em tokens) e **nenhuma dependência de runtime**.

```
src/
  config.ts            ← ÚNICO arquivo comercial a editar (preço, checkout, prazos, suporte, legal)
  data.ts              ← textos: categorias, pilares, benefícios, etapas, estrutura do mockup
  icons.ts             ← 31 ícones de categoria + ícones de interface (SVG)
  img.ts               ← <img> responsivo (srcset/sizes), logo e emblema oficiais
  assets.gen.ts        ← GERADO por scripts/assets.mjs (dimensões e arquivos de cada imagem)
  lib.ts               ← estado derivado da oferta, formatação de preço, avisos de configuração
  render.ts            ← documento HTML, SEO, Open Graph, JSON-LD
  sections/*.ts        ← um componente por seção (header, hero, ecossistema, catálogo, plataforma…)
  client/main.ts       ← interações: menu, abas, FAQ, revelação, parallax, checkout
  styles/01…07-*.css   ← tokens → base → componentes → seções
public/                ← img/ (WebP gerados), favicons, og.png, robots.txt
imagenspag/, imagenspag2/ ← imagens oficiais originais (PNG) — fonte do pipeline
scripts/
  build.mjs            ← pré-renderiza, minifica CSS, gera nomes com hash → dist/
  serve.mjs            ← servidor local de pré-visualização
  qa.mjs               ← QA automatizado em 6 larguras (Playwright)
  sections.mjs         ← capturas por seção para revisão visual
  assets.mjs           ← converte as imagens oficiais em WebP (recorte, fundo, várias larguras)
  og.mjs               ← gera og.png, apple-touch-icon.png e favicon.png a partir dos assets oficiais
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

## Imagens oficiais

As imagens de `imagenspag/` e `imagenspag2/` são processadas por `scripts/assets.mjs` (Chromium headless, mesmas variáveis do QA):

```bash
CHROME_PATH=… PLAYWRIGHT_CORE=… node scripts/assets.mjs          # todas
CHROME_PATH=… PLAYWRIGHT_CORE=… node scripts/assets.mjs devices  # só uma chave
```

O script recorta bordas transparentes, remove fundos claros embutidos (modo `flood`), gera WebP em 2–3 larguras em `public/img/<chave>-<w>.webp` e reescreve `src/assets.gen.ts`. Proporções e transparência são preservadas. Para trocar uma imagem: substitua o PNG de origem (mesmo nome) e rode o script. Os WebP gerados são versionados, então o deploy não depende do Chromium.

Onde cada imagem aparece:

| Chave | Origem | Seção |
|---|---|---|
| `hero-bg` | `imagenspag/hero.png` | Fundo do hero e da chamada final |
| `devices` | Dispositivos futuristas com interface Atlanta | Hero (mockup principal) |
| `logo` | Logo futurista ATLANTA HUB | Cabeçalho, rodapé, ingresso da oferta |
| `emblem` | Emblema A Metálico Vermelho | Plataforma, chamada final |
| `box-ia` / `box-marketing` / `box-tools` / `panel-channels` | Caixas de IA, Marketing, Ferramentas; Painel de Canais | Ecossistema (4 pilares) |
| `kit` | Kit Cyber-Tech Atlanta Hub | Conteúdos ("Um universo de possibilidades"): visual principal, centralizado |
| `monitor-pt` / `phone-channels` | Monitor em português; Smartphone com Discord Atlanta | Plataforma |
| `cards` / `phone-logo` / `library` | Cartões em metal; Smartphone com Discord neon; Biblioteca de Arquivos | Como funciona (passos 1–3) |
| `setup` | Setup Gamer Futurista | Por que o Atlanta |
| `pack` | Pacote Tech Cyberpunk | Oferta (ingresso) |
| `monitor-chat` | Monitor Discord Atlanta | FAQ (≥ 1024 px) |

`box-media`, `phone-ui` e `box-atlanta` são geradas, mas não usadas. Outras 5 imagens de origem (incluindo uma segunda variante do celular) ficaram de fora porque têm o xadrez gravado nos pixels ou repetem conteúdo já usado. Os motivos estão em `VERIFICATION.md`.

## Design

Paleta neutra em `src/styles/01-tokens.css`: fundo `#0E1014`, superfície `#171A20`, elevado `#20242B`, texto `#F5F6F8`, secundário `#9CA3AF`, bordas `#2A2E36`. O vermelho `#FF1E24` é só acento: botão principal, pontos de status e ícones de confirmação. Raios: 10, 14 e 20 px.

A fonte é a Inter (Google Fonts, pesos 400–700), a única família da página. Para capturas fiéis no sandbox, onde o Google Fonts não carrega, defina `QA_FONT=/caminho/InterVariable.woff2`. `scripts/local-font.mjs` serve esse arquivo no lugar do Google Fonts durante o QA.

## Publicar

`dist/` é um site estático. Qualquer host serve:

- **GitHub Pages**: o workflow `.github/workflows/pages.yml` compila e publica a cada push na `main`. Em *Settings → Pages → Build and deployment → Source*, selecione **GitHub Actions**. O subcaminho (`/atlanta-hub`) e a URL pública são configurados automaticamente (`BASE_PATH` / `SITE_URL`). Para testar localmente com subcaminho: `BASE_PATH=/atlanta-hub npm run build && BASE_PATH=/atlanta-hub npm run preview` → `http://localhost:4173/atlanta-hub/`.

- **Vercel**: build command `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish `dist`.
- **Cloudflare Pages**: build `npm run build`, output `dist`.
- **Hospedagem comum / S3**: envie o conteúdo de `dist/`. Arquivos em `/assets/` têm hash no nome → cache longo (`max-age=31536000, immutable`); `index.html` → `no-cache`.

Antes de publicar: preencha `SITE_URL`, `CHECKOUT_URL`, preço, termos/privacidade e suporte, e mude `ADMIN_HINTS` para `false`.

## QA

```bash
CHROME_PATH=/caminho/do/chrome PLAYWRIGHT_CORE=/caminho/playwright-core npm run qa
```

Verifica em 375/390/768/1024/1440/1920 px: rolagem horizontal, elementos fora da viewport, imagens quebradas, erros de console, alvos de toque, âncoras, mockup de Conteúdos (proporção, centralização, sem restos de filtros), FAQ, abas, menu móvel, CTA de checkout e `prefers-reduced-motion`. Capturas são salvas em `qa/screens/`.
