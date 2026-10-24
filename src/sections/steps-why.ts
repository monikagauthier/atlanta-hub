import { icon } from '../icons.js';
import { BENEFITS, STEPS } from '../data.js';
import { img } from '../img.js';
import type { ImgKey } from '../assets.gen.js';

const STEP_VISUALS: { key: ImgKey; alt: string }[] = [
  { key: 'cards', alt: 'Cartões de acesso ATLANTA HUB' },
  { key: 'phone-logo', alt: 'Smartphone com o servidor ATLANTA aberto no Discord' },
  { key: 'library', alt: 'Biblioteca de pastas organizadas por tema' },
];

export function steps(): string {
  const items = STEPS.map(
    (s, i) => `
      <li class="step" style="--i:${i}">
        <div class="step__node"><span>${s.n}</span></div>
        <div class="step__card" data-spot>
          <div class="step__visual">${img(STEP_VISUALS[i].key, { alt: STEP_VISUALS[i].alt, sizes: '(min-width: 900px) 26vw, 70vw', cls: 'step__img' })}</div>
          <h3 class="step__title">${s.title}</h3>
          <p class="step__text">${s.text}</p>
        </div>
      </li>`,
  ).join('');

  return `
<section class="section how" id="como-funciona" aria-labelledby="how-title">
  <div class="container">
    <div class="shead shead--split">
      <h2 class="h2" id="how-title" data-reveal>Simples de entrar. <span class="t-dim">Fácil de explorar.</span></h2>
      <p class="lead" data-reveal style="--d:1">Três etapas entre você e o servidor. As instruções de acesso são enviadas após a confirmação da compra.</p>
    </div>
    <div class="timeline" data-timeline>
      <div class="timeline__track" aria-hidden="true"><span class="timeline__fill"></span></div>
      <ol class="steps">${items}</ol>
    </div>
  </div>
</section>`;
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
      <h2 class="h2" id="why-title" data-reveal>Menos tempo procurando. <span class="t-red">Mais tempo explorando.</span></h2>
      <p class="lead" data-reveal style="--d:1">O ATLANTA reúne o que normalmente fica espalhado em dezenas de lugares e organiza tudo por assunto, em um ambiente que você já sabe usar.</p>
      <figure class="why__visual" data-reveal="scale" style="--d:2">
        ${img('setup', { alt: 'Mockup do servidor ATLANTA em monitor, notebook e smartphone', sizes: '(min-width: 1024px) 38vw, 92vw' })}
      </figure>
    </div>
    <ul class="benefits">${items}</ul>
  </div>
</section>`;
}
