import { icon } from '../icons.js';
import { PILLARS } from '../data.js';
import { img } from '../img.js';
import type { ImgKey } from '../assets.gen.js';

const VISUAL: Record<string, { key: ImgKey; alt: string }> = {
  ia: { key: 'box-ia', alt: 'Caixa ATLANTA de inteligência artificial com pastas de ferramentas de IA' },
  mkt: { key: 'box-marketing', alt: 'Kit ATLANTA de marketing digital com pastas de PLR, VSL, copy, leads e tráfego pago' },
  tools: { key: 'box-tools', alt: 'Caixa ATLANTA de ferramentas digitais com pastas de planilhas, documentos e softwares' },
  community: { key: 'panel-channels', alt: 'Painéis com a organização de canais do servidor ATLANTA' },
};

export function ecosystem(): string {
  const cards = PILLARS.map((p, i) => {
    const v = VISUAL[p.id];
    const wide = p.id === 'community';
    return `
    <article class="pillar pillar--${p.id}" data-spot data-reveal style="--d:${i % 2}">
      <div class="pillar__visual">${img(v.key, {
        alt: v.alt,
        sizes: wide ? '(min-width: 1100px) 34vw, (min-width: 768px) 46vw, 92vw' : '(min-width: 1100px) 22vw, (min-width: 768px) 40vw, 80vw',
        cls: 'pillar__img',
      })}</div>
      <div class="pillar__body">
        <h3 class="pillar__title">${p.title}</h3>
        <p class="pillar__text">${p.text}</p>
        <ul class="pillar__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      </div>
    </article>`;
  }).join('');

  return `
<section class="section eco" id="ecossistema" aria-labelledby="eco-title">
  <div class="container">
    <div class="shead shead--split">
      <h2 class="h2" id="eco-title" data-reveal>Não é apenas uma comunidade. <span class="t-soft">É um ecossistema digital.</span></h2>
      <p class="lead" data-reveal style="--d:1">Quatro pilares conectados no mesmo servidor. Você não precisa saltar entre grupos, pastas e links: tudo é organizado por tema, dentro do ATLANTA.</p>
    </div>
    <div class="pillars">${cards}</div>
    <a class="eco__more" href="#conteudos" data-reveal>Ver o que existe dentro ${icon('arrowRight', 16)}</a>
  </div>
</section>`;
}
