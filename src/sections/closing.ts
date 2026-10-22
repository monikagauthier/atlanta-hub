import { icon, mark } from '../icons.js';
import * as C from '../config.js';
import { NAV } from '../data.js';
import { OFFER, checkoutAttrs, esc, hint } from '../lib.js';
import { logo } from './header.js';

export function finalCta(): string {
  return `
<section class="final" aria-labelledby="final-title">
  <div class="final__bg" aria-hidden="true">
    <div class="final__horizon"></div>
    <div class="final__grid"></div>
  </div>
  <div class="container final__in">
    <span class="final__mark" data-reveal="scale">${mark(64)}</span>
    <h2 class="final__title" id="final-title" data-reveal style="--d:1">O digital não para.<br><span class="t-red">Evolua com o Atlanta.</span></h2>
    <p class="final__text" data-reveal style="--d:2">Conheça a comunidade que reúne diferentes áreas do universo digital em um único ambiente.</p>
    <div data-reveal style="--d:3"><a class="btn btn--primary btn--xl btn--glow" ${checkoutAttrs('offer')}>Entrar no Atlanta Hub<span class="btn__ico">${icon('arrowRight', 20)}</span></a></div>
  </div>
  <p class="final__word" aria-hidden="true">ATLANTA</p>
</section>`;
}

function legalLink(label: string, url: string, field: string): string {
  return url
    ? `<li><a href="${esc(url)}">${label}</a></li>`
    : `<li><span class="foot__pending">${label} <small>· em publicação</small></span>${hint(field)}</li>`;
}

export function footer(): string {
  const year = new Date().getFullYear();
  const nav = NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('') + '<li><a href="#faq">Perguntas frequentes</a></li>';
  const contact = OFFER.hasSupport
    ? `<li><a href="${esc(C.SUPPORT_CONTACT.href)}">${icon('mail', 15)}${esc(C.SUPPORT_CONTACT.label)}</a></li>${C.SUPPORT_CONTACT.hours ? `<li class="foot__muted">${esc(C.SUPPORT_CONTACT.hours)}</li>` : ''}`
    : `<li><span class="foot__pending">Canal de suporte <small>· em configuração</small></span>${hint('SUPPORT_CONTACT')}</li>`;
  const invite = OFFER.hasInvite
    ? `<li><a href="${esc(C.DISCORD_INVITE_URL)}" rel="noopener" target="_blank">Já sou membro — abrir servidor ${icon('arrowUpRight', 14)}</a></li>`
    : '';

  return `
<footer class="foot">
  <div class="container">
    <div class="foot__top">
      <div class="foot__brand">
        <a href="#inicio" aria-label="ATLANTA HUB — voltar ao início">${logo(28)}</a>
        <p class="foot__slogan">${C.BRAND.SLOGAN}</p>
      </div>
      <nav class="foot__col" aria-label="Rodapé"><p class="foot__h">Navegação</p><ul>${nav}</ul></nav>
      <div class="foot__col"><p class="foot__h">Acesso</p><ul>
        <li class="foot__muted">Entrega pelo Discord</li>
        <li class="foot__muted">Instruções enviadas após a confirmação da compra</li>
        ${invite}
      </ul></div>
      <div class="foot__col"><p class="foot__h">Contato</p><ul>${contact}</ul></div>
      <div class="foot__col"><p class="foot__h">Legal</p><ul>
        ${legalLink('Termos de Uso', C.LEGAL.TERMS_URL, 'LEGAL.TERMS_URL')}
        ${legalLink('Política de Privacidade', C.LEGAL.PRIVACY_URL, 'LEGAL.PRIVACY_URL')}
      </ul></div>
    </div>
    <div class="foot__bottom">
      <p>© ${year} ${C.BRAND.NAME}${C.LEGAL.ENTITY ? ` · ${esc(C.LEGAL.ENTITY)}` : ''}</p>
      <p class="foot__disclaimer">O ATLANTA HUB é um projeto independente e não é afiliado, patrocinado ou endossado pela Discord Inc. “Discord” é marca registrada de seus respectivos proprietários.</p>
    </div>
  </div>
</footer>
<div class="toast" data-toast role="status" aria-live="polite" hidden></div>`;
}
