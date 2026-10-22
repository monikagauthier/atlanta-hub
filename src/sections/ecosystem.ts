import { icon, mark } from '../icons.js';
import { PILLARS } from '../data.js';

const visuals: Record<string, string> = {
  ia: `
    <div class="pv pv--console" aria-hidden="true">
      <p class="pv__prompt"><span>atlanta</span> ~ ia</p>
      ${[
        ['prompts', 82],
        ['modelos', 58],
        ['automações', 70],
        ['robôs', 46],
        ['claude-code', 64],
      ]
        .map(
          ([k, w], i) =>
            `<p class="pv__row" style="--i:${i}"><span class="pv__caret">›</span><span class="pv__k">${k}</span><span class="pv__bar" style="--w:${w}%"></span></p>`,
        )
        .join('')}
      <p class="pv__cursor"><span class="pv__caret">›</span><i></i></p>
    </div>`,
  mkt: `
    <div class="pv pv--funnel" aria-hidden="true">
      ${[
        ['Atrair', 'Tráfego · Leads'],
        ['Convencer', 'Copy · VSL'],
        ['Converter', 'Páginas · Ofertas'],
      ]
        .map(
          ([a, b], i) =>
            `<div class="pv__stage" style="--i:${i}"><span class="pv__n">0${i + 1}</span><strong>${a}</strong><small>${b}</small></div>`,
        )
        .join('')}
    </div>`,
  tools: `
    <div class="pv pv--files" aria-hidden="true">
      ${[
        ['sheets', 'Planilha', '.xlsx'],
        ['editable', 'Template', 'editável'],
        ['pdf', 'Guia', '.pdf'],
        ['ext', 'Extensão', 'navegador'],
      ]
        .map(
          ([i, t, s], k) =>
            `<div class="pv__file" style="--i:${k}">${icon(i, 18)}<span><strong>${t}</strong><small>${s}</small></span></div>`,
        )
        .join('')}
    </div>`,
  community: `
    <div class="pv pv--nodes" aria-hidden="true">
      <svg class="pv__links" viewBox="0 0 320 180" preserveAspectRatio="none">
        <path d="M160 90 C110 90 90 34 40 34"/><path d="M160 90 C110 90 90 146 40 146"/>
        <path d="M160 90 C210 90 230 34 280 34"/><path d="M160 90 C210 90 230 146 280 146"/>
      </svg>
      <span class="pv__hub">${mark(30)}</span>
      <span class="pv__node" style="--x:12.5%;--y:18.9%">#tutoriais</span>
      <span class="pv__node" style="--x:12.5%;--y:81.1%">#métodos</span>
      <span class="pv__node" style="--x:87.5%;--y:18.9%">#novidades</span>
      <span class="pv__node" style="--x:87.5%;--y:81.1%">#chat-geral</span>
    </div>`,
};

export function ecosystem(): string {
  const cards = PILLARS.map(
    (p, i) => `
    <article class="pillar pillar--${p.id}" data-spot data-reveal style="--d:${i}">
      <div class="pillar__visual">${visuals[p.id]}</div>
      <div class="pillar__body">
        <p class="pillar__idx"><span>${p.index}</span>Pilar</p>
        <h3 class="pillar__title">${p.title}</h3>
        <p class="pillar__text">${p.text}</p>
        <ul class="pillar__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      </div>
    </article>`,
  ).join('');

  return `
<section class="section eco" id="ecossistema" aria-labelledby="eco-title">
  <div class="container">
    <div class="shead shead--split">
      <div>
        <p class="eyebrow" data-reveal><span>01</span>Ecossistema</p>
        <h2 class="h2" id="eco-title" data-reveal style="--d:1">Não é apenas uma comunidade. <span class="t-dim">É um ecossistema digital.</span></h2>
      </div>
      <p class="lead" data-reveal style="--d:2">Quatro pilares conectados no mesmo servidor. Você não precisa saltar entre grupos, pastas e links: tudo é organizado por tema, dentro do ATLANTA.</p>
    </div>
    <div class="pillars">${cards}</div>
    <a class="eco__more" href="#conteudos" data-reveal>Ver todas as categorias ${icon('arrowRight', 16)}</a>
  </div>
</section>`;
}
