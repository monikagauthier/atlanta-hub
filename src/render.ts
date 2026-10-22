import * as C from './config.js';
import { OFFER, configWarnings, esc } from './lib.js';
import { header } from './sections/header.js';
import { hero } from './sections/hero.js';
import { ecosystem } from './sections/ecosystem.js';
import { catalog } from './sections/catalog.js';
import { platform } from './sections/platform.js';
import { steps, why } from './sections/steps-why.js';
import { offer, faq } from './sections/offer-faq.js';
import { finalCta, footer } from './sections/closing.js';

export { configWarnings };

export interface Assets {
  css: string;
  js: string;
}

const TITLE = 'ATLANTA HUB — Tudo para o digital. Em um só lugar.';
const DESC =
  'Comunidade no Discord com conteúdos, ferramentas, métodos e recursos sobre inteligência artificial, marketing digital, automação, design e tecnologia, organizados por tema.';

function abs(path: string): string {
  return C.BRAND.SITE_URL ? C.BRAND.SITE_URL.replace(/\/$/, '') + path : path;
}

function jsonLd(): string {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: C.BRAND.NAME,
    description: DESC,
    brand: { '@type': 'Brand', name: C.BRAND.NAME },
    image: abs('/og.png'),
  };
  if (OFFER.hasPrice && OFFER.hasCheckout) {
    data.offers = {
      '@type': 'Offer',
      price: C.PRODUCT_PRICE,
      priceCurrency: C.CURRENCY,
      url: C.CHECKOUT_URL,
      availability: 'https://schema.org/InStock',
    };
  }
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function renderPage(assets: Assets): string {
  const canonical = C.BRAND.SITE_URL ? `<link rel="canonical" href="${esc(abs('/'))}">` : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE}</title>
<meta name="description" content="${esc(DESC)}">
<meta name="theme-color" content="#080808">
<meta name="color-scheme" content="dark">
${canonical}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${C.BRAND.NAME}">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${esc(DESC)}">
<meta property="og:image" content="${esc(abs('/og.png'))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="ATLANTA HUB — Tudo para o digital. Em um só lugar.">
${C.BRAND.SITE_URL ? `<meta property="og:url" content="${esc(abs('/'))}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${esc(DESC)}">
<meta name="twitter:image" content="${esc(abs('/og.png'))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap">
<link rel="stylesheet" href="${assets.css}">
<script>document.documentElement.classList.add('js')</script>
<script src="${assets.js}" defer></script>
${jsonLd()}
</head>
<body>
${header()}
<main id="conteudo">
${hero()}
${ecosystem()}
${catalog()}
${platform()}
${steps()}
${why()}
${offer()}
${faq()}
${finalCta()}
</main>
${footer()}
</body>
</html>`;
}
