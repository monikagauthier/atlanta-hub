import { icon } from '../icons.js';
import { NAV } from '../data.js';
import { brandLogo } from '../img.js';

export function logo(height = 34): string {
  return `<span class="logo" style="--logo-h:${height}px">${brandLogo(height)}</span>`;
}

export function header(): string {
  const links = NAV.map((n) => `<li><a href="${n.href}" data-nav>${n.label}</a></li>`).join('');
  const mlinks = NAV.map(
    (n, i) => `<li style="--i:${i}"><a href="${n.href}" data-mnav>${n.label}${icon('arrowRight', 20)}</a></li>`,
  ).join('');

  return `
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="hdr" data-header>
  <div class="container hdr__in">
    <a href="#inicio" class="hdr__brand" aria-label="ATLANTA HUB — voltar ao início">${logo()}</a>
    <nav class="hdr__nav" aria-label="Navegação principal"><ul>${links}</ul></nav>
    <div class="hdr__actions">
      <a class="btn btn--primary btn--sm hdr__cta" href="#acesso">Quero acessar</a>
      <button class="hdr__burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Abrir menu" data-burger>
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav-panel hidden>
  <nav class="container mnav__in" aria-label="Menu móvel">
    <ul class="mnav__list">${mlinks}</ul>
    <a class="btn btn--primary btn--lg btn--block" href="#acesso" data-mnav>Quero acessar ${icon('arrowRight', 18)}</a>
    <p class="mnav__meta"><span class="dot"></span>Comunidade ATLANTA · acesso pelo Discord</p>
  </nav>
</div>`;
}
