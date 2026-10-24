import { IMG, type ImgKey } from './assets.gen.js';
import { esc } from './lib.js';

let BASE = '';
/** Definido por render.ts antes de renderizar as seções (prefixo do GitHub Pages etc.). */
export function setBase(b: string): void {
  BASE = b;
}
export function url(path: string): string {
  return BASE + path;
}

export interface ImgOpts {
  alt: string;
  /** Atributo `sizes` — largura exibida em cada breakpoint. */
  sizes: string;
  cls?: string;
  /** true = imagem acima da dobra (eager + fetchpriority=high). */
  priority?: boolean;
  /** Decorativa: alt vazio e aria-hidden. */
  decorative?: boolean;
}

/** <img> responsivo a partir dos assets oficiais processados (public/img). */
export function img(key: ImgKey, o: ImgOpts): string {
  const a = IMG[key];
  const srcset = a.srcs.map((s) => `${url(s.file)} ${s.w}w`).join(', ');
  const fallback = a.srcs[a.srcs.length > 1 ? 1 : 0];
  const load = o.priority ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  const alt = o.decorative ? 'alt="" aria-hidden="true"' : `alt="${esc(o.alt)}"`;
  return `<img${o.cls ? ` class="${o.cls}"` : ''} src="${url(fallback.file)}" srcset="${srcset}" sizes="${o.sizes}" width="${a.w}" height="${a.h}" ${alt} ${load} decoding="async">`;
}

/** Primeiro arquivo (menor) de um asset — para preload. */
export function preloadHref(key: ImgKey): { href: string; srcset: string } {
  const a = IMG[key];
  return { href: url(a.srcs[0].file), srcset: a.srcs.map((s) => `${url(s.file)} ${s.w}w`).join(', ') };
}

/** Logo oficial ATLANTA HUB (cromo + neon). */
export function brandLogo(heightPx: number, cls = 'logo-img'): string {
  return img('logo', { alt: 'ATLANTA HUB', sizes: `${Math.round(heightPx * (IMG.logo.w / IMG.logo.h))}px`, cls });
}

/** Emblema oficial "A". */
export function emblem(px: number, cls = 'emblem-img'): string {
  return img('emblem', { alt: '', decorative: true, sizes: `${px}px`, cls });
}
