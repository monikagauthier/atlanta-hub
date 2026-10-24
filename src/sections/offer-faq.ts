import { icon } from '../icons.js';
import { brandLogo, img } from '../img.js';
import * as C from '../config.js';
import { OFFER, checkoutAttrs, esc, formatPrice, hint } from '../lib.js';

function priceBlock(): string {
  if (OFFER.hasPrice) {
    const original = OFFER.hasOriginal
      ? `<p class="price__from">De <s>${formatPrice(C.ORIGINAL_PRICE as number)}</s> por</p>`
      : '';
    const note = C.PRICE_NOTE ? `<p class="price__note">${esc(C.PRICE_NOTE)}</p>` : '';
    return `<div class="price">${original}<p class="price__value">${formatPrice(C.PRODUCT_PRICE as number)}</p>${note}</div>`;
  }
  return `<div class="price price--pending"><p class="price__value price__value--pending">Valor em definição</p><p class="price__note">O preço será exibido aqui assim que a oferta for publicada.</p>${hint('PRODUCT_PRICE')}</div>`;
}

export function offer(): string {
  const incl = C.PRODUCT_INCLUSIONS.map((t) => `<li>${icon('check', 16)}<span>${esc(t)}</span></li>`).join('');
  const rows = [
    ['chat', 'Entrega', 'Servidor ATLANTA no Discord', ''],
    ['layers', 'Tipo de acesso', OFFER.accessType || 'Informado no checkout', OFFER.accessType ? '' : hint('ACCESS_TYPE')],
    ['clock', 'Duração', OFFER.accessDuration || 'Informada no checkout', OFFER.accessDuration ? '' : hint('ACCESS_DURATION')],
  ]
    .map(([i, k, v, h]) => `<div class="spec">${icon(i, 16)}<dt>${k}</dt><dd>${esc(v)}${h}</dd></div>`)
    .join('');

  return `
<section class="section offer" id="acesso" aria-labelledby="offer-title">
  <div class="offer__glow" aria-hidden="true"></div>
  <div class="container">
    <div class="shead shead--center">
      <h2 class="h2" id="offer-title" data-reveal>Seu próximo passo no digital <span class="t-soft">começa aqui.</span></h2>
      <p class="lead" data-reveal style="--d:1">Tenha acesso ao ecossistema ATLANTA HUB e explore os recursos disponíveis na comunidade.</p>
    </div>

    <div class="ticket" data-reveal="scale" style="--d:2">
      <div class="ticket__main">
        <div class="ticket__visual">${img('pack', { alt: 'Pacote ATLANTA HUB: caixa, cartão de acesso e smartphone com o servidor', sizes: '(min-width: 900px) 280px, 72vw' })}</div>
        <p class="ticket__brand">${brandLogo(30)}</p>
        <h3 class="ticket__title">Acesso à comunidade ATLANTA</h3>
        <p class="ticket__label">O que está incluído</p>
        <ul class="ticket__list">${incl}</ul>
      </div>
      <div class="ticket__cut" aria-hidden="true"></div>
      <div class="ticket__side">
        ${priceBlock()}
        <dl class="specs">${rows}</dl>
        <a class="btn btn--primary btn--lg btn--block btn--glow" ${checkoutAttrs('notice')}>Garantir meu acesso<span class="btn__ico">${icon('arrowRight', 18)}</span></a>
        <p class="ticket__notice" data-checkout-notice role="status" hidden>O link de compra ainda não foi publicado. Volte em breve${OFFER.hasSupport ? ` ou fale com o suporte em <a href="${esc(C.SUPPORT_CONTACT.href)}">${esc(C.SUPPORT_CONTACT.label)}</a>` : ''}.</p>
        ${OFFER.hasCheckout ? '' : hint('CHECKOUT_URL')}
        <p class="ticket__secure">${icon('shield', 14)}Pagamento processado na página de checkout</p>
      </div>
    </div>
  </div>
</section>`;
}

function faqItems(): [string, string][] {
  const delivery =
    C.DELIVERY_INSTRUCTIONS.trim() ||
    'Após a confirmação da compra, você recebe as instruções para entrar no servidor ATLANTA no Discord. O canal de envio e o prazo dessas instruções são informados no checkout.';
  const duration = OFFER.accessDuration
    ? `Sim. ${OFFER.accessType ? `${esc(OFFER.accessType)}, com acesso` : 'O acesso é'} válido por ${esc(OFFER.accessDuration)}.`
    : 'As condições de tipo e duração do acesso são apresentadas no checkout, antes da finalização da compra. Confira-as com atenção.';
  const updates =
    C.CONTENT_UPDATES.trim() ||
    'A política de atualização dos conteúdos é definida pela equipe ATLANTA. Se essa informação for importante para a sua decisão, consulte o suporte antes de comprar.';
  const support = OFFER.hasSupport
    ? `O suporte é feito por <a href="${esc(C.SUPPORT_CONTACT.href)}">${esc(C.SUPPORT_CONTACT.label)}</a>${C.SUPPORT_CONTACT.hours ? ` — ${esc(C.SUPPORT_CONTACT.hours)}` : ''}.`
    : 'Os canais oficiais de suporte são informados na página de compra e dentro da comunidade.';

  return [
    ['O que é o ATLANTA HUB?', 'É uma comunidade digital no Discord que reúne conteúdos, ferramentas, métodos e recursos sobre inteligência artificial, marketing digital, design, tecnologia e negócios, organizados em categorias e canais temáticos.'],
    ['Como recebo meu acesso?', esc(delivery)],
    ['Preciso ter Discord?', 'Sim. Todo o acesso acontece dentro do Discord, que é gratuito. Se ainda não tiver uma conta, você pode criá-la em <a href="https://discord.com" rel="noopener" target="_blank">discord.com</a>.'],
    ['Quais assuntos encontro na comunidade?', 'Inteligência artificial, prompts, marketing digital, copywriting, tráfego pago, design, edição, planilhas, materiais editáveis, tecnologia, negócios digitais e outras áreas apresentadas em <a href="#conteudos">Conteúdos</a>. A disponibilidade de materiais específicos pode variar.'],
    ['Posso acessar pelo celular?', 'Sim. O Discord tem aplicativos para Android e iOS, além das versões para computador e navegador.'],
    ['O acesso possui prazo?', duration],
    ['Os conteúdos são atualizados?', esc(updates)],
    ['Como funciona o suporte?', support],
  ];
}

export function faq(): string {
  const items = faqItems()
    .map(
      ([q, a], i) => `
      <div class="qa" data-qa>
        <h3 class="qa__h">
          <button type="button" class="qa__q" id="qa-q${i}" aria-expanded="false" aria-controls="qa-a${i}">
            <span class="qa__t">${q}</span>
            <span class="qa__ico" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="qa__a" id="qa-a${i}" role="region" aria-labelledby="qa-q${i}">
          <div class="qa__inner"><p>${a}</p></div>
        </div>
      </div>`,
    )
    .join('');

  return `
<section class="section faq" id="faq" aria-labelledby="faq-title">
  <div class="container faq__layout">
    <div class="faq__intro">
      <h2 class="h2" id="faq-title" data-reveal>Perguntas <span class="t-soft">frequentes.</span></h2>
      <p class="lead" data-reveal style="--d:1">Informações objetivas sobre acesso, plataforma e suporte.</p>
      <figure class="faq__visual" data-reveal="scale" style="--d:2">${img('monitor-chat', { alt: 'Monitor com o canal de conversa do servidor ATLANTA', sizes: '(min-width: 1024px) 30vw, 1px' })}</figure>
    </div>
    <div class="qas" data-reveal style="--d:1">${items}</div>
  </div>
</section>`;
}
