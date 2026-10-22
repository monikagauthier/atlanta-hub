# Relatório de verificação — ATLANTA HUB

Data: 22/10/2026 · Ambiente: sandbox Linux, Node 22, Chromium headless (Playwright).

## Limitações do ambiente (declaradas, não contornadas)

1. **Skill Impeccable não estava instalada** (nenhum diretório de skills encontrado) e a documentação oficial retornou 403. Ela **não foi usada**. Os princípios conhecidos (sem gradientes roxos/azuis, sem cards genéricos repetidos, sem emojis, escala tipográfica fluida, neutros controlados, cor de destaque escassa, movimento com propósito, contraste AA) foram aplicados manualmente. Para habilitar: na raiz do projeto, `npx impeccable install` e depois `/impeccable init` no Claude Code (ou `/plugin marketplace add pbakaus/impeccable`). Fonte: [README do Impeccable](https://github.com/pbakaus/impeccable/blob/main/README.md).
2. **Sem acesso ao registro npm** (rede restrita). Next.js, React, Tailwind, Motion e Lucide não puderam ser instalados. A página foi construída em TypeScript puro, com componentes pré-renderizados, CSS próprio e animações nativas (CSS + Web Animations API). O resultado é HTML estático (bom para SEO e performance) e pode ser migrado para Next.js depois: cada `sections/*.ts` vira um componente.
3. **Fontes do Google não carregam no sandbox.** As capturas usam a fonte reserva (Noto Sans). Em produção, Space Grotesk / Inter / JetBrains Mono carregam via Google Fonts com `display=swap`. A métrica final pode variar levemente; o layout foi conferido com a fonte reserva, que é mais larga.
4. **Sem assets reais da marca nem capturas do servidor.** Logo, símbolo, ícones, mockups e OG foram criados do zero em SVG. Os mockups estão marcados como "Representação ilustrativa".

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

**Peso** (gzip): HTML 15 kB · CSS 12 kB · JS 3,5 kB. Nenhuma imagem raster no carregamento inicial, além de favicon e OG.

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
