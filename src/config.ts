/**
 * ATLANTA HUB — CONFIGURAÇÃO COMERCIAL CENTRALIZADA
 * ---------------------------------------------------------------------------
 * Este é o ÚNICO arquivo que você precisa editar para publicar a oferta.
 * Depois de alterar, rode `npm run build`.
 *
 * Regra de ouro: nada aqui é inventado. Campos vazios ('' ou null) fazem a
 * página exibir textos neutros e honestos ("informado no checkout", etc.)
 * em vez de valores fictícios. O build lista no terminal o que falta preencher.
 */

export interface SupportContact {
  /** Texto exibido. Ex.: "suporte@seudominio.com" ou "Ticket no Discord" */
  label: string;
  /** Link. Ex.: "mailto:suporte@seudominio.com" ou "https://wa.me/55..." */
  href: string;
  /** Opcional. Ex.: "Segunda a sexta, 9h às 18h". Deixe '' se não houver. */
  hours: string;
}

export interface ServerScreenshot {
  /** Caminho a partir de /public. Ex.: "/screens/canais.webp" */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/* ─── Identidade ─────────────────────────────────────────────────────────── */

export const BRAND = {
  NAME: 'ATLANTA HUB',
  COMMUNITY: 'ATLANTA',
  SLOGAN: 'Tudo para o digital. Em um só lugar.',
  /** URL pública final, sem barra no fim. Ex.: "https://atlantahub.com.br". Usada em SEO/Open Graph. */
  SITE_URL: '',
};

/* ─── Oferta ─────────────────────────────────────────────────────────────── */

/** Preço de venda em reais. Ex.: 97 ou 49.9. `null` = ainda não definido. */
export const PRODUCT_PRICE: number | null = 17.9;

/** Preço "de" (riscado). Só aparece se for MAIOR que PRODUCT_PRICE. Use apenas se for real. */
export const ORIGINAL_PRICE: number | null = null;

/** Código ISO da moeda. */
export const CURRENCY = 'BRL';

/** Complemento opcional do preço. Ex.: "pagamento único", "por mês", "ou 12x de R$ 9,70". */
export const PRICE_NOTE = '';

/** Link do checkout (Hotmart, Kiwify, Eduzz, Stripe...). '' = botão mostra aviso de configuração. */
export const CHECKOUT_URL = '';

/** Convite do servidor. Exibido no rodapé para quem já é membro. '' = oculto. */
export const DISCORD_INVITE_URL = '';

/** Tipo de acesso. Ex.: "Assinatura mensal", "Pagamento único". '' = "Informado no checkout". */
export const ACCESS_TYPE = '';

/** Duração. Ex.: "12 meses", "enquanto a assinatura estiver ativa". '' = "Informada no checkout". */
export const ACCESS_DURATION = '';

/** O que está incluído. Edite para refletir exatamente o que é entregue. */
export const PRODUCT_INCLUSIONS: string[] = [
  'Acesso ao servidor ATLANTA no Discord',
  'Inteligência artificial: prompts, modelos e automações',
  'Marketing digital: copywriting, VSL, tráfego pago e infoprodutos',
  'Ferramentas: planilhas, templates editáveis, PDFs e extensões',
  'Canais temáticos e interação com a comunidade',
];

/**
 * Como o acesso é entregue após a compra. Ex.:
 * "Após a confirmação do pagamento, você recebe por e-mail o convite do servidor."
 * '' = texto neutro dizendo que as instruções são enviadas após a confirmação.
 * NÃO escreva "liberação imediata" se o processo não for automático.
 */
export const DELIVERY_INSTRUCTIONS = '';

/** Política de atualização de conteúdos. '' = texto neutro, sem promessa. */
export const CONTENT_UPDATES = '';

/** Contato de suporte. Deixe label/href '' enquanto não houver canal oficial. */
export const SUPPORT_CONTACT: SupportContact = {
  label: '',
  href: '',
  hours: '',
};

/* ─── Legal ──────────────────────────────────────────────────────────────── */

export const LEGAL = {
  /** URL dos Termos de Uso. '' = item exibido como "em publicação". */
  TERMS_URL: '',
  /** URL da Política de Privacidade. '' = item exibido como "em publicação". */
  PRIVACY_URL: '',
  /** Razão social / CNPJ, se quiser exibir. Ex.: "Atlanta Digital LTDA · CNPJ 00.000.000/0001-00". */
  ENTITY: '',
};

/* ─── Provas visuais ─────────────────────────────────────────────────────── */

/**
 * Capturas REAIS do servidor (coloque os arquivos em /public/screens/).
 * Quando houver itens, a seção "Plataforma" exibe uma galeria com elas.
 */
export const SERVER_SCREENSHOTS: ServerScreenshot[] = [];

/* ─── Modo administrativo ────────────────────────────────────────────────── */

/**
 * true  = exibe pequenas etiquetas "CONFIGURAR" nos campos ainda vazios (útil antes do lançamento).
 * false = esconde as etiquetas. Coloque false ao publicar.
 */
export const ADMIN_HINTS = true;
