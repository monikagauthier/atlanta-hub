import * as C from './config.js';

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatPrice(v: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: C.CURRENCY }).format(v);
}

/** Etiqueta discreta para campos administrativos ainda não configurados. */
export function hint(field: string): string {
  return C.ADMIN_HINTS ? `<span class="admin-hint" title="Defina ${field} em src/config.ts">Configurar · ${field}</span>` : '';
}

const isUrl = (u: string) => /^(https?:|mailto:|tel:)/i.test(u.trim());

/** Estado comercial derivado da configuração — fonte única para todos os componentes. */
export const OFFER = {
  hasPrice: typeof C.PRODUCT_PRICE === 'number' && C.PRODUCT_PRICE > 0,
  hasOriginal:
    typeof C.PRODUCT_PRICE === 'number' &&
    typeof C.ORIGINAL_PRICE === 'number' &&
    C.ORIGINAL_PRICE > C.PRODUCT_PRICE,
  hasCheckout: isUrl(C.CHECKOUT_URL),
  hasInvite: isUrl(C.DISCORD_INVITE_URL),
  hasSupport: C.SUPPORT_CONTACT.label.trim() !== '' && isUrl(C.SUPPORT_CONTACT.href),
  accessType: C.ACCESS_TYPE.trim(),
  accessDuration: C.ACCESS_DURATION.trim(),
};

/**
 * Atributos de um CTA de compra.
 * Com CHECKOUT_URL: abre o checkout. Sem: leva à seção de oferta (CTAs secundários)
 * ou mostra um aviso explícito de configuração (botão principal da oferta).
 */
export function checkoutAttrs(fallback: 'offer' | 'notice'): string {
  if (OFFER.hasCheckout) {
    return `href="${esc(C.CHECKOUT_URL)}" rel="noopener" data-checkout`;
  }
  return fallback === 'offer' ? 'href="#acesso"' : 'href="#acesso" data-checkout-missing';
}

export function configWarnings(): string[] {
  const w: string[] = [];
  if (!OFFER.hasPrice) w.push('PRODUCT_PRICE não definido — a oferta exibe "Valor em definição".');
  if (!OFFER.hasCheckout) w.push('CHECKOUT_URL não definido — o botão de compra exibe um aviso em vez de abrir o checkout.');
  if (!OFFER.hasInvite) w.push('DISCORD_INVITE_URL não definido — link "Já sou membro" oculto no rodapé.');
  if (!OFFER.accessDuration) w.push('ACCESS_DURATION não definido — exibido como "Informada no checkout".');
  if (!OFFER.accessType) w.push('ACCESS_TYPE não definido — exibido como "Informado no checkout".');
  if (!OFFER.hasSupport) w.push('SUPPORT_CONTACT não definido — contato exibido como "em configuração".');
  if (!C.LEGAL.TERMS_URL) w.push('LEGAL.TERMS_URL não definido.');
  if (!C.LEGAL.PRIVACY_URL) w.push('LEGAL.PRIVACY_URL não definido.');
  if (!C.BRAND.SITE_URL) w.push('BRAND.SITE_URL não definido — canonical e og:image ficam relativos.');
  if (C.ADMIN_HINTS) w.push('ADMIN_HINTS = true — etiquetas "Configurar" visíveis. Use false ao publicar.');
  return w;
}
