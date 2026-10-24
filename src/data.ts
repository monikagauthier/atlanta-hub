/** Conteúdo editorial da página. Textos curtos, objetivos e sem promessas não confirmadas. */

export type GroupId = 'marketing' | 'ia' | 'ferramentas' | 'tecnologia' | 'design' | 'negocios';

export interface Category {
  name: string;
  icon: string;
  desc: string;
  groups: GroupId[];
  /** Observação de uso responsável, exibida junto à descrição. */
  note?: string;
}

export const CATEGORIES: Category[] = [
  { name: 'Inteligência Artificial', icon: 'ia', groups: ['ia', 'tecnologia'], desc: 'Ferramentas, modelos e usos práticos de IA no dia a dia digital.' },
  { name: 'PLR', icon: 'plr', groups: ['marketing', 'negocios'], desc: 'Materiais com direitos de revenda para adaptar e usar em projetos.' },
  { name: 'VSL', icon: 'vsl', groups: ['marketing'], desc: 'Estrutura, roteiro e referências de cartas de vendas em vídeo.' },
  { name: 'HOT', icon: 'hot', groups: ['marketing', 'negocios'], desc: 'Ofertas e temas em destaque no mercado digital.' },
  { name: 'SMS', icon: 'sms', groups: ['marketing'], desc: 'Comunicação por SMS para campanhas com contatos autorizados.' },
  { name: 'PDFs', icon: 'pdf', groups: ['ferramentas'], desc: 'Guias, apostilas e materiais de leitura em formato digital.' },
  { name: 'SaaS', icon: 'saas', groups: ['tecnologia', 'negocios'], desc: 'Softwares como serviço: referências, modelos e ferramentas online.' },
  { name: 'Copywriting', icon: 'copy', groups: ['marketing'], desc: 'Escrita persuasiva para anúncios, páginas, e-mails e roteiros.' },
  { name: 'Leads', icon: 'leads', groups: ['marketing'], desc: 'Captação, qualificação e organização de contatos interessados.' },
  { name: 'Jogos', icon: 'games', groups: ['tecnologia'], desc: 'Conteúdos sobre jogos, criação e o universo gamer.' },
  { name: 'Robôs', icon: 'bots', groups: ['ia', 'tecnologia'], desc: 'Bots e automações para tarefas repetitivas e atendimento.' },
  { name: 'Vídeos', icon: 'video', groups: ['design'], desc: 'Produção, formatos e recursos para conteúdo em vídeo.' },
  { name: 'Design', icon: 'design', groups: ['design'], desc: 'Identidade visual, layouts e fundamentos de design digital.' },
  { name: 'Edição', icon: 'edit', groups: ['design'], desc: 'Edição de vídeo e imagem: fluxos, recursos e referências.' },
  { name: 'Painéis', icon: 'panels', groups: ['ferramentas', 'tecnologia'], desc: 'Dashboards e painéis para acompanhar e organizar operações.' },
  { name: 'Segurança Digital', icon: 'security', groups: ['tecnologia'], desc: 'Proteção de contas, dados e sistemas.', note: 'Para aprendizado e uso autorizado.' },
  { name: 'iGaming', icon: 'igaming', groups: ['negocios', 'marketing'], desc: 'Conteúdos sobre o mercado de iGaming.', note: '+18. Respeite a legislação local.' },
  { name: 'Prompts', icon: 'prompts', groups: ['ia'], desc: 'Instruções estruturadas para obter melhores respostas de IAs.' },
  { name: 'Métodos', icon: 'methods', groups: ['negocios'], desc: 'Processos e passo a passo para estruturar projetos digitais.' },
  { name: 'Planilhas', icon: 'sheets', groups: ['ferramentas', 'negocios'], desc: 'Modelos para controle, planejamento e análise de dados.' },
  { name: 'Materiais Editáveis', icon: 'editable', groups: ['design', 'ferramentas'], desc: 'Templates prontos para personalizar com a sua marca.' },
  { name: 'Extensões', icon: 'ext', groups: ['ferramentas', 'tecnologia'], desc: 'Complementos de navegador para produtividade e análise.' },
  { name: 'WhatsApp', icon: 'whatsapp', groups: ['marketing'], desc: 'Atendimento, comunicação e vendas pelo WhatsApp.' },
  { name: 'Infoprodutos', icon: 'info', groups: ['negocios', 'marketing'], desc: 'Criação, estrutura e lançamento de produtos digitais.' },
  { name: 'Claude Code', icon: 'claude', groups: ['ia', 'tecnologia'], desc: 'Desenvolvimento de software assistido por IA no terminal.' },
  { name: 'Tráfego Pago', icon: 'traffic', groups: ['marketing'], desc: 'Anúncios, segmentação e otimização de campanhas.' },
  { name: 'Landing Pages', icon: 'landing', groups: ['marketing', 'design'], desc: 'Páginas de captura e de vendas: estrutura e referências.' },
  { name: 'Prova Social', icon: 'social', groups: ['marketing'], desc: 'Como apresentar resultados e depoimentos reais com credibilidade.' },
  { name: 'Documentos', icon: 'docs', groups: ['ferramentas', 'negocios'], desc: 'Modelos de documentos para rotinas e projetos digitais.' },
  { name: 'Dropshipping', icon: 'dropship', groups: ['negocios'], desc: 'Operação de e-commerce sem estoque próprio.' },
  { name: 'Programas para PC', icon: 'pc', groups: ['ferramentas', 'tecnologia'], desc: 'Softwares gratuitos ou devidamente licenciados para desktop.' },
];

export const PILLARS = [
  {
    id: 'ia',
    index: '01',
    title: 'Inteligência Artificial',
    text: 'Prompts, modelos, automações, robôs, desenvolvimento assistido por IA e ferramentas.',
    tags: ['Prompts', 'Modelos', 'Automações', 'Robôs', 'Claude Code'],
  },
  {
    id: 'mkt',
    index: '02',
    title: 'Marketing Digital',
    text: 'Copywriting, PLR, VSL, leads, tráfego pago, infoprodutos e páginas de vendas.',
    tags: ['Copywriting', 'PLR', 'VSL', 'Leads', 'Tráfego'],
  },
  {
    id: 'tools',
    index: '03',
    title: 'Ferramentas e Recursos',
    text: 'Planilhas, templates editáveis, PDFs, extensões, softwares e materiais digitais.',
    tags: ['Planilhas', 'Templates', 'PDFs', 'Extensões'],
  },
  {
    id: 'community',
    index: '04',
    title: 'Conhecimento e Comunidade',
    text: 'Tutoriais, métodos, conteúdos especializados, novidades e interação no Discord.',
    tags: ['Tutoriais', 'Métodos', 'Novidades', 'Interação'],
  },
] as const;

export const BENEFITS = [
  { icon: 'grid', title: 'Diversas categorias, um só ambiente', text: '31 áreas temáticas reunidas em um único servidor, em vez de links e grupos espalhados.' },
  { icon: 'layers', title: 'Organização por assuntos', text: 'Canais separados por tema para você ir direto ao que interessa.' },
  { icon: 'devices', title: 'Acesso pelo Discord', text: 'Uma plataforma conhecida, disponível no navegador, no computador e no celular.' },
  { icon: 'compass', title: 'Diferentes áreas do digital', text: 'IA, marketing, design, tecnologia e negócios lado a lado.' },
  { icon: 'users', title: 'Comunidade temática', text: 'Um espaço para trocar ideias com pessoas interessadas nos mesmos assuntos.' },
  { icon: 'spark', title: 'Recursos para aprender e construir', text: 'Materiais de apoio para estudar, testar ideias e desenvolver seus próprios projetos.' },
];

/** Estrutura ILUSTRATIVA do servidor usada nos mockups. Substitua pelos nomes reais, se desejar. */
export const SERVER_MAP = [
  { cat: 'Início', channels: ['boas-vindas', 'anúncios', 'regras'] },
  { cat: 'Inteligência Artificial', channels: ['prompts', 'claude-code', 'robôs'] },
  { cat: 'Marketing', channels: ['copywriting', 'tráfego-pago', 'vsl'] },
  { cat: 'Ferramentas', channels: ['planilhas', 'editáveis', 'extensões'] },
  { cat: 'Comunidade', channels: ['chat-geral', 'dúvidas'] },
];

export const EXPLORER_ZONES = [
  { id: 'categorias', label: 'Categorias organizadas', text: 'O servidor é dividido em grandes áreas — IA, marketing, ferramentas e comunidade — para você se localizar em segundos.' },
  { id: 'canais', label: 'Canais temáticos', text: 'Dentro de cada categoria, canais dedicados a um assunto específico, como prompts, copywriting ou planilhas.' },
  { id: 'recursos', label: 'Área de recursos', text: 'Materiais reunidos por tipo e tema, prontos para consultar quando precisar.' },
  { id: 'organizacao', label: 'Organização dos materiais', text: 'Recursos nativos do Discord, como mensagens fixadas, tópicos e busca, ajudam a encontrar o que importa.' },
  { id: 'interacao', label: 'Área de interação', text: 'Canais de conversa para tirar dúvidas e trocar ideias com quem explora os mesmos temas.' },
] as const;

export const STEPS = [
  { n: '01', icon: 'card', title: 'Adquira seu acesso', text: 'Escolha a opção disponível e finalize sua compra pelo checkout seguro.' },
  { n: '02', icon: 'door', title: 'Entre na comunidade', text: 'Siga as instruções de acesso ao servidor ATLANTA no Discord.' },
  { n: '03', icon: 'compass', title: 'Explore o ecossistema', text: 'Navegue pelos canais, conheça os recursos disponíveis e aproveite os conteúdos.' },
];

export const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#conteudos', label: 'Conteúdos' },
  { href: '#plataforma', label: 'Plataforma' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#acesso', label: 'Acesso' },
];
