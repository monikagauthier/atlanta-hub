import { icon, mark } from '../icons.js';
import { EXPLORER_ZONES, SERVER_MAP } from '../data.js';
import { SERVER_SCREENSHOTS } from '../config.js';
import { esc } from '../lib.js';

function serverMock(): string {
  const groups = SERVER_MAP.map(
    (g, gi) => `
      <div class="srv__group">
        <p class="srv__cat" data-zone="categorias">${icon('chevronDown', 11)}${g.cat}</p>
        <ul class="srv__chans" data-zone="${gi === 4 ? 'interacao' : 'canais'}">
          ${g.channels
            .map((c) => {
              const on = c === 'planilhas';
              return `<li class="${on ? 'is-active' : ''}">${icon(gi === 4 ? 'chat' : 'hash', 14)}<span>${c}</span></li>`;
            })
            .join('')}
        </ul>
      </div>`,
  ).join('');

  const resources = [
    ['sheets', 'Planilhas', 'Controle e planejamento'],
    ['editable', 'Editáveis', 'Templates personalizáveis'],
    ['pdf', 'PDFs', 'Guias e apostilas'],
    ['ext', 'Extensões', 'Produtividade'],
    ['docs', 'Documentos', 'Modelos prontos'],
    ['panels', 'Painéis', 'Organização'],
  ]
    .map(
      ([i, t, s]) => `<div class="srv__res"><span class="srv__res-ico">${icon(i, 18)}</span><span><strong>${t}</strong><small>${s}</small></span></div>`,
    )
    .join('');

  return `
  <div class="srv" data-srv data-active="categorias">
    <div class="srv__side">
      <p class="srv__server">${mark(18)}<span>ATLANTA</span>${icon('chevronDown', 14)}</p>
      <div class="srv__groups">${groups}</div>
    </div>
    <div class="srv__main">
      <div class="srv__head" data-zone="organizacao">
        <span class="srv__head-name">${icon('hash', 16)}<strong>planilhas</strong></span>
        <span class="srv__head-crumb">Ferramentas</span>
        <span class="srv__head-tools">
          <span>${icon('pin', 14)}Fixados</span>
          <span>${icon('thread', 14)}Tópicos</span>
          <span class="srv__search">${icon('search', 13)}Buscar</span>
        </span>
      </div>
      <div class="srv__body">
        <div class="srv__lib" data-zone="recursos">
          <p class="srv__lib-h"><span>Recursos</span><span class="srv__lib-line"></span><span>Ferramentas</span></p>
          <div class="srv__res-grid">${resources}</div>
        </div>
        <div class="srv__tips" data-zone="organizacao">
          <p class="srv__lib-h"><span>Como encontrar</span><span class="srv__lib-line"></span></p>
          <ul>
            <li>${icon('pin', 14)}<span>Mensagens fixadas reúnem o essencial de cada canal</span></li>
            <li>${icon('thread', 14)}<span>Tópicos separam as conversas por assunto</span></li>
            <li>${icon('search', 14)}<span>A busca do Discord encontra materiais por palavra-chave</span></li>
          </ul>
        </div>
        <div class="srv__talk" data-zone="interacao">
          <div class="srv__skel"><i class="srv__av"></i><span><i style="--w:38%"></i><i style="--w:72%"></i></span></div>
          <div class="srv__skel"><i class="srv__av"></i><span><i style="--w:28%"></i><i style="--w:56%"></i></span></div>
          <div class="srv__composer">${icon('plus', 15)}<span>Conversar em #chat-geral</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

function gallery(): string {
  if (!SERVER_SCREENSHOTS.length) return '';
  return `
    <div class="shots">
      <p class="eyebrow eyebrow--sm"><span>●</span>Capturas reais do servidor</p>
      <div class="shots__grid">
        ${SERVER_SCREENSHOTS.map(
          (s) => `<figure class="shot"><img src="${esc(s.src)}" alt="${esc(s.alt)}" width="${s.width}" height="${s.height}" loading="lazy" decoding="async"><figcaption>${esc(s.caption)}</figcaption></figure>`,
        ).join('')}
      </div>
    </div>`;
}

export function platform(): string {
  const tabs = EXPLORER_ZONES.map(
    (z, i) => `
      <button type="button" class="xtab${i === 0 ? ' is-on' : ''}" role="tab" id="xtab-${z.id}" aria-selected="${i === 0}" aria-controls="xpanel" tabindex="${i === 0 ? 0 : -1}" data-zone-tab="${z.id}">
        <span class="xtab__n">0${i + 1}</span>
        <span class="xtab__body"><strong>${z.label}</strong><span class="xtab__text">${z.text}</span></span>
        <span class="xtab__bar" aria-hidden="true"></span>
      </button>`,
  ).join('');

  return `
<section class="section plat" id="plataforma" aria-labelledby="plat-title">
  <div class="plat__bg" aria-hidden="true"></div>
  <div class="container">
    <div class="shead shead--center">
      <p class="eyebrow" data-reveal><span>03</span>Plataforma</p>
      <h2 class="h2" id="plat-title" data-reveal style="--d:1">Sua central digital. <span class="t-red">Direto no Discord.</span></h2>
      <p class="lead" data-reveal style="--d:2">Explore as camadas do servidor ATLANTA. Selecione um item para ver onde ele fica na interface.</p>
    </div>

    <div class="plat__layout">
      <div class="xtabs" role="tablist" aria-label="Camadas do servidor" aria-orientation="vertical" data-reveal>${tabs}</div>
      <div class="plat__stage" id="xpanel" role="tabpanel" aria-labelledby="xtab-categorias" data-reveal="scale" style="--d:1">
        ${serverMock()}
        <p class="plat__note">${icon('shield', 14)}Representação ilustrativa. Nomes de canais e organização podem variar no servidor real.</p>
      </div>
    </div>
    ${gallery()}
  </div>
</section>`;
}
