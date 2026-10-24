/**
 * Iconografia ATLANTA — desenhada sob medida.
 * Grade 24×24, traço 1.6, terminais arredondados. Todos herdam `currentColor`.
 */

const P: Record<string, string> = {
  /* ── Categorias ─────────────────────────────────────────────── */
  ia: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><path d="M12 8.6l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z"/>',
  plr: '<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.5"/><path d="M13.5 3 19 8.5V11"/><path d="M13.5 3v5.5H19"/><circle cx="17" cy="15.5" r="3"/><path d="m15.4 18.1-.6 3.4 2.2-1 2.2 1-.6-3.4"/>',
  vsl: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M10 8.2v4.6l4-2.3z"/><path d="M8 21h8M12 17v4"/>',
  hot: '<path d="M12 21a6 6 0 0 0 6-6c0-4-3-6.2-4.2-10-1.4 2-1.9 3.6-1.8 5.2-1.1-.5-2-1.6-2.4-3.1C7.6 9.2 6 11.6 6 15a6 6 0 0 0 6 6z"/><path d="M12 21a2.4 2.4 0 0 0 2.4-2.4c0-1.4-1-2.5-2.4-3.9-1.4 1.4-2.4 2.5-2.4 3.9A2.4 2.4 0 0 0 12 21z"/>',
  sms: '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8.5L6 20.5V17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" stroke-width="2.4"/>',
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 13h7M8.5 16.5h4.5"/>',
  saas: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 9.6 4.5 4.5 0 0 1 17 18.5z"/><path d="M9.5 14.5h5"/>',
  copy: '<path d="M12 20h8.5"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.2 18.8 3 20l1.2-4.2z"/><path d="m14.5 5.5 3 3"/>',
  leads: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M19 7.5v6M16 10.5h6"/>',
  games: '<path d="M6.5 7.5h11a4.5 4.5 0 0 1 4.5 4.5v1.8a3 3 0 0 1-5.3 1.9l-1.3-1.6H8.6l-1.3 1.6A3 3 0 0 1 2 13.8V12a4.5 4.5 0 0 1 4.5-4.5z"/><path d="M7.5 10.5v3M6 12h3"/><path d="M15.5 11h.01M17.5 13h.01" stroke-width="2.4"/>',
  bots: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4.5V8"/><circle cx="12" cy="3.5" r="1"/><path d="M9 12.5v2M15 12.5v2"/><path d="M2 12.5v3M22 12.5v3"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9.5h18"/><path d="m7.5 5 2 4.5M12.5 5l2 4.5M17.5 5l2 4.5"/>',
  design: '<path d="M12 3 5 13l7 8 7-8z"/><circle cx="12" cy="12.5" r="1.8"/><path d="M12 3v7.7"/>',
  edit: '<circle cx="6" cy="6.5" r="2.8"/><circle cx="6" cy="17.5" r="2.8"/><path d="M8.2 8.3 20 19M8.2 15.7 20 5"/>',
  panels: '<rect x="3" y="3" width="8" height="10" rx="1.6"/><rect x="13" y="3" width="8" height="6" rx="1.6"/><rect x="13" y="11" width="8" height="10" rx="1.6"/><rect x="3" y="15" width="8" height="6" rx="1.6"/>',
  security: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  igaming: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01" stroke-width="2.6"/>',
  prompts: '<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="m7 9 3 3-3 3M12.5 15H17"/>',
  methods: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16"/>',
  sheets: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  editable: '<path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M17.4 3.6a2.1 2.1 0 0 1 3 3L13 14l-4 1 1-4z"/>',
  ext: '<path d="M10 4.5a2 2 0 0 1 4 0V6h3.5a1 1 0 0 1 1 1v3.5H17a2 2 0 0 0 0 4h1.5V18a1 1 0 0 1-1 1H14v-1.5a2 2 0 0 0-4 0V19H6.5a1 1 0 0 1-1-1v-3.5H7a2 2 0 0 0 0-4H5.5V7a1 1 0 0 1 1-1H10z"/>',
  whatsapp: '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.5z"/><path d="M9.2 8.4c-.3 2.8 3 6.4 6.4 6.4l.8-1.6-2-1-.9.9a5 5 0 0 1-2.6-2.6l.9-.9-1-2z"/>',
  info: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/><path d="m8 5.3 8 4.5"/>',
  claude: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/><path d="m13.5 5-3 14"/>',
  traffic: '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M15 7.5h6v6"/>',
  landing: '<rect x="2.5" y="3.5" width="19" height="17" rx="2"/><path d="M2.5 8h19"/><path d="M6 12h6.5M6 15.5h4"/><rect x="15" y="11.5" width="3.5" height="5" rx=".6"/>',
  social: '<path d="m12 3.2 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.6l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>',
  docs: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 10h18"/>',
  dropship: '<path d="M2.5 6.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9.5h-11z"/><path d="M13.5 9.5h3.8l3.2 3.3V16h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  pc: '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 20.5h8M12 16.5v4"/><path d="m8.5 8.5 2 1.75-2 1.75M12.5 12H15"/>',

  /* ── Interface ──────────────────────────────────────────────── */
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  hash: '<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>',
  chat: '<path d="M4 5.5h12a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-4 3v-3H4A1.5 1.5 0 0 1 2.5 14V7A1.5 1.5 0 0 1 4 5.5z"/><path d="M20.5 9.5v7a1.5 1.5 0 0 1-1.5 1.5h-.5v2.5l-3.2-2.5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  pin: '<path d="M9 3h6l-1 6 3.5 3.5v1.5h-11v-1.5L10 9z"/><path d="M12 14v7"/>',
  thread: '<path d="M5 4v8a4 4 0 0 0 4 4h10"/><path d="m15 12 4 4-4 4"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14a6.5 6.5 0 0 1 3 6"/>',
  devices: '<rect x="2.5" y="4.5" width="13" height="10" rx="1.5"/><path d="M5 18.5h8"/><rect x="17" y="8.5" width="4.5" height="11" rx="1.2"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  door: '<path d="M14 3H6a1 1 0 0 0-1 1v17h9"/><path d="M14 3v18l5-1.5V4.5z"/><path d="M11 12h.01" stroke-width="2.4"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m12 8.5 1.1 2.4 2.4 1.1-2.4 1.1L12 15.5l-1.1-2.4L8.5 12l2.4-1.1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
};

export type IconName = keyof typeof P;

export function icon(name: string, size = 20, cls = 'ico'): string {
  const body = P[name];
  if (!body) throw new Error(`Ícone inexistente: ${name}`);
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
