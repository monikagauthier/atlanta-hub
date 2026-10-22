import { icon, mark } from '../icons.js';
import { BENEFITS, STEPS } from '../data.js';

export function steps(): string {
  const items = STEPS.map(
    (s, i) => `
      <li class="step" style="--i:${i}">
        <div class="step__node"><span>${s.n}</span></div>
        <div class="step__card" data-spot>
          <span class="step__ico">${icon(s.icon, 22)}</span>
          <h3 class="step__title">${s.title}</h3>
          <p class="step__text">${s.text}</p>
        </div>
      </li>`,
  ).join('');

  return `
<section class="section how" id="como-funciona" aria-labelledby="how-title">
  <div class="container">
    <div class="shead shead--split">
      <div>
        <p class="eyebrow" data-reveal><span>04</span>Como funciona</p>
        <h2 class="h2" id="how-title" data-reveal style="--d:1">Simples de entrar. <span class="t-dim">Fácil de explorar.</span></h2>
      </div>
      <p class="lead" data-reveal style="--d:2">Três etapas entre você e o servidor. As instruções de acesso são enviadas após a confirmação da compra.</p>
    </div>
    <div class="timeline" data-timeline>
      <div class="timeline__track" aria-hidden="true"><span class="timeline__fill"></span></div>
      <ol class="steps">${items}</ol>
    </div>
  </div>
</section>`;
}

/** Diagrama: pontos dispersos convergindo para o hub ATLANTA. Posições determinísticas. */
function convergence(): string {
  const pts: [number, number][] = [
    [18, 26], [46, 64], [30, 112], [70, 140], [22, 176], [58, 206], [96, 32], [104, 98], [88, 182], [130, 150], [138, 56], [40, 236],
  ];
  const hub = [300, 130];
  const lines = pts
    .map(([x, y], i) => `<path style="--i:${i}" d="M${x} ${y} C ${(x + hub[0]) / 2} ${y}, ${(x + hub[0]) / 2} ${hub[1]}, ${hub[0] - 26} ${hub[1]}"/>`)
    .join('');
  const dots = pts.map(([x, y], i) => `<circle style="--i:${i}" cx="${x}" cy="${y}" r="3"/>`).join('');
  return `
  <div class="conv" aria-hidden="true">
    <svg viewBox="0 0 340 260" class="conv__svg">
      <g class="conv__lines">${lines}</g>
      <g class="conv__dots">${dots}</g>
    </svg>
    <span class="conv__hub">${mark(34)}</span>
    <span class="conv__label conv__label--l">Links, grupos e pastas espalhados</span>
    <span class="conv__label conv__label--r">Um servidor organizado</span>
  </div>`;
}

export function why(): string {
  const items = BENEFITS.map(
    (b, i) => `
      <li class="benefit" data-reveal style="--d:${i % 2}">
        <span class="benefit__ico">${icon(b.icon, 20)}</span>
        <h3 class="benefit__title">${b.title}</h3>
        <p class="benefit__text">${b.text}</p>
      </li>`,
  ).join('');

  return `
<section class="section why" id="por-que" aria-labelledby="why-title">
  <div class="container why__layout">
    <div class="why__intro">
      <p class="eyebrow" data-reveal><span>05</span>Por que Atlanta</p>
      <h2 class="h2" id="why-title" data-reveal style="--d:1">Menos tempo procurando. <span class="t-red">Mais tempo explorando.</span></h2>
      <p class="lead" data-reveal style="--d:2">O ATLANTA reúne o que normalmente fica espalhado em dezenas de lugares e organiza tudo por assunto, em um ambiente que você já sabe usar.</p>
      <div data-reveal="scale" style="--d:3">${convergence()}</div>
    </div>
    <ul class="benefits">${items}</ul>
  </div>
</section>`;
}
