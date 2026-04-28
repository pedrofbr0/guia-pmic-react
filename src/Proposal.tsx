import './guide.css';
import type { ReactNode } from 'react';

type CalloutTone = 'important' | 'warning' | 'success' | 'info';
type BulletListProps = { items: string[] };
type CalloutProps = { tone: CalloutTone; title?: string; children: ReactNode };
type SectionProps = { number: number | string; title: string; children: ReactNode };
type PageProps = { page: number; bandTitle: string; bandSubtitle: string; children: ReactNode };
type TocEntry = { page: number; chapter: string; title: string; subtitle: string; alt?: boolean };

const TOTAL_PAGES = 13;
const SITE_URL = 'https://www.festivalmaisqueviaduto.com.br';
const SITE_NAME = SITE_URL.replace('https://www.', '');
const FESTIVAL_EMAIL = 'festivalmaisqueviaduto@gmail.com';
const FESTIVAL_INSTAGRAM = '@festivalmaisqueviaduto';
const FESTIVAL_INSTAGRAM_URL = `https://www.instagram.com/${FESTIVAL_INSTAGRAM.replace('@', '')}`;
const FESTIVAL_TIKTOK = '@festivalmaisqueviaduto';
const FESTIVAL_TIKTOK_URL = `https://www.tiktok.com/@${FESTIVAL_TIKTOK.replace('@', '')}`;
const FESTIVAL_X = '@maisqueviaduto';
const FESTIVAL_X_URL = 'https://x.com/maisqueviaduto';
const FESTIVAL_LOGO = '/logos/LOGO - FESTIVAL +QV 2026.png';

const TOC_ENTRIES: TocEntry[] = [
  {
    page: 3,
    chapter: 'Capítulo 1',
    title: 'O Festival +QV',
    subtitle: 'Contexto, números, público e estrutura do evento',
  },
  {
    page: 4,
    chapter: 'Capítulo 2',
    title: 'Mídia e Repercussão',
    subtitle: 'Cobertura, credibilidade e histórico de execução',
    alt: true,
  },
  {
    page: 5,
    chapter: 'Capítulo 3',
    title: 'Por Que Patrocinar',
    subtitle: 'Exposição real, conexão emocional e custo-benefício',
  },
  {
    page: 6,
    chapter: 'Capítulo 4',
    title: 'Cota Viaduto e Cota Concreto',
    subtitle: 'Patrocínio de maior destaque e destaque forte',
    alt: true,
  },
  {
    page: 7,
    chapter: 'Capítulo 5',
    title: 'Cota Esquina e Cota Apoio',
    subtitle: 'Presença acessível e apoio cultural',
  },
  {
    page: 8,
    chapter: 'Capítulo 6',
    title: 'Cotas Temáticas',
    subtitle: 'Cerveja, Drink, Palco DJ e Feira de Arte',
    alt: true,
  },
  {
    page: 9,
    chapter: 'Capítulo 6 (cont.)',
    title: 'Cotas Temáticas',
    subtitle: 'Hidratação, Acessibilidade e +QV Sessions',
  },
  {
    page: 10,
    chapter: 'Capítulo 7',
    title: 'Menu à la Carte',
    subtitle: 'Itens avulsos para presença pontual',
    alt: true,
  },
  {
    page: 11,
    chapter: 'Capítulo 8',
    title: 'Permuta e Operação',
    subtitle: 'Parcerias in-kind e fluxo de execução',
  },
  {
    page: 12,
    chapter: 'Capítulo 9',
    title: 'Valores Resumidos e Nota PMIC',
    subtitle: 'Tabela de faixas e separação entre patrocínio e incentivo fiscal',
    alt: true,
  },
  {
    page: 13,
    chapter: 'Encerramento',
    title: 'Contato',
    subtitle: 'Equipe e próximos passos',
  },
];

const FESTIVAL_STATS: [string, string][] = [
  ['Edições realizadas', '4 (desde abril de 2023)'],
  ['Público 2024', '~3.500 pessoas'],
  ['Crescimento', '150 → 2.500 → 3.500 (edições anteriores)'],
  ['Público projetado 2026', '3.000 a 5.000 (dois dias)'],
  ['Local', 'Centro Municipal de Cultura — área pública de 2.652 m²'],
  ['Entrada', 'Gratuita'],
  ['Faixa etária predominante', '18 a 40 anos'],
  ['Atrações 2026', '6 bandas + 2 DJs + feira de artesanato + intervenções artísticas'],
  ['Acessibilidade', 'Libras, audiodescrição, apoio PcD'],
];

const THEMATIC_QUOTAS: Array<{ name: string; slots: string; range: string; items: string[]; tone: 'teal' | 'orange' }> = [
  {
    name: 'Cerveja Oficial',
    slots: '1 vaga',
    range: 'R$ 8.000 a R$ 15.000 — aceita cash + permuta de produto',
    tone: 'teal',
    items: [
      'Exclusividade de cerveja no evento',
      'Marca em copos, chopeiras e banner dedicado na área de bebidas',
      'Menção como "cerveja oficial do +QV" em toda comunicação',
      'Ideal para cervejarias artesanais de Uberlândia',
    ],
  },
  {
    name: 'Drink Oficial',
    slots: '1 vaga',
    range: 'R$ 5.000 a R$ 8.000 — aceita cash + permuta',
    tone: 'teal',
    items: [
      'Exclusividade de drinks e coquetéis',
      'Estação de drinks com identidade visual da marca',
      'Menção como "drink oficial do +QV"',
      'Ideal para casas de drinks e marcas de destilados',
    ],
  },
  {
    name: 'Palco DJ / Lounge',
    slots: '1 vaga',
    range: 'R$ 5.000 a R$ 10.000',
    tone: 'teal',
    items: [
      'Nome do patrocinador no palco secundário: "Palco [Empresa]"',
      'Branding na área de lounge e descanso',
      'Ideal para lifestyle, moda, tecnologia e apps',
    ],
  },
  {
    name: 'Feira de Arte +QV',
    slots: '1 vaga',
    range: 'R$ 3.000 a R$ 6.000',
    tone: 'teal',
    items: [
      'Nome do patrocinador associado: "Feira de Arte +QV por [Empresa]"',
      'Branding nas mesas, estruturas e sinalização da feira',
      'Ideal para moda, papelaria, decoração e artesanato',
    ],
  },
  {
    name: 'Ponto de Hidratação',
    slots: '1 vaga',
    range: 'R$ 2.000 a R$ 5.000',
    tone: 'orange',
    items: [
      'Estação de água gratuita com branding completo da marca',
      'Menção como parceiro de bem-estar do festival',
      'Ideal para marcas de água mineral, farmácias, saúde e esporte',
    ],
  },
  {
    name: 'Acessibilidade +QV',
    slots: '1 vaga',
    range: 'R$ 3.000 a R$ 8.000',
    tone: 'orange',
    items: [
      'Patrocínio da estrutura de inclusão (Libras, audiodescrição, apoio PcD)',
      'Associação direta a responsabilidade social e ESG em toda comunicação',
      'Menção em reportagens sobre acessibilidade do festival',
      'Ideal para empresas com compromisso de inclusão, hospitais, universidades e seguradoras',
    ],
  },
  {
    name: '+QV Sessions (Estúdio)',
    slots: '1 vaga',
    range: 'R$ 3.000 a R$ 6.000',
    tone: 'orange',
    items: [
      'Nome do patrocinador nas sessions gravadas com as bandas do festival',
      'Logo nas sessions publicadas no YouTube e Instagram',
      'Conteúdo com vida longa — visualizações por meses após o evento',
      'Ideal para marcas de áudio, tecnologia, educação e estúdios',
    ],
  },
];

const A_LA_CARTE_ITEMS: [string, string][] = [
  ['Post dedicado no Instagram (carrossel ou vídeo)', 'R$ 800 – R$ 1.500'],
  ['Pack de 3 stories patrocinados', 'R$ 400 – R$ 800'],
  ['Banner no evento (2m × 1m, 1 unidade)', 'R$ 500 – R$ 1.000'],
  ['Distribuição de material na entrada (flyers, brindes)', 'R$ 300 – R$ 600'],
  ['Sacola / eco-bag co-branded com logo do patrocinador', 'R$ 1.500 – R$ 3.000'],
  ['Logo no copo oficial reutilizável', 'R$ 2.000 – R$ 4.000'],
  ['Vinheta no aftermovie (5–10 segundos)', 'R$ 1.000 – R$ 2.000'],
  ['Naming de ação específica (ex: "Wi-Fi por [Empresa]")', 'R$ 1.000 – R$ 3.000'],
];

const IN_KIND_ROWS: [string, string, string][] = [
  ['Cerveja para o evento', 'R$ 5.000 – R$ 10.000', 'Cota Cerveja Oficial'],
  ['Alimentação para equipe e artistas', 'R$ 2.000 – R$ 4.000', 'Logo + menção como parceiro de alimentação'],
  ['Hospedagem de artistas de fora', 'R$ 1.000 – R$ 3.000', 'Logo + menção'],
  ['Impressão gráfica (cartazes, banners, material)', 'R$ 1.000 – R$ 3.000', 'Logo em todo material impresso pelo parceiro'],
  ['Camisetas da equipe / staff', 'R$ 800 – R$ 2.000', 'Logo do parceiro na camiseta + menção'],
  ['Transporte e logística', 'R$ 1.000 – R$ 3.000', 'Logo + menção'],
  ['Cobertura fotográfica / audiovisual extra', 'R$ 2.000 – R$ 5.000', 'Créditos + exposição em material'],
  ['Tendas / estruturas para o evento', 'R$ 2.000 – R$ 5.000', 'Logo nas estruturas + menção'],
];

const SUMMARY_VALUES: [string, string, string][] = [
  ['Viaduto (naming / apresenta)', '1', 'R$ 25.000 – R$ 40.000'],
  ['Concreto (destaque)', '2', 'R$ 10.000 – R$ 15.000'],
  ['Esquina (patrocinador)', '4–6', 'R$ 3.000 – R$ 6.000'],
  ['Apoio (apoiador)', 'Ilimitado', 'R$ 500 – R$ 2.000'],
  ['Temáticas (cerveja, DJ, feira etc.)', '1 cada', 'R$ 2.000 – R$ 15.000'],
  ['À la carte (itens avulsos)', '—', 'R$ 300 – R$ 4.000'],
  ['Permuta', '—', 'Valor equivalente ao produto / serviço'],
];

/* ─── Reusable components ─────────────────────────────────────── */

function BulletList({ items }: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function Callout({ tone, title, children }: CalloutProps) {
  return (
    <div className={`callout callout-${tone}`}>
      {title ? <strong className="callout-title">{title}</strong> : null}
      <div className="callout-body">{children}</div>
    </div>
  );
}

function Section({ number, title, children }: SectionProps) {
  return (
    <section className="guide-section">
      <div className="guide-section-marker"><span>{number}</span></div>
      <div className="guide-section-body">
        <h2>{title}</h2>
        <div className="guide-section-content">{children}</div>
      </div>
    </section>
  );
}

function ProposalHeader() {
  return (
    <header className="pdf-header">
      <div className="pdf-header__logoWrap">
        <img src={FESTIVAL_LOGO} alt="Logo do Festival Mais Que Viaduto" className="pdf-header__logo" />
      </div>
      <div className="pdf-header__copy">
        <div className="pdf-header__eyebrow">PROPOSTA COMERCIAL — FESTIVAL +QV 2026</div>
        <div className="pdf-header__title">Cotas de patrocínio direto para marcas que querem presença real no festival</div>
      </div>
    </header>
  );
}

function ProposalFooter({ page }: { page: number }) {
  return (
    <footer className="pdf-footer">
      <div className="pdf-footer__bar">
        <div className="pdf-footer__contacts">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">{SITE_NAME}</a>
          <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_INSTAGRAM}</a>
          <a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a>
        </div>
        <div className="pdf-footer__page">{page} / {TOTAL_PAGES}</div>
      </div>
    </footer>
  );
}

function PageShell({ page, bandTitle, bandSubtitle, children }: PageProps) {
  return (
    <section className="pdf-page" id={`page-${page}`}>
      <ProposalHeader />
      <div className="page-band">
        <div>
          <h1>{bandTitle}</h1>
          <p>{bandSubtitle}</p>
        </div>
      </div>
      <div className="page-body">{children}</div>
      <ProposalFooter page={page} />
    </section>
  );
}

/* ─── Pages ───────────────────────────────────────────────────── */

function CoverPage() {
  return (
    <section className="pdf-page pdf-page--cover">
      <div className="cover-top">
        <div className="cover-top__text">
          <h1 className="cover-top__title">Proposta Comercial</h1>
          <p className="cover-top__summary">
            Festival +QV 2026 — Cotas de Patrocínio Direto
          </p>
        </div>
        <div className="cover-top__logoWrap">
          <img src={FESTIVAL_LOGO} alt="Logo Festival +QV" className="cover-top__logo" />
        </div>
      </div>

      <div className="cover-body">
        <img src="/logos/05LOGOQV.png" alt="" className="cover-body__outline" aria-hidden="true" />
        <img src="/elementos/viaduto.png" alt="" className="cover-body__deco" aria-hidden="true" />
      </div>

      <footer className="cover-footer">
        <div className="cover-footer__row cover-footer__row--site">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">{SITE_NAME}</a>
        </div>
        <div className="cover-footer__row">
          <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_INSTAGRAM}</a>
          <a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a>
          <span>26 e 27 de setembro de 2026 · Uberlândia, MG</span>
        </div>
      </footer>
    </section>
  );
}

function TocPage() {
  return (
    <PageShell page={2} bandTitle="Sumário" bandSubtitle="Visão geral da proposta comercial">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <p className="toc-intro">
        Este documento trata exclusivamente de <strong>patrocínio comercial privado</strong> com contrapartidas
        promocionais contratadas. Os valores e itens são referenciais e podem ser combinados conforme
        disponibilidade operacional e formalização contratual específica.
      </p>
      <div className="toc-grid">
        {TOC_ENTRIES.map((entry) => (
          <a
            href={`#page-${entry.page}`}
            className={`toc-entry${entry.alt ? ' toc-entry--alt' : ''}`}
            key={entry.page}
          >
            <div className="toc-entry__info">
              <span className="toc-entry__chapter">{entry.chapter}</span>
              <span className="toc-entry__title">{entry.title}</span>
              <span className="toc-entry__subtitle">{entry.subtitle}</span>
            </div>
            <div className="toc-entry__page" aria-label={`Página ${entry.page}`}>{entry.page}</div>
          </a>
        ))}
      </div>
      <div className="toc-legend">
        <strong>Importante:</strong> o patrocínio comercial direto é distinto do incentivo fiscal via PMIC.
        Para saber como utilizar os dois mecanismos em conjunto, solicite o <strong>Guia PMIC UDI 2026</strong>.
      </div>
    </PageShell>
  );
}

function Page3() {
  return (
    <PageShell page={3} bandTitle="O Festival" bandSubtitle="Quem somos, onde acontece e os números de 2026">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={1} title="O Festival Mais Que Viaduto (+QV)">
        <p>
          O Festival Mais Que Viaduto (+QV) é um festival <strong>gratuito</strong> de música independente e arte
          em Uberlândia, MG. Nascido em 2023 da cena autoral da cidade, o +QV reúne bandas, DJs, feira de
          artesanato, intervenções artísticas, food trucks e cerveja artesanal no Centro Municipal de Cultura.
        </p>
        <Callout tone="success" title="Expansão 2026 — dois dias de festival">
          Em 2026 o evento acontece em dois dias: <strong>sábado e domingo, 26 e 27 de setembro</strong>.
        </Callout>
      </Section>

      <Section number={2} title="Números de referência">
        <table className="festival-table">
          <tbody>
            {FESTIVAL_STATS.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </PageShell>
  );
}

function Page4() {
  return (
    <PageShell page={4} bandTitle="Mídia e Repercussão" bandSubtitle="Cobertura, credibilidade e histórico de entrega">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={3} title="Mídia e repercussão">
        <BulletList
          items={[
            'Reportagem ao vivo na MGTV (Globo) — edição de 07/09/2024',
            'Cobertura no Diário de Uberlândia (maior jornal da cidade)',
            'Reportagens no Uberground e Hop Television',
            'Aftermovie profissional em parceria com Hop Television',
            '+QV Sessions gravadas em estúdio — conteúdo no YouTube/Instagram com vida útil longa',
            'Presença ativa em Instagram, TikTok e X/Twitter',
          ]}
        />
      </Section>

      <Section number={4} title="Histórico de prestação de contas">
        <Callout tone="info" title="Confiabilidade institucional">
          Projeto aprovado e executado via PMIC (Edital SMCT nº 013/2023) com prestação de contas{' '}
          <strong>regular</strong> — certificado emitido pela Prefeitura em <strong>11/07/2025</strong>.
          Isso demonstra seriedade, transparência e capacidade de entrega.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page5() {
  return (
    <PageShell page={5} bandTitle="Por Que Patrocinar" bandSubtitle="Mais do que um anúncio — uma experiência de marca">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={5} title="O que é o patrocínio direto">
        <p>
          O patrocínio direto é uma <strong>contratação comercial privada</strong>: a empresa aporta
          recursos próprios e recebe as contrapartidas expressamente previstas nesta proposta e no
          contrato correspondente. Trata-se de mecanismo distinto do incentivo fiscal via PMIC.
        </p>
      </Section>

      <Section number={6} title="O que diferencia o +QV de um anúncio comum">
        <div className="doc-stack">
          <article className="doc-card doc-card--teal">
            <header>Público cativo por horas</header>
            <div className="bullet-list" style={{ padding: '3mm 4mm' }}>
              <p style={{ margin: 0, fontSize: '9.5pt', lineHeight: 1.5 }}>
                Quem vai a um festival fica das 15h às 22h. São 7 horas de exposição contínua à
                sua marca, em contexto de lazer e experiência positiva — muito diferente de um
                outdoor que as pessoas passam em 3 segundos.
              </p>
            </div>
          </article>
          <article className="doc-card doc-card--teal">
            <header>Associação emocional</header>
            <div style={{ padding: '3mm 4mm' }}>
              <p style={{ margin: 0, fontSize: '9.5pt', lineHeight: 1.5 }}>
                Sua marca se conecta ao momento mais marcante do fim de semana. Música ao vivo,
                amigos, sol, cerveja, arte. Isso cria memória afetiva que nenhum banner digital
                reproduz.
              </p>
            </div>
          </article>
          <article className="doc-card doc-card--orange">
            <header>Comunidade real</header>
            <div style={{ padding: '3mm 4mm' }}>
              <p style={{ margin: 0, fontSize: '9.5pt', lineHeight: 1.5 }}>
                O público do +QV é engajado, jovem-adulto, com poder de consumo e forte presença
                digital. A exposição se multiplica organicamente nos stories e posts de quem esteve
                presente.
              </p>
            </div>
          </article>
          <article className="doc-card doc-card--orange">
            <header>Custo-benefício</header>
            <div style={{ padding: '3mm 4mm' }}>
              <p style={{ margin: 0, fontSize: '9.5pt', lineHeight: 1.5 }}>
                Por uma fração do custo de um mês de outdoor ou spot de rádio, sua marca aparece
                para milhares de pessoas num contexto de alto engajamento, com registro audiovisual
                que continua gerando retorno depois do evento.
              </p>
            </div>
          </article>
        </div>
      </Section>
    </PageShell>
  );
}

function Page6() {
  return (
    <PageShell page={6} bandTitle="Cotas de Patrocínio Direto" bandSubtitle="Viaduto — Concreto">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={7} title="Cota Viaduto — Apresenta o Festival">
        <div className="accent-panel" style={{ marginBottom: '3mm' }}>
          <p style={{ margin: 0 }}>
            <strong>1 vaga · R$ 25.000 a R$ 40.000</strong>
          </p>
          <p>
            A posição de maior destaque. O patrocinador tem seu nome diretamente associado ao
            festival: "[Empresa] apresenta: Festival +QV" ou "Festival +QV — apresentado por [Empresa]".
          </p>
        </div>
        <BulletList
          items={[
            'Nome/logo nas principais peças oficiais de comunicação (digitais, impressas e audiovisuais)',
            'Logo em posição central no palco principal (acima do nome do festival)',
            'Até 2 menções verbais institucionais por dia de evento',
            'Estande exclusivo no festival (até 9m², localização privilegiada)',
            '2 posts dedicados nas redes sociais do festival',
            'Presença no aftermovie oficial (vinheta de abertura ou encerramento)',
            'Inclusão em materiais de imprensa e releases produzidos pela organização',
            'Exclusividade de categoria — nenhum concorrente direto no evento',
            'Relatório pós-evento completo (público, alcance digital, clipping, fotos)',
          ]}
        />
      </Section>

      <Section number={8} title="Cota Concreto — Patrocinador Destaque">
        <div className="accent-panel" style={{ marginBottom: '3mm' }}>
          <p style={{ margin: 0 }}>
            <strong>2 vagas · R$ 10.000 a R$ 15.000 cada</strong>
          </p>
          <p>Visibilidade forte em todas as frentes, sem o peso do naming.</p>
        </div>
        <BulletList
          items={[
            'Logo nos painéis laterais do palco',
            'Logo nas principais peças digitais e impressas do plano de comunicação',
            'Estande no festival (até 6m²)',
            '1 post dedicado nas redes sociais do festival',
            'Menção verbal durante o festival',
            'Presença no aftermovie',
            'Relatório pós-evento com métricas',
          ]}
        />
      </Section>
    </PageShell>
  );
}

function Page7() {
  return (
    <PageShell page={7} bandTitle="Cotas de Patrocínio Direto" bandSubtitle="Esquina — Apoio">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={9} title="Cota Esquina — Patrocinador">
        <div className="accent-panel" style={{ marginBottom: '3mm' }}>
          <p style={{ margin: 0 }}>
            <strong>4 a 6 vagas · R$ 3.000 a R$ 6.000 cada</strong>
          </p>
          <p>
            Acessível para empresas que querem presença no festival sem um compromisso de grande
            porte.
          </p>
        </div>
        <BulletList
          items={[
            'Logo em peças selecionadas de divulgação digital e impressa',
            'Menção em 3 stories do Instagram durante a campanha de divulgação',
            'Logo nos banners distribuídos pelo espaço do evento',
            'Relatório pós-evento simplificado',
          ]}
        />
      </Section>

      <Section number={10} title="Cota Apoio — Apoiador">
        <div className="accent-panel" style={{ marginBottom: '3mm' }}>
          <p style={{ margin: 0 }}>
            <strong>Sem limite de vagas · R$ 500 a R$ 2.000</strong>
          </p>
          <p>
            Para microempresas, comércios de bairro e profissionais liberais que querem estar
            associados ao +QV.
          </p>
        </div>
        <BulletList
          items={[
            'Logo na seção "Apoiadores" das peças digitais oficiais em que essa seção estiver prevista',
            'Menção em 1 story do Instagram',
            'Certificado de apoio cultural',
          ]}
        />
      </Section>
    </PageShell>
  );
}

function Page8() {
  const firstHalf = THEMATIC_QUOTAS.filter((q) => q.tone === 'teal');
  return (
    <PageShell page={8} bandTitle="Cotas Temáticas" bandSubtitle="Cerveja Oficial · Drink Oficial · Palco DJ / Lounge · Feira de Arte">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={11} title="Formato das cotas temáticas">
        <p>
          As cotas temáticas estão sujeitas à viabilidade operacional, compatibilidade com a curadoria,
          disponibilidade de categoria e formalização contratual específica.
        </p>
      </Section>

      <div className="doc-stack" style={{ marginTop: '2mm' }}>
        {firstHalf.map((quota) => (
          <article
            className={`doc-card doc-card--${quota.tone}`}
            key={quota.name}
          >
            <header>
              {quota.name} · {quota.slots} · {quota.range}
            </header>
            <BulletList items={quota.items} />
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Page8b() {
  const secondHalf = THEMATIC_QUOTAS.filter((q) => q.tone === 'orange');
  return (
    <PageShell page={9} bandTitle="Cotas Temáticas (cont.)" bandSubtitle="Ponto de Hidratação · Acessibilidade +QV · +QV Sessions">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <div className="doc-stack">
        {secondHalf.map((quota) => (
          <article
            className={`doc-card doc-card--${quota.tone}`}
            key={quota.name}
          >
            <header>
              {quota.name} · {quota.slots} · {quota.range}
            </header>
            <BulletList items={quota.items} />
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Page9() {
  return (
    <PageShell page={10} bandTitle="Menu à la Carte" bandSubtitle="Presença pontual sem cota completa">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={12} title="Itens avulsos disponíveis">
        <p className="small-note">
          Todos os itens dependem de disponibilidade, compatibilidade com o cronograma de produção e
          formalização contratual. A contratação de item avulso não implica inclusão automática em
          outras entregas ou categorias.
        </p>
        <table className="contact-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {A_LA_CARTE_ITEMS.map(([item, value]) => (
              <tr key={item}>
                <td>{item}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </PageShell>
  );
}

function Page10() {
  return (
    <PageShell page={11} bandTitle="Permuta e Operação" bandSubtitle="Parcerias in-kind e fluxo de execução">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={13} title="Parcerias em permuta (in-kind)">
        <p>
          Para empresas que prefiram fornecer produto ou serviço em vez de aporte financeiro direto.
          Cada permuta é formalizada por escrito, com definição objetiva do valor de referência
          atribuído ao item fornecido e das contrapartidas efetivamente aprovadas.
        </p>
        <table className="criteria-table">
          <thead>
            <tr>
              <th>Produto / Serviço</th>
              <th>Valor estimado</th>
              <th>Contrapartida do festival</th>
            </tr>
          </thead>
          <tbody>
            {IN_KIND_ROWS.map(([product, value, counterpart]) => (
              <tr key={product}>
                <td>{product}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{value}</td>
                <td>{counterpart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section number={14} title="Como funciona na prática">
        <div className="timeline-steps">
          {([
            ['Conversa inicial', 'Mapeamento do que a empresa busca e indicação da cota ou combinação que faz mais sentido.'],
            ['Proposta personalizada', 'Formalização dos itens escolhidos, valores, prazos e entregas detalhadas.'],
            ['Contrato', 'Assinatura de contrato comercial com definição expressa de contrapartidas, prazos e condições de pagamento.'],
            ['Entrega das contrapartidas', 'Execução conforme cronograma definido: digitais durante o período de divulgação, presenciais no evento.'],
            ['Relatório pós-evento', 'Envio em até 30 dias: público, fotos, métricas digitais, clipping de mídia e — para cotas maiores — proposta de renovação para 2027.'],
          ] as [string, string][]).map(([title, text], idx) => (
            <article className="timeline-step" key={title}>
              <div className="timeline-step__bubble">{idx + 1}</div>
              <div className="timeline-step__content">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

function Page11() {
  return (
    <PageShell page={12} bandTitle="Valores Resumidos e Nota PMIC" bandSubtitle="Tabela de faixas e distinção de mecanismos">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={15} title="Valores de referência resumidos">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Cota</th>
              <th>Vagas</th>
              <th>Faixa de valor</th>
            </tr>
          </thead>
          <tbody>
            {SUMMARY_VALUES.map(([quota, slots, range]) => (
              <tr key={quota}>
                <td>{quota}</td>
                <td style={{ textAlign: 'center' }}>{slots}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{range}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small-note" style={{ marginTop: '2mm' }}>
          Os valores são referenciais e podem variar conforme escopo, disponibilidade e formato da
          parceria. Itens e categorias poderão ser combinados apenas mediante proposta e contrato
          específicos.
        </p>
      </Section>

      <Section number={16} title="Nota: incentivo fiscal (PMIC)">
        <p>
          Além do patrocínio comercial privado descrito neste documento, existe a possibilidade de
          apoio ao Festival +QV por meio do incentivo fiscal do PMIC — mecanismo público do Município
          de Uberlândia que permite, nos casos elegíveis e mediante aprovação administrativa, deduzir
          até <strong>25% do ISSQN ou do IPTU</strong> em favor de projetos culturais aprovados.
        </p>
        <Callout tone="important" title="Separação de mecanismos">
          O apoio via PMIC possui fluxo, documentação e instrumento próprios, não se confundindo com
          as contrapartidas comerciais desta proposta. Caso a empresa queira usar os dois mecanismos,
          eles serão tratados separadamente.
        </Callout>
        <p>
          Para entender a elegibilidade e o procedimento do incentivo fiscal, solicite nosso{' '}
          <strong>Guia PMIC UDI 2026</strong> pelo e-mail{' '}
          <a href={`mailto:${FESTIVAL_EMAIL}`} style={{ color: 'var(--festival-deep)' }}>
            {FESTIVAL_EMAIL}
          </a>.
        </p>
      </Section>
    </PageShell>
  );
}

function Page12() {
  return (
    <PageShell page={13} bandTitle="Contato" bandSubtitle="Equipe e próximos passos">
      <div className="contact-cta-header">
        <h2>Vamos construir a parceria certa para sua marca</h2>
        <p>
          O +QV estrutura propostas por objetivo de negócio, verba disponível e perfil de ativação.
          O contrato define com clareza entregas, prazos e limites de responsabilidade.
        </p>
      </div>

      <div className="contact-two-col">
        <div>
          <div className="contact-block-title">Canais de contato</div>
          <table className="contact-table">
            <thead>
              <tr><th>Canal</th><th>Informação</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>E-mail</td>
                <td><a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a></td>
              </tr>
              <tr>
                <td>Instagram</td>
                <td>
                  <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    {FESTIVAL_INSTAGRAM}
                  </a>
                </td>
              </tr>
              <tr>
                <td>TikTok</td>
                <td>
                  <a href={FESTIVAL_TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                    {FESTIVAL_TIKTOK}
                  </a>
                </td>
              </tr>
              <tr>
                <td>X (Twitter)</td>
                <td>
                  <a href={FESTIVAL_X_URL} target="_blank" rel="noopener noreferrer">
                    {FESTIVAL_X}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Site</td>
                <td>
                  <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                    {SITE_NAME}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="contact-block-title" style={{ marginTop: '4mm' }}>Equipe</div>
          <div className="team-grid">
            {([
              ['Proponente', 'Pedro Ferreira Baccelli Reis'],
              ['Coord. de Produção', 'João Lucas França Franco Brandão'],
              ['Coord. Artístico e Mídias Sociais', 'Higor Ernandes Ramos Silva'],
              ['Coord. Administrativo', 'Renato Riscifina'],
            ] as [string, string][]).map(([role, name]) => (
              <div className="team-card" key={role}>
                <span className="team-card__role">{role}</span>
                <span className="team-card__name">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="contact-block-title">Resumo comercial</div>
          <div className="pmic-contact-box">
            <header>Festival +QV 2026</header>
            <div className="pmic-contact-box__body">
              <div>
                <strong>Formato</strong>
                Festival gratuito de música independente e arte
              </div>
              <div>
                <strong>Datas</strong>
                26 e 27 de setembro de 2026
              </div>
              <div>
                <strong>Local</strong>
                Centro Municipal de Cultura — Uberlândia / MG
              </div>
              <div>
                <strong>Público estimado</strong>
                3.000 a 5.000 pessoas (dois dias)
              </div>
            </div>
          </div>

          <div className="contact-cta-note" style={{ marginTop: '4mm' }}>
            <img src="/logos/05LOGOQV.png" alt="" className="contact-cta-note__logo" aria-hidden="true" />
            <div>
              <strong>Festival Mais Que Viaduto</strong>
              <p>Proposta comercial — cotas de patrocínio direto 2026</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ─── Root ────────────────────────────────────────────────────── */

export default function Proposal() {
  return (
    <div className="guide-shell">
      <div className="guide-preview-toolbar no-print">
        <span>Preview — Proposta Comercial +QV 2026 · {TOTAL_PAGES} páginas</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', opacity: 0.7 }}>Para PDF perfeito: npm run export:proposal</span>
          <button onClick={() => window.print()}>Imprimir / Salvar PDF</button>
        </div>
      </div>
      <div className="guide-document">
        <CoverPage />
        <TocPage />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
        <Page8 />
        <Page8b />
        <Page9 />
        <Page10 />
        <Page11 />
        <Page12 />
      </div>
    </div>
  );
}
