# Relatório de verificação — ATLANTA HUB

v1: 22/10/2026 · v2 (imagens oficiais + Impeccable): 24/10/2026 · v3 (redesign premium): 24/10/2026 · Ambiente: sandbox Linux, Node 22, Chromium headless (Playwright).

## v3: redesign premium

### O que mudou

- **Conteúdos** ("Um universo de possibilidades. Em um só lugar."): os filtros e os 31 cards saíram. O mockup oficial `kit` virou o visual principal, centralizado e com até 1040 px. Abaixo dele fica só o aviso legal. O JS dos filtros (`initCatalog`) e os dados `GROUPS` foram removidos.
- **Paleta neutra** (`#0E1014` / `#171A20` / `#20242B` / `#F5F6F8` / `#9CA3AF` / `#2A2E36`). O vermelho `#FF1E24` ficou só no botão principal, nos pontos de status e nos ícones de confirmação. As segundas linhas dos títulos agora são cinza, não vermelhas.
- **Efeitos:** saíram os brilhos vermelhos, o `text-shadow`, o grão e os gradientes coloridos. Ficaram sombras neutras e uma sombra de contato sob os mockups.
- **Tipografia:** a Inter é a única família, com títulos em peso 650. Space Grotesk (`public/fonts`) e JetBrains Mono foram removidas, assim como as caixas altas e os textos mono em títulos, passos, ingresso, preço e chamada final.
- **Padrões:** raios de 10, 14 e 20 px; espaçamento entre seções `clamp(96px, 11vw, 168px)`; um único estilo de botão primário e secundário.
- **Hero:** o título passou a ter 2 linhas, o selo fica acima dele e o fundo foi atenuado (opacidade 0,3).

### Testes executados

- `tsc --noEmit`: ✓. `npm run build`: ✓. Build com subcaminho `/atlanta-hub`: ✓ (imagens com o prefixo correto).
- `qa.mjs` em 375/390/768/1024/1440/1920 px + reduced motion: **nenhum problema**.
  - Não há rolagem horizontal.
  - O mockup de Conteúdos carrega com a proporção original (Δ ≤ 0,01) e fica centralizado (desvio ≤ 2 px).
  - Não sobrou nenhum elemento de filtro ou card.
- **Revisão visual** por seção em 1440, 1024, 768 e 390 px, com a Inter real. A fonte foi injetada localmente só no QA (`QA_FONT`), sem ir para o repositório.
  - Problema corrigido: o título de Conteúdos quebrava em 3 linhas no desktop. Agora quebra em 2.
- **Detector Impeccable:** de 36 para **22** achados.
  - `cramped-padding` (10), `nested-cards` (4) e `repeated-container-text` (1) estão no mockup estilo Discord ou são falsos positivos de seções com borda superior.
  - `low-contrast` (5): textos das abas recolhidas, com opacidade 0 durante a transição. Não ficam visíveis.
  - `overused-font` (1): a Inter foi pedida no briefing.
  - `marquee` (1): é a faixa de categorias, que para com `prefers-reduced-motion`.
- **Não verificado:** a página publicada (o sandbox não acessa github.io), Safari e Firefox reais.


## v2: imagens oficiais e skill Impeccable

### Uso da Impeccable (o que foi usado de fato)

- A skill está instalada em `.kiro/skills/impeccable/` (na raiz do workspace, fora do repositório). Os guias `craft-floor`, `mode-persuade`, `polish` e `layout` foram lidos e aplicados manualmente.
- O detector oficial (`impeccable detect`, binário 0.1.16 da release oficial) **foi executado** sobre `dist/index.html` e `src/styles`.
  - **138** achados na primeira rodada, **42** na segunda e **36** no estado final.
  - O download automático do launcher é bloqueado no sandbox, por isso o binário foi baixado via API do GitHub.
- Corrigido a partir do detector:
  - Texto < 11 px: 54 casos de `undersized-ui-text` → 0.
  - Ícones em caixinha empilhados (`icon-tile-stack`): 37 → 0. Os ícones do catálogo e dos benefícios agora ficam em linha com o título.
  - Brilhos vermelhos redundantes: 16 → 5.
  - Opacidade baixa no rodapé removida.
- Achados mantidos de propósito:
  - `overused-font` (3): Space Grotesk, Inter e JetBrains Mono são exigência do briefing.
  - `nested-cards` / `cramped-padding` / `low-contrast` (23, no total): quase todos estão no mockup interativo estilo Discord da seção Plataforma, que imita a interface real. Os 5 de baixo contraste são barras de esqueleto decorativas, sem texto legível.
  - `dark-glow` (5): no CTA principal e na linha do passo a passo. É identidade da marca e foi limitado a esses pontos.
  - `marquee` (1): é a faixa de categorias, que já existia. Ela para com `prefers-reduced-motion`.
  - `tiny-text` (2, 11 px) e `wide-tracking` (1, 0,06em): etiquetas em caixa alta, não texto corrido.

### Imagens oficiais (`imagenspag/`, `imagenspag2/`)

- **Inventário:** 33 PNGs, sendo 25 imagens únicas (8 são duplicatas exatas por md5).
- **Conversão:** as imagens foram convertidas para WebP responsivo em `public/img` por `scripts/assets.mjs`.
  - A transparência original é preservada.
  - Fundos claros sólidos foram removidos sem recortar o objeto.
  - As proporções originais foram mantidas (`width`/`height` reais em cada `<img>`).
- **Em uso (18):** a lista de onde cada imagem aparece está no README.
- **Não usadas (7), com motivo:**
  - `Moldura Futurista de Energia Vermelha`, `Interface Discord Neon Atlanta` e `Interface Atlanta em Neon Vermelho` têm o xadrez de "transparência" **gravado nos pixels** (PNG RGB, sem canal alfa). Usá-las mostraria o xadrez na página.
  - `Atlanta Hub_ Discord futurista em neon vermelho` é um pôster quadrado opaco que repete a composição do hero (aparelhos + logo).
  - `Caixa Cyberpunk de Edição Multimídia` (`box-media`) é composta quase só de logos de softwares comerciais de terceiros (Adobe, DaVinci, Figma etc.). Em destaque, isso poderia sugerir distribuição de software pago, contra o aviso "gratuitos ou devidamente licenciados". No `kit` do catálogo esses logos aparecem só como detalhe. Ela foi processada, mas não está na página.
  - `Smartphone gamer com interface neon vermelha` (2 variantes diferentes, em `imagenspag/` e `imagenspag2/`; a primeira é a chave `phone-ui`) repete o celular com a lista de canais, que já aparece em Plataforma e em Como funciona.

### Correções visuais da v2

- Imagens dos pilares cortadas: grade `minmax(0,1fr)` e sem deslocamento.
- Aparelho do hero vazando a coluna: ajustado.
- Imagem do ingresso sobre a perfuração: reposicionada.
- Imagens dos passos estourando o card: altura fixa de 176 px com `object-fit`.
- Ícones duplicados nos passos removidos, já que a imagem oficial os substitui.
- O visual do FAQ só aparece a partir de 1024 px.

### Testes da v2 (todos executados nesta data)

- `npm run typecheck` e `npm run build` passaram sem erros.
- `scripts/qa.mjs` nas 6 larguras + reduced motion: **nenhum problema**.
  - A checagem de imagens quebradas agora força o carregamento e o `decode()` de todas as imagens, inclusive as lazy.
- `scripts/sections.mjs` gerou capturas por seção em 1440, 1024, 768 e 390 px, que foram inspecionadas.
- Build com subcaminho (`BASE_PATH=/atlanta-hub`): as 44 referências de assets existem em `dist/`.
- O preço continua **R$ 17,90** (`PRODUCT_PRICE = 17.9`). `CHECKOUT_URL` **não foi alterado** e continua vazio.

## Limitações do ambiente (declaradas, não contornadas)

1. **Impeccable na v1:** não estava instalada e não foi usada. Na v2 ela foi instalada e usada, conforme a seção acima.
2. **Sem acesso ao registro npm** (rede restrita). Next.js, React, Tailwind, Motion e Lucide não puderam ser instalados.
   - A página foi construída em TypeScript puro, com componentes pré-renderizados, CSS próprio e animações nativas (CSS + Web Animations API).
   - O resultado é HTML estático (bom para SEO e performance) e pode ser migrado para Next.js depois: cada `sections/*.ts` vira um componente.
3. **Fontes:**
   - Space Grotesk é servida localmente (`public/fonts`, licença OFL).
   - Inter e JetBrains Mono vêm do Google Fonts, que não carrega no sandbox. Nas capturas, essas duas usam a fonte reserva.
4. **Assets:** a v1 usava SVGs próprios. A v2 usa as imagens oficiais enviadas, e os mockups continuam marcados como ilustrativos.

## Testes automatizados (`scripts/qa.mjs`) — todos executados e aprovados

Larguras: **375, 390, 768, 1024, 1440, 1920** + 390 com `prefers-reduced-motion`.

| Verificação | Resultado |
|---|---|
| Rolagem horizontal (`scrollWidth` = viewport) | ✓ em todas |
| Elementos ultrapassando a viewport | ✓ nenhum |
| Imagens quebradas | ✓ nenhuma |
| Erros de console / requisições falhas (exceto Google Fonts, sem rede) | ✓ nenhum |
| Alvos de toque ≥ 40 px (375/390) | ✓ |
| Âncoras internas com destino existente | ✓ |
| 7 filtros do catálogo: contador e nº de cards visíveis batem com os dados | ✓ |
| Botão "Mostrar todas" no mobile expande para o total do filtro | ✓ |
| FAQ: abre um item por vez, fecha corretamente | ✓ |
| 5 abas da Plataforma ativam a zona correspondente do mockup | ✓ |
| CTA sem `CHECKOUT_URL` → aviso e toast exibidos (não fica mudo) | ✓ |
| Menu móvel abre e fecha com Esc (375/390/768) | ✓ |
| Reduced motion: todo conteúdo visível sem animação | ✓ |
| `tsc --noEmit` (strict) | ✓ sem erros |

**Caminho configurado** (teste temporário com preço 97, preço "de" 147, checkout e 12 meses, depois revertido): preço exibido como "R$ 97,00", "De R$ 147,00" riscado, os 2 CTAs de compra apontam para o checkout, etiquetas administrativas somem com `ADMIN_HINTS=false`, o FAQ mostra a duração e o JSON-LD inclui `offers`.

**Peso v1** (gzip): HTML 15 kB · CSS 12 kB · JS 3,5 kB. Na v2 entram as imagens WebP oficiais: só o fundo e os aparelhos do hero carregam de início (`fetchpriority=high`), e as demais usam `loading="lazy"`.

## Revisão visual — problemas encontrados e corrigidos

Capturas por seção em 1440, 1024 e 390 px foram inspecionadas.

| # | Problema | Correção |
|---|---|---|
| 1 | Rodapé e card da oferta causavam rolagem horizontal em 375/390 px (min-content da grade) | Colunas `minmax(0,1fr)`; etiquetas admin quebram linha |
| 2 | Tiles do mockup do hero vazavam em 1024 px | Grade com `minmax(0,…)` e reticências; em 1024–1279 px o rail some e os tiles passam a 1 coluna |
| 3 | Card flutuante "Inteligência Artificial" cobria o canal ativo do mockup | Reposicionado no canto inferior esquerdo |
| 4 | Área vazia no painel principal do hero | Bloco "Comece por aqui" (#boas-vindas, #regras, #anúncios) |
| 5 | Quebra ruim no título: "EM UM / SÓ LUGAR." | Quebra explícita: "EM UM SÓ / LUGAR." |
| 6 | Título do ecossistema em 5 linhas no desktop | Coluna do título mais larga (8/4) e 22ch |
| 7 | Catálogo com um card órfão na última linha (31 itens) | Card de CTA que preenche, via JS, exatamente as células livres de qualquer filtro e largura |
| 8 | No mobile, o CTA do catálogo aparecia antes de "Mostrar todas" | CTA oculto enquanto a lista está recolhida |
| 9 | Espaço vazio no mockup da Plataforma | Bloco "Como encontrar" (fixados, tópicos, busca: recursos nativos do Discord) |
| 10 | Legenda do hero coberta pelo card "Índice" | Legenda encurtada; card "Índice" oculto abaixo de 560 px |
| 11 | Kicker e tagline do hero quebravam em 375 px; acento do "Ó" encostava na linha de cima | Espaçamento entre letras reduzido no mobile, `nowrap` e altura de linha 0,95 |
| 12 | FAQ com concordância errada quando só a duração está definida | Texto corrigido |

## Honestidade da oferta (auditado no código)

- Nenhum preço, depoimento, número de membros, faturamento, contador ou escassez inventados. O "31" é a contagem real de categorias do briefing, e as barras do card "Índice" são calculadas a partir de `data.ts`.
- Nenhuma mensagem ou usuário simulado. A área de interação usa barras de esqueleto abstratas.
- Nada promete liberação imediata, acesso vitalício, suporte 24h ou atualizações garantidas.
- Avisos: segurança digital "para aprendizado e uso autorizado"; iGaming "+18, respeite a legislação local"; softwares "gratuitos ou devidamente licenciados".
- O rodapé declara independência em relação à Discord Inc. Nenhum texto legal foi inventado.

## O que não foi verificado

- Renderização com as fontes finais (sem rede).
- Safari/iOS e Firefox reais (apenas Chromium).
- Lighthouse e Core Web Vitals não foram rodados (ferramenta indisponível offline).
- Leitor de tela real (a semântica ARIA foi implementada: tablist, aria-expanded, aria-pressed, região live, skip link, trap de foco no menu, mas não foi testada com NVDA/VoiceOver).
