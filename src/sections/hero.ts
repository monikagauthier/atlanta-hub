import { icon } from '../icons.js';
import { CATEGORIES } from '../data.js';
import { img } from '../img.js';

export function hero(): string {
  const ticker = CATEGORIES.map((c) => `<span>${c.name}</span>`).join('<i aria-hidden="true">/</i>');
  return `
<section class="hero" id="inicio" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true">
    ${img('hero-bg', { alt: '', decorative: true, sizes: '100vw', cls: 'hero__stage-img', priority: true })}
    <div class="hero__shade"></div>
  </div>

  <div class="container hero__layout">
    <div class="hero__copy">
      <h1 class="hero__title" id="hero-title" data-reveal>
        <span class="hero__line">O universo</span>
        <span class="hero__line">digital</span>
        <span class="hero__line hero__line--red">em um só</span>
        <span class="hero__line hero__line--red">lugar.</span>
      </h1>
      <p class="hero__sub" data-reveal style="--d:1">Explore um ecossistema de conteúdos, ferramentas, métodos e recursos sobre inteligência artificial, marketing digital, automação, design, tecnologia e muito mais.</p>
      <p class="hero__tag" data-reveal style="--d:2"><span class="hero__tag-bar"></span>Um hub. Inúmeras possibilidades.</p>
      <div class="hero__ctas" data-reveal style="--d:3">
        <a class="btn btn--primary btn--lg" href="#acesso">Quero entrar no Atlanta<span class="btn__ico">${icon('arrowRight', 18)}</span></a>
        <a class="btn btn--ghost btn--lg" href="#conteudos">Explorar conteúdos</a>
      </div>
      <ul class="hero__facts" data-reveal style="--d:4">
        <li><strong>${CATEGORIES.length}</strong> categorias temáticas</li>
        <li>${icon('chat', 16)} Acesso pelo Discord</li>
        <li>${icon('devices', 16)} Computador e celular</li>
      </ul>
    </div>

    <figure class="hero__visual" data-tilt>
      <div class="hero__halo" aria-hidden="true"></div>
      <div class="hero__device" data-tilt-layer="0">
        ${img('devices', {
          alt: 'Mockup do servidor ATLANTA no Discord exibido em um monitor e em um smartphone',
          sizes: '(min-width: 1024px) 52vw, 100vw',
          cls: 'hero__device-img',
          priority: true,
        })}
      </div>
      <div class="float float--c" data-tilt-layer="1.5" aria-hidden="true">
        <span class="float__ico float__ico--ok">${icon('check', 16)}</span>
        <span class="float__body"><strong>Entrega via Discord</strong><small>Servidor exclusivo ATLANTA</small></span>
      </div>
      <figcaption class="hero__caption">Mockup ilustrativo</figcaption>
    </figure>
  </div>

  <div class="ticker" aria-hidden="true">
    <div class="ticker__track"><div class="ticker__row">${ticker}<i>/</i></div><div class="ticker__row">${ticker}<i>/</i></div></div>
  </div>
</section>`;
}
