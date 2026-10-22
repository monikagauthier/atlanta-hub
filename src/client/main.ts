/* ATLANTA HUB — interações do cliente. Sem dependências. */

function $<T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document): T | null {
  return r.querySelector<T>(s);
}
function $$<T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document): T[] {
  return Array.from(r.querySelectorAll<T>(s));
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const mobile = window.matchMedia('(max-width: 639px)');

/* ── Header: estado ao rolar + link ativo ─────────────────────────────── */
function initHeader(): void {
  const hdr = $('[data-header]');
  if (!hdr) return;
  const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = $$<HTMLAnchorElement>('[data-nav]');
  const map = new Map<string, HTMLAnchorElement>();
  links.forEach((a) => map.set(a.hash.slice(1), a));
  const targets = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        map.get(e.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  targets.forEach((t) => io.observe(t));
}

/* ── Menu móvel ────────────────────────────────────────────────────────── */
function initMobileNav(): void {
  const btn = $<HTMLButtonElement>('[data-burger]');
  const panel = $('[data-mnav-panel]');
  if (!btn || !panel) return;
  let open = false;

  const set = (v: boolean) => {
    open = v;
    btn.setAttribute('aria-expanded', String(v));
    btn.setAttribute('aria-label', v ? 'Fechar menu' : 'Abrir menu');
    document.documentElement.classList.toggle('nav-open', v);
    if (v) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
      ($('a', panel) as HTMLElement | null)?.focus({ preventScroll: true });
    } else {
      panel.classList.remove('is-open');
      const done = () => {
        if (!open) panel.hidden = true;
      };
      reduced.matches ? done() : window.setTimeout(done, 320);
    }
  };

  btn.addEventListener('click', () => set(!open));
  $$('[data-mnav]', panel).forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      set(false);
      btn.focus();
    }
    if (e.key === 'Tab' && open) {
      const f = [btn, ...$$<HTMLElement>('a', panel)];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (m) => m.matches && open && set(false));
}

/* ── Revelação ao rolar ───────────────────────────────────────────────── */
function initReveal(): void {
  const els = $$('[data-reveal]');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));

  const tl = $('[data-timeline]');
  if (tl) {
    const tio = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          tl.classList.add('is-in');
          tio.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    tio.observe(tl);
  }
}

/* ── Spotlight que segue o cursor ─────────────────────────────────────── */
function initSpotlight(): void {
  if (!finePointer.matches) return;
  document.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as Element).closest?.('[data-spot]') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/* ── Parallax sutil na composição do hero ─────────────────────────────── */
function initTilt(): void {
  const stage = $('[data-tilt]');
  if (!stage || !finePointer.matches || reduced.matches) return;
  const layers = $$('[data-tilt-layer]', stage);
  let raf = 0;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const loop = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    layers.forEach((l) => {
      const depth = parseFloat(l.dataset.tiltLayer || '0');
      l.style.setProperty('--px', `${(cx * (6 + depth * 8)).toFixed(2)}px`);
      l.style.setProperty('--py', `${(cy * (6 + depth * 8)).toFixed(2)}px`);
    });
    stage.style.setProperty('--rx', `${(-cy * 3).toFixed(2)}deg`);
    stage.style.setProperty('--ry', `${(cx * 4).toFixed(2)}deg`);
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const hero = stage.closest('section') || stage;
  hero.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const pe = e as PointerEvent;
    tx = Math.max(-1, Math.min(1, (pe.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
    ty = Math.max(-1, Math.min(1, (pe.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
    kick();
  });
  hero.addEventListener('pointerleave', () => {
    tx = 0;
    ty = 0;
    kick();
  });
}

/* ── Catálogo: filtros com transição FLIP + recolhimento no mobile ────── */
function initCatalog(): void {
  const grid = $('[data-tiles]');
  if (!grid) return;
  const tiles = $$('.tile', grid);
  const buttons = $$<HTMLButtonElement>('[data-filter]');
  const count = $('[data-cat-count]');
  const more = $<HTMLButtonElement>('[data-cat-more]');
  const LIMIT = 8;
  let filter = 'todos';
  let expanded = false;

  const cta = $('[data-tile-cta]', grid);
  /** O card de chamada ocupa exatamente as células livres da última linha. */
  const fitCta = () => {
    if (!cta) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    const visible = tiles.filter((t) => !t.hidden).length;
    const rem = visible % cols;
    const span = rem === 0 ? cols : cols - rem;
    cta.dataset.span = String(span);
    cta.style.setProperty('--span', String(span));
    cta.classList.toggle('is-narrow', span < 2 || (cols > 2 && span < 3));
  };
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(fitCta, 120);
  });

  const apply = (animate: boolean) => {
    const first = new Map<HTMLElement, DOMRect>();
    if (animate) tiles.forEach((t) => !t.hidden && first.set(t, t.getBoundingClientRect()));

    const matches = tiles.filter((t) => filter === 'todos' || (t.dataset.groups || '').split(' ').includes(filter));
    const collapse = mobile.matches && !expanded && matches.length > LIMIT;
    tiles.forEach((t) => {
      const idx = matches.indexOf(t);
      t.hidden = idx === -1 || (collapse && idx >= LIMIT);
    });
    if (count) count.textContent = String(matches.length);
    if (cta) cta.hidden = collapse;
    fitCta();
    if (more) {
      more.hidden = !collapse;
      more.firstChild!.textContent = `Mostrar todas as ${matches.length} categorias `;
    }

    if (!animate || reduced.matches) return;
    tiles.forEach((t) => {
      if (t.hidden) return;
      const last = t.getBoundingClientRect();
      const f = first.get(t);
      if (f) {
        const dx = f.left - last.left;
        const dy = f.top - last.top;
        if (dx || dy) {
          t.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
            duration: 520,
            easing: 'cubic-bezier(.16,1,.3,1)',
          });
        }
      } else {
        t.animate(
          [
            { opacity: 0, transform: 'translateY(12px) scale(.97)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 420, delay: 60, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
        );
      }
    });
  };

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      if (b.dataset.filter === filter) return;
      filter = b.dataset.filter || 'todos';
      expanded = false;
      buttons.forEach((x) => {
        const on = x === b;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced.matches ? 'auto' : 'smooth' });
      apply(true);
    }),
  );
  more?.addEventListener('click', () => {
    expanded = true;
    apply(true);
  });
  mobile.addEventListener('change', () => apply(false));
  apply(false);
}

/* ── Explorador do servidor (tabs) ────────────────────────────────────── */
function initExplorer(): void {
  const srv = $('[data-srv]');
  const tabs = $$<HTMLButtonElement>('[data-zone-tab]');
  const panel = $('#xpanel');
  if (!srv || !tabs.length) return;

  const select = (t: HTMLButtonElement, focus = false) => {
    tabs.forEach((x) => {
      const on = x === t;
      x.classList.toggle('is-on', on);
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
    });
    srv.dataset.active = t.dataset.zoneTab || '';
    panel?.setAttribute('aria-labelledby', t.id);
    if (focus) t.focus();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let n = -1;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = (i + 1) % tabs.length;
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (k === 'Home') n = 0;
      if (k === 'End') n = tabs.length - 1;
      if (n > -1) {
        e.preventDefault();
        select(tabs[n], true);
      }
    });
  });
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */
function initFaq(): void {
  const items = $$('[data-qa]');
  items.forEach((item) => {
    const btn = $<HTMLButtonElement>('.qa__q', item)!;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      items.forEach((o) => {
        o.classList.remove('is-open');
        $('.qa__q', o)!.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── Checkout não configurado: feedback explícito, nunca um botão mudo ── */
function initCheckout(): void {
  const toast = $('[data-toast]');
  let timer = 0;
  $$<HTMLAnchorElement>('[data-checkout-missing]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const notice = $('[data-checkout-notice]');
      if (notice) notice.hidden = false;
      if (toast) {
        toast.textContent = 'O link de compra ainda não foi publicado.';
        toast.hidden = false;
        requestAnimationFrame(() => toast.classList.add('is-on'));
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          toast.classList.remove('is-on');
          window.setTimeout(() => (toast.hidden = true), 300);
        }, 3200);
      }
    }),
  );
}

function init(): void {
  initHeader();
  initMobileNav();
  initReveal();
  initSpotlight();
  initTilt();
  initCatalog();
  initExplorer();
  initFaq();
  initCheckout();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
