import { icon, mark } from '../icons.js';
import { CATEGORIES, SERVER_MAP } from '../data.js';

function appMock(): string {
  const side = SERVER_MAP.slice(0, 4)
    .map(
      (g, gi) => `
      <div class="app__group">
        <p class="app__cat">${icon('chevronDown', 10)}${g.cat}</p>
        <ul>${g.channels
          .map((c) => {
            const active = gi === 1 && c === 'prompts';
            return `<li class="${active ? 'is-active' : ''}">${icon('hash', 13)}<span>${c}</span></li>`;
          })
          .join('')}</ul>
      </div>`,
    )
    .join('');

  const tiles = [
    { i: 'prompts', t: 'Prompts', s: 'Texto · IA' },
    { i: 'bots', t: 'Automações', s: 'Fluxos · Robôs' },
    { i: 'claude', t: 'Claude Code', s: 'Desenvolvimento' },
    { i: 'ia', t: 'Modelos', s: 'Ferramentas de IA' },
  ]
    .map(
      (x, k) => `<div class="app__tile${k === 0 ? ' is-hot' : ''}">
        <span class="app__tile-ico">${icon(x.i, 18)}</span>
        <span class="app__tile-t">${x.t}</span>
        <span class="app__tile-s">${x.s}</span>
      </div>`,
    )
    .join('');

  return `
  <div class="app" data-tilt-layer="0">
    <div class="app__bar">
      <span class="app__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="app__title">${mark(12, 'app__title-mark')} ATLANTA</span>
      <span class="app__bar-r">${icon('search', 13)}</span>
    </div>
    <div class="app__body">
      <div class="app__rail" aria-hidden="true">
        <span class="app__srv is-active">${mark(20)}</span>
        <span class="app__sep"></span>
        <span class="app__srv app__srv--ghost"></span>
        <span class="app__srv app__srv--ghost"></span>
        <span class="app__srv app__srv--add">${icon('plus', 14)}</span>
      </div>
      <div class="app__side">
        <p class="app__server">ATLANTA ${icon('chevronDown', 12)}</p>
        ${side}
      </div>
      <div class="app__main">
        <div class="app__head">
          ${icon('hash', 15)}<strong>prompts</strong>
          <span class="app__head-sep"></span>
          <span class="app__head-topic">Inteligência Artificial</span>
          <span class="app__head-tools">${icon('pin', 14)}${icon('thread', 14)}</span>
        </div>
        <div class="app__content">
          <p class="app__label"><span>Biblioteca</span><span class="app__label-line"></span><span>IA</span></p>
          <div class="app__tiles">${tiles}</div>
          <p class="app__label"><span>Outras áreas</span><span class="app__label-line"></span></p>
          <div class="app__chips">
            ${['Copywriting', 'Planilhas', 'Design', 'Tráfego Pago', 'Extensões', 'Métodos']
              .map((c) => `<span>${c}</span>`)
              .join('')}
          </div>
          <p class="app__label app__label--guide"><span>Comece por aqui</span><span class="app__label-line"></span></p>
          <ul class="app__guide">
            <li>${icon('pin', 13)}<span>Orientação inicial</span><b>#boas-vindas</b></li>
            <li>${icon('shield', 13)}<span>Como a comunidade funciona</span><b>#regras</b></li>
            <li>${icon('spark', 13)}<span>Novidades do servidor</span><b>#anúncios</b></li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
}

/** Barras proporcionais ao número REAL de categorias por grupo (derivado de data.ts). */
function groupBars(): string {
  const groups = [
    { id: 'marketing', k: 'MKT' },
    { id: 'ia', k: 'IA' },
    { id: 'ferramentas', k: 'TOOLS' },
    { id: 'tecnologia', k: 'TECH' },
  ] as const;
  const counts = groups.map((g) => CATEGORIES.filter((c) => (c.groups as string[]).includes(g.id)).length);
  const total = counts.reduce((a, b) => a + b, 0);
  const bars = counts.map((n) => `<i style="--w:${((n / total) * 100).toFixed(1)}%"></i>`).join('');
  const legend = groups.map((g, i) => `<span>${g.k}<b>${counts[i]}</b></span>`).join('');
  return `<span class="float__bars">${bars}</span><span class="float__legend">${legend}</span>`;
}

export function hero(): string {
  const ticker = CATEGORIES.map((c) => `<span>${c.name}</span>`).join('<i aria-hidden="true">/</i>');
  return `
<section class="hero" id="inicio" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true">
    <div class="hero__grid-lines"></div>
    <div class="hero__glow"></div>
    <div class="hero__beam"></div>
  </div>

  <div class="container hero__layout">
    <div class="hero__copy">
      <p class="hero__kicker" data-reveal><span class="dot dot--live"></span>ATLANTA HUB<span class="hero__kicker-sep">/</span>Comunidade no Discord</p>
      <h1 class="hero__title" id="hero-title" data-reveal style="--d:1">
        <span class="hero__line">O universo</span>
        <span class="hero__line">digital</span>
        <span class="hero__line hero__line--red">em um só</span>
        <span class="hero__line hero__line--red">lugar.</span>
      </h1>
      <p class="hero__sub" data-reveal style="--d:2">Explore um ecossistema de conteúdos, ferramentas, métodos e recursos sobre inteligência artificial, marketing digital, automação, design, tecnologia e muito mais.</p>
      <p class="hero__tag" data-reveal style="--d:3"><span class="hero__tag-bar"></span>Um hub. Inúmeras possibilidades.</p>
      <div class="hero__ctas" data-reveal style="--d:4">
        <a class="btn btn--primary btn--lg" href="#acesso">Quero entrar no Atlanta<span class="btn__ico">${icon('arrowRight', 18)}</span></a>
        <a class="btn btn--ghost btn--lg" href="#conteudos">Explorar conteúdos</a>
      </div>
      <ul class="hero__facts" data-reveal style="--d:5">
        <li><strong>${CATEGORIES.length}</strong> categorias temáticas</li>
        <li>${icon('chat', 16)} Acesso pelo Discord</li>
        <li>${icon('devices', 16)} Computador e celular</li>
      </ul>
    </div>

    <figure class="hero__stage" data-tilt data-reveal="scale" style="--d:2">
      <div class="hero__halo" aria-hidden="true"></div>
      ${appMock()}
      <div class="float float--a" data-tilt-layer="1" aria-hidden="true">
        <span class="float__ico">${icon('ia', 18)}</span>
        <span class="float__body"><strong>Inteligência Artificial</strong><small>Prompts · Modelos · Automações</small></span>
      </div>
      <div class="float float--b" data-tilt-layer="2" aria-hidden="true">
        <span class="float__k">Índice</span>
        <strong class="float__big">${CATEGORIES.length}<small>categorias</small></strong>
        ${groupBars()}
      </div>
      <div class="float float--c" data-tilt-layer="1.5" aria-hidden="true">
        <span class="float__ico float__ico--ok">${icon('check', 16)}</span>
        <span class="float__body"><strong>Entrega via Discord</strong><small>Servidor exclusivo ATLANTA</small></span>
      </div>
      <figcaption class="hero__caption">Representação ilustrativa do servidor</figcaption>
    </figure>
  </div>

  <div class="ticker" aria-hidden="true">
    <div class="ticker__track"><div class="ticker__row">${ticker}<i>/</i></div><div class="ticker__row">${ticker}<i>/</i></div></div>
  </div>
</section>`;
}
