import { icon } from '../icons.js';
import { CATEGORIES, GROUPS } from '../data.js';

const GROUP_LABEL: Record<string, string> = Object.fromEntries(GROUPS.map((g) => [g.id, g.label]));

export function catalog(): string {
  const filters = GROUPS.map((g) => {
    const count = g.id === 'todos' ? CATEGORIES.length : CATEGORIES.filter((c) => (c.groups as string[]).includes(g.id)).length;
    const on = g.id === 'todos';
    return `<button type="button" class="filter${on ? ' is-on' : ''}" data-filter="${g.id}" aria-pressed="${on}">${g.label}<span class="filter__n">${count}</span></button>`;
  }).join('');

  const tiles = CATEGORIES.map((c, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `
      <li class="tile" data-groups="${c.groups.join(' ')}" data-spot>
        <div class="tile__top">
          <span class="tile__ico">${icon(c.icon, 22)}</span>
          <span class="tile__n">${n}</span>
        </div>
        <h3 class="tile__name">${c.name}</h3>
        <p class="tile__desc">${c.desc}${c.note ? ` <em class="tile__note">${c.note}</em>` : ''}</p>
        <p class="tile__groups">${c.groups.map((g) => `<span>${GROUP_LABEL[g]}</span>`).join('')}</p>
      </li>`;
  }).join('');

  return `
<section class="section cat" id="conteudos" aria-labelledby="cat-title">
  <div class="cat__glow" aria-hidden="true"></div>
  <div class="container">
    <div class="shead">
      <p class="eyebrow" data-reveal><span>02</span>Catálogo</p>
      <h2 class="h2 h2--wide" id="cat-title" data-reveal style="--d:1">Explore o que existe <span class="t-red">dentro do Atlanta.</span></h2>
    </div>

    <div class="cat__bar" data-reveal style="--d:2">
      <div class="filters" role="group" aria-label="Filtrar categorias por área">${filters}</div>
      <p class="cat__count" aria-live="polite"><span data-cat-count>${CATEGORIES.length}</span> de ${CATEGORIES.length} categorias</p>
    </div>

    <ul class="tiles" data-tiles>${tiles}
      <li class="tile-cta" data-tile-cta>
        <div class="tile-cta__body">
          <p class="tile-cta__k">Tudo isso em um só servidor</p>
          <p class="tile-cta__t">Uma central. Todas as áreas organizadas por tema.</p>
        </div>
        <a class="btn btn--primary" href="#acesso">Quero acessar<span class="btn__ico">${icon('arrowRight', 16)}</span></a>
      </li>
    </ul>

    <div class="cat__more">
      <button type="button" class="btn btn--ghost" data-cat-more hidden>Mostrar todas as categorias ${icon('chevronDown', 16)}</button>
    </div>

    <p class="cat__disclaimer">${icon('shield', 15)}<span>As categorias representam as áreas temáticas da comunidade; a disponibilidade de materiais específicos pode variar. Softwares e ferramentas devem ser gratuitos ou devidamente licenciados, e conteúdos de segurança digital destinam-se a aprendizado e uso autorizado.</span></p>
  </div>
</section>`;
}
