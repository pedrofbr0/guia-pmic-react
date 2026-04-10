import './guide.css';
import type { ReactNode } from 'react';

type CalloutTone = 'important' | 'warning' | 'success' | 'info';
type BulletListProps = { items: string[] };
type CalloutProps = { tone: CalloutTone; title?: string; children: ReactNode };
type SectionProps = { number: number | string; title: string; children: ReactNode };
type Step = { step: number; title: string; content: ReactNode };
type PageProps = { page: number; bandTitle: string; bandSubtitle: string; children: ReactNode };
type TocEntry = { page: number; chapter: string; title: string; subtitle: string; alt?: boolean };

const TOTAL_PAGES = 12;
const SITE_URL = 'https://www.festivalmaisqueviaduto.com.br';
const SITE_NAME = SITE_URL.replace('https://www.', '');
const FESTIVAL_EMAIL = 'festivalmaisqueviaduto@gmail.com';
const FESTIVAL_INSTAGRAM = '@festivalmaisqueviaduto';
const FESTIVAL_INSTAGRAM_URL = `https://www.instagram.com/${FESTIVAL_INSTAGRAM.replace('@', '')}`;
const FESTIVAL_TIKTOK = '@festivalmaisqueviaduto';
const FESTIVAL_TIKTOK_URL = `https://www.tiktok.com/${FESTIVAL_TIKTOK.replace('@', '')}`;
const FESTIVAL_X_URL = 'https://x.com/maisqueviaduto';
const FESTIVAL_X = '@maisqueviaduto';
const PMIC_SITE_URL = 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/cultura-e-turismo/pmic/';
const PMIC_SITE_URL_PATH = PMIC_SITE_URL.replace('https://', '');
const PORTARIA_SMCT_N_55_2025_URL = 'https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/07/7152.pdf';
const EDITAL_SMCT_N_11_2025_URL = 'https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/06/EDITAL-SMCT-N-112025.pdf';
const FESTIVAL_LOGO = '/logos/LOGO - FESTIVAL +QV 2026.png';

const TOC_ENTRIES: TocEntry[] = [
  {
    page: 3,
    chapter: 'Capítulo 1',
    title: 'O PMIC e a Oportunidade para a Empresa',
    subtitle: 'Seções 1 e 2 — O que é o programa e qual a vantagem financeira',
  },
  {
    page: 4,
    chapter: 'Capítulo 2',
    title: 'Conheça o Festival +QV',
    subtitle: 'Seção 3 — O projeto, os números e por que apoiar',
    alt: true,
  },
  {
    page: 5,
    chapter: 'Capítulo 3',
    title: 'Elegibilidade e Escolha de Projetos',
    subtitle: 'Seções 4 e 5 — Quem pode usar o mecanismo e quais projetos pode apoiar',
  },
  {
    page: 6,
    chapter: 'Capítulo 4',
    title: 'Documentação Necessária',
    subtitle: 'Seção 6 — Documentos exigidos pela Portaria Conjunta SMCT/SMF nº 55/2025',
    alt: true,
  },
  {
    page: 7,
    chapter: 'Capítulo 5',
    title: 'Declaração de Intenção',
    subtitle: 'Seções 7 e 8 — O documento central do processo e como a DI deve ser entregue',
  },
  {
    page: 8,
    chapter: 'Capítulo 6 — Parte 1',
    title: 'Passo a Passo Completo',
    subtitle: 'Seção 9 — Roteiro detalhado: passos 1 a 5 para formalizar o incentivo',
    alt: true,
  },
  {
    page: 9,
    chapter: 'Capítulo 6 — Parte 2',
    title: 'Passo a Passo Completo',
    subtitle: 'Continuação — Passos 6 a 10 e critérios da Fazenda',
  },
  {
    page: 10,
    chapter: 'Capítulo 7',
    title: 'Regras Específicas e Problemas',
    subtitle: 'Seções 10 e 11 — IPTU, situações de indeferimento e consequências graves',
    alt: true,
  },
  {
    page: 11,
    chapter: 'Capítulo 8',
    title: 'Checklist Final e Conclusão',
    subtitle: 'Seções 12 e 13 — Validação completa e norma aplicável',
  },
  {
    page: 12,
    chapter: 'Capítulo 9',
    title: 'Contato e Próximos Passos',
    subtitle: 'Como entrar em contato com o Festival +QV e o PMIC',
    alt: true,
  },
];

const FESTIVAL_STATS: [string, string][] = [
  ['Edições realizadas', '4 (desde abril de 2023)'],
  ['Público na última edição (2024)', '~3.500 pessoas'],
  ['Crescimento de público', '150 → 2.500 → 3.500'],
  ['Local em 2026', 'Centro Municipal de Cultura'],
  ['Datas 2026', '26 e 27 de setembro (sábado e domingo)'],
  ['Entrada', 'Gratuita'],
  ['Porte do projeto PMIC 2026', 'Grande (até R$ 150.000)'],
  ['Cobertura de mídia', 'MGTV (Globo), Diário de Uberlândia, Uberground, Hop Television'],
  ['Prestação de contas 2024', 'Regular — certificado PMIC'],
];

const FAZENDA_CRITERIA: [string, string][] = [
  ['Viabilidade financeira (Art. 2º, I)', 'Média 12 meses de ISS Próprio × 25% deve ser ≥ valor mensal programado para depósito'],
  ['Alíquota mínima (Art. 2º, II)', 'Alíquota dos serviços ≥ 3% (exceto subitens 7.02, 7.05 e 16.01 da LC 336/2003)'],
  ['Carga tributária mínima (Art. 2º, III)', 'Dedução não pode resultar em carga tributária mensal < 2%'],
  ['Acumulação de benefícios (Art. 2º, IV)', 'Acumulação com outro benefício fiscal não pode reduzir alíquota abaixo de 2%'],
  ['Simples Nacional (Art. 2º, V)', 'Incentivador NÃO pode ser optante pelo Simples Nacional'],
  ['CND (Art. 2º, VI)', 'Deve apresentar Certidão Negativa de Débitos perante o Município'],
];

const NORMAS_REFERENCIA: string[] = [
  'Lei nº 14.006, de 06 de julho de 2023 (Lei do PMIC)',
  'Portaria Conjunta SMCT/SMF nº 55/2025 — requisitos para incentivo fiscal (DOM nº 7152, 23/07/2025)',
  'Edital SMCT nº 11/2025 — seleção de projetos PMIC exercício 2026',
  'Deliberação CMPC nº 001/2025 — diretrizes e valores de porte',
  'Instrução Normativa SMCT nº 001/2025 — prestação de contas',
  'Lei Complementar Municipal nº 336/2003 — código tributário (ISSQN)',
];

const TIMELINE_STEPS_PART1: Step[] = [
  {
    step: 1,
    title: 'Escolher um projeto já aprovado',
    content:
      'A empresa deve selecionar um projeto cultural aprovado no PMIC e confirmar com o proponente que ele está apto a captar via Incentivo Fiscal. Vale pedir cópia do resultado do edital, resumo do projeto, orçamento aprovado e dados da conta vinculada.',
  },
  {
    step: 2,
    title: 'Verificar elegibilidade tributária',
    content:
      'Antes de qualquer anúncio de apoio, confira com seu contador: se é contribuinte de ISSQN ou IPTU no município; se está regular perante o Município; se não é optante pelo Simples Nacional (caso de ISS); e se há viabilidade para a dedução pretendida.',
  },
  {
    step: 3,
    title: 'Emitir a Certidão Negativa de Débitos',
    content:
      'A CND municipal pode ser emitida online no portal de Finanças da Prefeitura de Uberlândia. A certidão precisa estar atualizada no momento da entrega da Declaração de Intenção.',
  },
  {
    step: 4,
    title: 'Separar documentação societária',
    content:
      'Reúna: CNPJ atualizado, contrato social ou estatuto, documentos do representante legal e procuração (se houver representação por terceiro). Se for incentivo por IPTU, separe também a matrícula atualizada do imóvel.',
  },
  {
    step: 5,
    title: 'Assinar a DI junto ao proponente',
    content:
      'Com a documentação pronta, a empresa e o proponente formalizam a Declaração de Intenção. São 4 vias assinadas pelo proponente e assinadas/carimbadas pelo incentivador.',
  },
];

const TIMELINE_STEPS_PART2: Step[] = [
  {
    step: 6,
    title: 'Aguardar análise da Cultura e Fazenda',
    content:
      'O Núcleo de Gestão do PMIC recebe a DI, verifica a regularidade formal (Art. 1º, §1º e §2º) e encaminha à Secretaria Municipal de Finanças para análise tributária via Ofício — inclusive por Web e-DOCS.',
  },
  {
    step: 7,
    title: 'Entender os critérios da Fazenda (ISSQN)',
    content: (
      <>
        <p className="step-lead">Para autorizar a dedução de ISSQN, a Fazenda exige cumulativamente (Art. 2º da Portaria 55/2025):</p>
        <table className="criteria-table">
          <thead>
            <tr>
              <th>Critério</th>
              <th>Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {FAZENDA_CRITERIA.map(([crit, det]) => (
              <tr key={crit}>
                <td>{crit}</td>
                <td>{det}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    step: 8,
    title: 'Só deduzir após autorização',
    content:
      'O valor deduzido só deve ser depositado na conta do projeto após aprovação pela Secretaria Municipal de Finanças e pelo Núcleo de Gestão do PMIC. Somente após a autorização da primeira DI o proponente celebra o Termo de Compromisso.',
  },
  {
    step: 9,
    title: 'Entender quando o projeto pode começar',
    content:
      'O proponente só pode iniciar o projeto e movimentar a conta após duas condições (item 12.2.7 do Edital): atingir 60% da captação do valor aprovado e ocorrer o depósito da primeira parcela pelo incentivador.',
  },
  {
    step: 10,
    title: 'Acompanhar execução e comunicação',
    content:
      'É obrigatória a menção ao Município de Uberlândia, à SMCT e ao PMIC com uso das logomarcas em todos os materiais. As artes devem ser enviadas com antecedência para aprovação. O apoio está vinculado a um projeto público com prestação de contas.',
  },
];

/* ─── Reusable components ─────────────────────────────────────── */

function BulletList({ items }: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
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
      <div className="guide-section-marker">
        <span>{number}</span>
      </div>
      <div className="guide-section-body">
        <h2>{title}</h2>
        <div className="guide-section-content">{children}</div>
      </div>
    </section>
  );
}

function GuideHeader() {
  return (
    <header className="pdf-header">
      <div className="pdf-header__logoWrap">
        <img src={FESTIVAL_LOGO} alt="Logo do Festival Mais Que Viaduto" className="pdf-header__logo" />
      </div>
      <div className="pdf-header__copy">
        <div className="pdf-header__eyebrow">GUIA PMIC UDI — 2026</div>
        <div className="pdf-header__title">Como empresas podem apoiar cultura e deduzir até 25% do ISSQN ou IPTU</div>
      </div>
    </header>
  );
}

function GuideFooter({ page }: { page: number }) {
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
      <GuideHeader />
      <div className="page-band">
        <div>
          <h1>{bandTitle}</h1>
          <p>{bandSubtitle}</p>
        </div>
      </div>
      <div className="page-body">{children}</div>
      <GuideFooter page={page} />
    </section>
  );
}

function TimelineSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="timeline-steps">
      {steps.map((item) => (
        <article className="timeline-step" key={item.step}>
          <div className="timeline-step__bubble">{item.step}</div>
          <div className="timeline-step__content">
            <h3>{item.title}</h3>
            {typeof item.content === 'string'
              ? <p>{item.content}</p>
              : <div className="timeline-step__rich">{item.content}</div>
            }
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Pages ───────────────────────────────────────────────────── */

function CoverPage() {
  return (
    <section className="pdf-page pdf-page--cover">
      <div className="cover-top">
        <div className="cover-top__text">
          <h1 className="cover-top__title">Guia PMIC UDI 2026</h1>
          <p className="cover-top__summary">
            Como empresas podem apoiar cultura em Uberlândia e deduzir até 25% do ISSQN ou IPTU
          </p>
        </div>
        <div className="cover-top__logoWrap">
          <img src="/logos/LOGO - FESTIVAL +QV 2026.png" alt="Logo Festival +QV" className="cover-top__logo" />
        </div>
      </div>

      <div className="cover-body">
        <img src="/logos/05LOGOQV.png" alt="" className="cover-body__outline" aria-hidden="true" />
        <img src="/elementos/megafone.png" alt="" className="cover-body__deco" aria-hidden="true" />
      </div>

      <footer className="cover-footer">
        <div className="cover-footer__row cover-footer__row--site">
          <a href={PMIC_SITE_URL} target="_blank" rel="noopener noreferrer">{PMIC_SITE_URL_PATH}</a>
        </div>
        <div className="cover-footer__row">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">{SITE_NAME}</a>
          <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_INSTAGRAM}</a>
          <a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a>
        </div>
      </footer>
    </section>
  );
}

function TocPage() {
  return (
    <PageShell page={2} bandTitle="Sumário" bandSubtitle="Navegue pelo conteúdo deste documento">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <p className="toc-intro">
        Este guia está organizado em 8 capítulos que cobrem desde a apresentação do programa
        até o checklist final antes de protocolar a Declaração de Intenção, com uma página
        de contato ao final. Use os números de página abaixo para localizar a seção de seu interesse.
      </p>
      <div className="toc-grid">
        {TOC_ENTRIES.map((entry) => (
          <a href={`#page-${entry.page}`} className={`toc-entry${entry.alt ? ' toc-entry--alt' : ''}`} key={entry.page}>
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
        <strong>Norma de referência:</strong> Portaria Conjunta SMCT/SMF nº 55/2025 e Lei Municipal nº 14.006/2023.
        Este guia não constitui assessoria jurídica ou tributária. Consulte seu contador e a Secretaria Municipal
        de Cultura e Turismo de Uberlândia para orientação oficial.
      </div>
    </PageShell>
  );
}

function Page3() {
  return (
    <PageShell page={3} bandTitle="O PMIC e a oportunidade para a empresa" bandSubtitle="O que é o programa e por que isso interessa à empresa">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <Section number={1} title="O que é o PMIC e por que isso interessa à empresa">
        <p>O <strong>Programa Municipal de Incentivo à Cultura (PMIC)</strong> de Uberlândia é o mecanismo previsto na Lei nº 14.006/2023 que permite destinar recursos públicos à atividade cultural por dois caminhos:</p>
        <div className="mechanism-grid">
          <article className="mechanism-card mechanism-card--fmc">
            <strong>FMC</strong>
            <span>Fundo Municipal de Cultura</span>
            <p>Repasse direto pelo Poder Público para projetos selecionados em editais.</p>
          </article>
          <article className="mechanism-card mechanism-card--if">
            <strong>IF</strong>
            <span>Incentivo Fiscal</span>
            <p>Empresas destinam parte dos impostos (ISSQN ou IPTU) a projetos culturais aprovados — é aqui que entra a oportunidade para a sua empresa.</p>
          </article>
        </div>
        <Callout tone="info" title="Para as empresas">
          A vertente de Incentivo Fiscal permite que contribuintes de ISSQN ou IPTU canalizem parte do tributo devido para projetos culturais já aprovados pelo PMIC, obtendo dedução tributária dentro dos limites legais.
        </Callout>
      </Section>

      <Section number={2} title="Qual é a vantagem financeira para a empresa">
        <p>A Lei nº 14.006/2023 e o Edital SMCT nº 11/2025 (item 7.3.2) permitem a dedução de tributos municipais dentro do seguinte limite:</p>
        <div className="metric-grid">
          <article className="metric-card">
            <strong>até 25%</strong>
            <span>Dedução sobre o ISSQN mensal próprio</span>
          </article>
          <article className="metric-card">
            <strong>até 25%</strong>
            <span>Dedução sobre o IPTU do imóvel vinculado</span>
          </article>
        </div>
        <Callout tone="success" title="Na prática">
          A empresa transforma uma obrigação tributária em investimento cultural com visibilidade e retorno de imagem. O recurso que iria para o caixa do município é direcionado a um projeto cultural de sua escolha — não é um gasto a mais, é um redirecionamento inteligente.
        </Callout>
        <p className="small-note">
          <strong>Importante:</strong> A dedução não é automática. A Portaria Conjunta SMCT/SMF nº 55/2025 (DOM nº 7152, 23/07/2025) define critérios de viabilidade fiscal analisados pela Secretaria Municipal de Finanças. Detalhes nos capítulos seguintes.
        </p>
        <div className="ref-links-box">
          <span className="ref-links-box__label">Consulte os documentos oficiais:</span>
          <a href={PORTARIA_SMCT_N_55_2025_URL} target="_blank" rel="noopener noreferrer">
            Portaria Conjunta SMCT/SMF nº 55/2025 (PDF — DOM nº 7152, pág. 4)
          </a>
          <a href={EDITAL_SMCT_N_11_2025_URL} target="_blank" rel="noopener noreferrer">
            Edital SMCT nº 11/2025 — PMIC Exercício 2026
          </a>
        </div>
      </Section>
    </PageShell>
  );
}

function Page4() {
  return (
    <PageShell page={4} bandTitle="Conheça o Festival +QV" bandSubtitle="O projeto, os números e por que apoiar">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />

      <div className="festival-quote">
        "Nas esquinas da cidade, onde o concreto ganha vida, ecoam melodias que transcendem barreiras."
      </div>

      <p style={{ margin: '0 0 2mm', fontSize: '9.5pt', lineHeight: 1.5 }}>
        O <strong>Festival Mais Que Viaduto (+QV)</strong> é um festival de música e arte que exalta a riqueza da
        cultura independente, celebra os artistas locais e incentiva o pulsar criativo de Uberlândia.
        É um dos projetos aprovados pelo PMIC para o exercício de 2026.
      </p>

      <div className="festival-data-row">
        <div className="festival-stats-block">
          <div className="festival-block-title">Números do +QV</div>
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
        </div>

        <div className="festival-offers-col">
          <article className="festival-offer-card festival-offer-card--teal">
            <header>O que o festival oferece</header>
            <BulletList items={[
              '6 bandas independentes + 2 DJs de Uberlândia',
              'Feira de artesanato com expositores locais',
              'Intervenções artísticas (graffiti, artes visuais)',
              'Food trucks e cerveja artesanal',
              'Acessibilidade: Libras, audiodescrição, PcD',
              'Estrutura completa: palco, som, luz, segurança',
            ]} />
          </article>
          <article className="festival-offer-card festival-offer-card--fire">
            <header>O que o PMIC oferece ao incentivador</header>
            <BulletList items={[
              'Dedução fiscal de até 25% sobre o ISSQN ou IPTU devidos ao município',
              'Nome da empresa registrado como incentivadora de projeto cultural aprovado pela Prefeitura',
              'Associação pública a um projeto com prestação de contas obrigatória e transparente',
              'Atestado documentado de responsabilidade social e apoio à cultura local',
            ]} />
          </article>
        </div>
      </div>

      <Callout tone="info" title="Outros projetos disponíveis">
        O Festival +QV é um dos projetos aprovados pelo PMIC para captação em 2026. A lista completa pode ser
        consultada no portal oficial:{' '}
        <a href={PMIC_SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{PMIC_SITE_URL_PATH}</a>
      </Callout>

      <div className="festival-socials">
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="festival-social-tag" >🌐 {SITE_NAME}</a>
        <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="festival-social-tag" >📸 {FESTIVAL_INSTAGRAM}</a>
        <a href={FESTIVAL_TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="festival-social-tag" >🎵 {FESTIVAL_TIKTOK} (TikTok)</a>
        <a href={FESTIVAL_X_URL} target="_blank" rel="noopener noreferrer" className="festival-social-tag" >🐦 {FESTIVAL_X} (X/Twitter)</a>
      </div>
    </PageShell>
  );
}

function Page5() {
  return (
    <PageShell page={5} bandTitle="Elegibilidade e escolha de projetos" bandSubtitle="Quem pode usar e o que pode ser apoiado">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={4} title="Quem pode usar o mecanismo">
        <p>Pela Lei nº 14.006/2023, o incentivador pode ser pessoa física ou jurídica contribuinte de IPTU ou ISSQN em Uberlândia.</p>
        <Callout tone="warning" title="Atenção">
          A Portaria Conjunta SMCT/SMF nº 55/2025 trouxe condições objetivas para autorização. Nem toda empresa interessada conseguirá usar o benefício.
        </Callout>
        <h3>Requisitos obrigatórios</h3>
        <BulletList items={[
          'Ser contribuinte de IPTU ou ISSQN em Uberlândia',
          'Apresentar Certidão Negativa de Débitos (CND) municipal atualizada',
          'Não ser optante pelo Simples Nacional (para dedução de ISSQN) — Art. 2º, V da Portaria 55/2025',
          'Atender aos critérios fiscais específicos da Secretaria de Finanças (detalhados no Capítulo 6)',
        ]} />
        <Callout tone="info" title="Validação necessária">
          Antes de avançar, a empresa deve validar sua situação tributária e documental com seu contador e com a Prefeitura.
        </Callout>
      </Section>

      <Section number={5} title="Quais projetos a empresa pode apoiar">
        <p>A empresa só pode direcionar recursos a <strong>projetos culturais já aprovados no PMIC</strong>, dentro das faixas de porte definidas pela Deliberação CMPC nº 001/2025:</p>
        <div className="porte-grid">
          {([
            ['Micro', 'até R$ 15.000'],
            ['Pequeno', 'R$ 15k – 50k'],
            ['Médio', 'R$ 50k – 85k'],
            ['Grande', 'R$ 85k – 150k'],
          ] as [string, string][]).map(([label, value]) => (
            <article className={`porte-card${label === 'Grande' ? ' porte-card--highlight' : ''}`} key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </article>
          ))}
        </div>
        <Callout tone="info" title="Festival +QV">
          O Festival +QV é um projeto de <strong>grande porte</strong> (R$ 85k–150k). Entre em contato pelo e-mail{' '}
          <a href={`mailto:${FESTIVAL_EMAIL}`} style={{ color: 'inherit' }}>{FESTIVAL_EMAIL}</a> para confirmar aptidão à captação.
        </Callout>
        <Callout tone="important" title="Proibido">
          A lei proíbe o incentivador de alterar planilha orçamentária, metas ou ações do projeto aprovado. Isso pode levar ao cancelamento do projeto e à responsabilização.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page6() {
  return (
    <PageShell page={6} bandTitle="Documentação necessária" bandSubtitle="O que a empresa precisa apresentar">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={6} title="Documentos exigidos pela Portaria 55/2025">
        <p>A documentação varia conforme o tipo de incentivador e o tributo utilizado. Todos os itens são do Art. 1º, inciso I da Portaria 55/2025:</p>
        <div className="doc-stack">
          <article className="doc-card doc-card--teal">
            <header>6.1. Empresa incentivando por ISSQN</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais (CND) atualizada',
              'CNPJ (comprovante de inscrição e situação cadastral)',
              'Cópia do ato constitutivo (contrato social, estatuto ou equivalente)',
              'Procuração, se quem assinar não for o representante legal direto',
              'RG e CPF do representante legal',
            ]} />
          </article>
          <article className="doc-card doc-card--orange">
            <header>6.2. Empresa incentivando por IPTU</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais (CND) atualizada',
              'CNPJ (comprovante de inscrição e situação cadastral)',
              'Cópia do ato constitutivo',
              'Procuração, se aplicável',
              'RG e CPF do representante legal',
              'Matrícula atualizada do imóvel (para comprovar propriedade)',
            ]} />
          </article>
          <article className="doc-card doc-card--gold">
            <header>6.3. Pessoa física incentivando por IPTU</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais (CND) atualizada',
              'RG e CPF',
              'Matrícula atualizada do imóvel',
            ]} />
          </article>
        </div>
        <Callout tone="info" title="Dica">
          A CND municipal pode ser emitida online no portal da Prefeitura de Uberlândia, na seção de Finanças. Certifique-se de que esteja atualizada no momento da entrega da Declaração de Intenção.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page7() {
  return (
    <PageShell page={7} bandTitle="Declaração de Intenção" bandSubtitle="O documento central do processo">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={7} title="O que o proponente precisa providenciar">
        <p>Do lado do projeto cultural, o fluxo oficial exige que o proponente já tenha sido aprovado no PMIC e tenha providenciado a documentação de execução.</p>
        <div className="soft-panel">
          <h3>Documentos do proponente aprovado</h3>
          <BulletList items={[
            'Anexos readequados conforme parecer do PMIC (Word e PDF)',
            'Certidões negativas municipal, estadual e federal',
            'Conta bancária exclusiva em nome do proponente para movimentação do projeto',
          ]} />
        </div>
        <Callout tone="warning" title="Após a captação">
          O proponente entrega a DI em quatro vias, assinadas pelo proponente e assinadas/carimbadas pelo incentivador, acompanhada dos documentos da empresa e da CND do incentivador.
        </Callout>
      </Section>

      <Section number={8} title="O que é a Declaração de Intenção (DI)">
        <div className="accent-panel">
          <p><strong>A Declaração de Intenção (DI)</strong> é o documento central do processo de incentivo fiscal. É nela que o incentivador declara formalmente sua intenção de apoiar um projeto cultural específico por meio da canalização de recursos provenientes de ISSQN ou IPTU.</p>
          <p>Pela lei, a obtenção do incentivo fiscal depende da apresentação da documentação do incentivador e do projeto cultural, conforme modelo e condições definidos em ato normativo.</p>
        </div>
        <Callout tone="important" title="Prazo crítico (Art. 1º da Portaria 55/2025)">
          A DI deve ser apresentada pelo proponente à Secretaria Municipal de Cultura e Turismo até o <strong>último dia útil da primeira quinzena do mês anterior</strong> à data programada para o primeiro depósito na conta vinculada ao projeto.
        </Callout>
        <div className="soft-panel soft-panel--compact">
          <h3>Formato da DI</h3>
          <BulletList items={[
            '4 vias impressas',
            'Assinadas pelo proponente',
            'Assinadas e carimbadas pelo incentivador',
            'Acompanhadas de toda a documentação exigida',
          ]} />
        </div>
      </Section>
    </PageShell>
  );
}

function Page8() {
  return (
    <PageShell page={8} bandTitle="Passo a passo completo" bandSubtitle="Como a empresa deve proceder — Parte 1 (passos 1–5)">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={9} title="Roteiro detalhado para incentivo fiscal">
        <p className="small-note">Siga estes passos na ordem apresentada para garantir que o processo seja realizado corretamente e evite problemas com a documentação ou análise tributária.</p>
        <TimelineSteps steps={TIMELINE_STEPS_PART1} />
      </Section>
    </PageShell>
  );
}

function Page9() {
  return (
    <PageShell page={9} bandTitle="Passo a passo completo" bandSubtitle="Como a empresa deve proceder — Parte 2 (passos 6–10)">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={9} title="Roteiro detalhado (continuação — passos 6 a 10)">
        <TimelineSteps steps={TIMELINE_STEPS_PART2} />
        <Callout tone="warning" title="Ponto crítico">
          Nem sempre o valor desejado será aprovado, porque a Fazenda controla a viabilidade fiscal. A empresa deve estar preparada para ajustar o valor caso necessário.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page10() {
  return (
    <PageShell page={10} bandTitle="Regras específicas e problemas" bandSubtitle="IPTU e situações de indeferimento">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={10} title="Regras específicas para IPTU (Art. 4º da Portaria 55/2025)">
        <div className="accent-panel accent-panel--orange">
          <p>As DIs que envolvam dedução de IPTU devem conter a <strong>identificação precisa do imóvel</strong> vinculado ao imposto que servirá de base para a dedução.</p>
          <p>A dedução de até 25% será aplicada sobre o valor do IPTU, <strong>limitada ao montante efetivamente aportado</strong> ao projeto (Art. 4º, §1º).</p>
          <p>Se o contribuinte optar pelo pagamento do IPTU à vista, a dedução será calculada sobre o <strong>valor líquido do tributo</strong>, já considerado o desconto legal dessa modalidade (Art. 4º, §2º).</p>
        </div>
        <Callout tone="info" title="Documentação adicional">
          Empresas ou pessoas físicas que queiram incentivar por IPTU devem apresentar a matrícula atualizada do imóvel para comprovar propriedade.
        </Callout>
      </Section>

      <Section number={11} title="O que pode dar errado">
        <div className="risk-list">
          {[
            ['Documentação incompleta ou desatualizada', 'Falta de documentos ou documentos com prazo vencido'],
            ['Ausência de CND municipal válida', 'Certidão vencida ou com pendências fiscais'],
            ['Não atendimento aos critérios fiscais', 'Valores incompatíveis com a média de recolhimentos'],
            ['Empresa optante pelo Simples Nacional', 'Vedação expressa pelo Art. 2º, V da Portaria 55/2025'],
            ['Tentativa de interferir no projeto', 'Alteração de planilha, metas ou ações aprovadas'],
          ].map(([title, text]) => (
            <div className="risk-item" key={title}>
              <span className="risk-item__icon">!</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout tone="important" title="Consequências graves (Art. 5º da Portaria 55/2025)">
          Se for apurado que o incentivo resultou em carga tributária mensal menor que a decorrente da alíquota mínima de 2%, o crédito remanescente será estornado e será lavrada notificação de lançamento para cobrança do ISS não recolhido, acrescido de juros e multa — com fundamento no Art. 8º-A da LC 336/2003.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page11() {
  return (
    <PageShell page={11} bandTitle="Checklist final e conclusão" bandSubtitle="Validação completa antes de iniciar">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={12} title="Checklist final para a empresa">
        <p className="small-note">Antes de protocolar ou assinar a Declaração de Intenção, confirme todos estes itens:</p>
        <ul className="checklist-list">
          {[
            'Sou contribuinte de ISSQN ou IPTU em Uberlândia',
            'Tenho CND municipal atualizada',
            'Tenho CNPJ, contrato social/estatuto e documentos do representante',
            'Se for IPTU, tenho a matrícula atualizada do imóvel',
            'O projeto escolhido está aprovado no PMIC e apto a captar',
            'A DI será entregue no prazo correto (até último dia útil da 1ª quinzena do mês anterior ao primeiro depósito)',
            'No caso de ISS, meu contador validou compatibilidade com Portaria 55/2025 (alíquota ≥ 3%, carga ≥ 2%, não Simples Nacional)',
            'Não estou tentando deduzir valor sem autorização da Fazenda',
            'Entendo que o projeto e a divulgação seguem regras públicas e prestação de contas',
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section number={13} title="Norma aplicável">
        <Callout tone="info" title="Atenção à norma atual">
          A página do PMIC ainda menciona a antiga Portaria nº 43.103/2018. Porém, a norma vigente é a{' '}
          <strong>Portaria Conjunta SMCT/SMF nº 55/2025</strong>, publicada no Diário Oficial "O Município" nº 7152,
          de 23 de julho de 2025, que define os requisitos atuais e revoga a portaria anterior.
        </Callout>
        <h3>Normas de referência</h3>
        <ul className="bullet-list">
          <li>Lei nº 14.006, de 06 de julho de 2023 (Lei do PMIC)</li>
          <li>
            <a href="https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/07/7152.pdf" target="_blank" rel="noopener noreferrer" className="norma-link">
              Portaria Conjunta SMCT/SMF nº 55/2025 — requisitos para incentivo fiscal (DOM nº 7152, 23/07/2025)
            </a>
          </li>
          <li>
            <a href="https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/06/EDITAL-SMCT-N-112025.pdf" target="_blank" rel="noopener noreferrer" className="norma-link">
              Edital SMCT nº 11/2025 — seleção de projetos PMIC exercício 2026
            </a>
          </li>
          <li>Deliberação CMPC nº 001/2025 — diretrizes e valores de porte</li>
          <li>Instrução Normativa SMCT nº 001/2025 — prestação de contas</li>
          <li>Lei Complementar Municipal nº 336/2003 — código tributário (ISSQN)</li>
        </ul>
      </Section>

      <div className="closing-panel">
        <h2>Conclusão</h2>
        <p>
          Em Uberlândia, o PMIC permite que empresas e contribuintes municipais apoiem projetos culturais aprovados e,
          observadas as regras do programa, deduzam até 25% do ISSQN ou do IPTU devido.
        </p>
        <p>
          Para usufruir do mecanismo, a empresa precisa verificar sua elegibilidade tributária, reunir a documentação
          exigida, formalizar a Declaração de Intenção junto ao proponente e aguardar a análise das Secretarias de
          Cultura e de Finanças. O processo exige <strong>regularidade fiscal</strong>,{' '}
          <strong>respeito aos limites legais</strong> e <strong>observância estrita da norma vigente</strong>.
        </p>
      </div>
    </PageShell>
  );
}

function Page12() {
  return (
    <PageShell page={12} bandTitle="Contato e próximos passos" bandSubtitle="Quer apoiar o Festival +QV? O próximo passo é simples">
      <div className="contact-cta-header">
        <h2>Entre em contato conosco</h2>
        <p>
          Nós cuidamos de toda a parte burocrática junto com você e seu contador. Preparamos a documentação,
          organizamos a Declaração de Intenção e acompanhamos o processo até a aprovação.
        </p>
      </div>

      <div className="contact-two-col">
        <div>
          <div className="contact-block-title">Festival +QV — Canais de contato</div>
          <table className="contact-table">
            <thead>
              <tr><th>Canal</th><th>Informação</th></tr>
            </thead>
            <tbody>
              <tr><td>Site</td><td><a href={SITE_URL} target="_blank" rel="noopener noreferrer">{SITE_NAME}</a></td></tr>
              <tr><td>E-mail</td><td><a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a></td></tr>
              <tr><td>Instagram</td><td><a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_INSTAGRAM}</a></td></tr>
              <tr><td>TikTok</td><td><a href={FESTIVAL_TIKTOK_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_TIKTOK}</a></td></tr>
              <tr><td>X (Twitter)</td><td><a href={FESTIVAL_X_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_X}</a></td></tr>
            </tbody>
          </table>

          <div className="contact-block-title" style={{ marginTop: '4mm' }}>Equipe do Projeto</div>
          <div className="team-grid">
            {[
              ['Proponente', 'Pedro Ferreira Baccelli Reis'],
              ['Coord. de Produção', 'João Lucas França Franco Brandão'],
              ['Coord. Artístico', 'Higor Ernandes Ramos Silva'],
              ['Coord. Administrativo', 'Renato Riscifina'],
            ].map(([role, name]) => (
              <div className="team-card" key={role}>
                <span className="team-card__role">{role}</span>
                <span className="team-card__name">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="contact-block-title">PMIC — Prefeitura de Uberlândia</div>
          <div className="pmic-contact-box">
            <header>Núcleo de Gestão do PMIC</header>
            <div className="pmic-contact-box__body">
              <div>
                <strong>Endereço</strong><br />
                Centro Municipal de Cultura<br />
                Praça Jacy de Assis, s/n, Centro
              </div>
              <div>
                <strong>Horário de atendimento</strong><br />
                12h às 17h
              </div>
              <div>
                <strong>Telefone</strong><br />
                (34) 3214-3266
              </div>
              <div>
                <strong>E-mail</strong><br />
                <a href="mailto:pmic@uberlandia.mg.gov.br">pmic@uberlandia.mg.gov.br</a>
              </div>
            </div>
          </div>
          <p className="small-note" style={{ marginTop: '2mm' }}>
            <strong>Portal PMIC:</strong>{' '}
            <a href={PMIC_SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--festival-deep)', wordBreak: 'break-all' }}>{PMIC_SITE_URL_PATH}</a>
          </p>

          <div className="contact-cta-note">
            <img src="/logos/05LOGOQV.png" alt="" className="contact-cta-note__logo" aria-hidden="true" />
            <div>
              <strong>Festival Mais Que Viaduto 2026</strong>
              <p>26 e 27 de setembro · Centro Municipal de Cultura · Entrada gratuita</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ─── Root ────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="guide-shell">
      <div className="guide-preview-toolbar no-print">
        <span>Preview do documento PDF — {TOTAL_PAGES} páginas</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', opacity: 0.7 }}>Para PDF perfeito: npm run export:pdf</span>
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
        <Page9 />
        <Page10 />
        <Page11 />
        <Page12 />
      </div>
    </div>
  );
}
