import { img } from '../img.js';

/** "Dentro do Atlanta": o mockup oficial é o protagonista; nada compete com ele. */
export function catalog(): string {
  return `
<section class="section cat" id="conteudos" aria-labelledby="cat-title">
  <div class="container">
    <div class="cat__head">
      <h2 class="h2 cat__title" id="cat-title" data-reveal>Um universo de possibilidades. <span class="t-soft">Em um só lugar.</span></h2>
      <p class="lead cat__lead" data-reveal style="--d:1">Explore conteúdos, ferramentas e recursos digitais organizados em uma única comunidade.</p>
    </div>
    <figure class="cat__stage" data-reveal="rise" style="--d:2">
      ${img('kit', {
        alt: 'Mockup ATLANTA HUB com módulos de inteligência artificial, marketing digital, ferramentas, design e vídeos',
        sizes: '(min-width: 1200px) 1040px, 92vw',
        cls: 'cat__img',
      })}
    </figure>
    <p class="cat__note">Mockup ilustrativo. A disponibilidade de materiais específicos pode variar; softwares devem ser gratuitos ou devidamente licenciados, e conteúdos de segurança digital destinam-se a aprendizado e uso autorizado.</p>
  </div>
</section>`;
}
