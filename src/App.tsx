import './guide.css';
import type { ReactNode } from 'react';


type CalloutTone = 'important' | 'warning' | 'success' | 'info';

type BulletListProps = { items: string[] };

type CalloutProps = {
  tone: CalloutTone;
  title?: string;
  children: ReactNode;
};

type SectionProps = {
  number: number | string;
  title: string;
  children: ReactNode;
};

type Step = {
  step: number;
  title: string;
  content: string;
};

type PageProps = {
  page: number;
  bandTitle: string;
  bandSubtitle: string;
  children: ReactNode;
};

type TocEntry = {
  page: number;
  chapter: string;
  title: string;
  subtitle: string;
  alt?: boolean;
};

const TOTAL_PAGES = 10;

const FESTIVAL_EMAIL = 'festivalmaisqueviaduto@gmail.com';
const FESTIVAL_INSTAGRAM = '@festivalmaisqueviaduto';
const FESTIVAL_INSTAGRAM_URL = `https://www.instagram.com/${FESTIVAL_INSTAGRAM.replace('@', '')}`;
const PMIC_SITE = 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/cultura-e-turismo/pmic/';
const FESTIVAL_LOGO = '/logos/LOGO - FESTIVAL +QV 2026.png';

const TOC_ENTRIES: TocEntry[] = [
  {
    page: 3,
    chapter: 'Capítulo 1',
    title: 'O PMIC e a Vantagem para a Empresa',
    subtitle: 'Seções 1 e 2 — O que é o programa e qual a vantagem financeira',
  },
  {
    page: 4,
    chapter: 'Capítulo 2',
    title: 'Elegibilidade e Escolha de Projetos',
    subtitle: 'Seções 3 e 4 — Quem pode usar o mecanismo e quais projetos pode apoiar',
    alt: true,
  },
  {
    page: 5,
    chapter: 'Capítulo 3',
    title: 'Documentação Necessária',
    subtitle: 'Seção 5 — Documentos exigidos pela Portaria Conjunta SMCT/SMF nº 55/2025',
  },
  {
    page: 6,
    chapter: 'Capítulo 4',
    title: 'Declaração de Intenção',
    subtitle: 'Seções 6 e 7 — O documento central do processo e como a DI deve ser entregue',
    alt: true,
  },
  {
    page: 7,
    chapter: 'Capítulo 5',
    title: 'Passo a Passo — Parte 1',
    subtitle: 'Seção 8 — Roteiro detalhado: passos 1 a 5 para formalizar o incentivo',
  },
  {
    page: 8,
    chapter: 'Capítulo 5 (cont.)',
    title: 'Passo a Passo — Parte 2',
    subtitle: 'Continuação — Passos 6 a 10 e alerta sobre carga fiscal mínima',
    alt: true,
  },
  {
    page: 9,
    chapter: 'Capítulo 6',
    title: 'Regras Específicas e Problemas',
    subtitle: 'Seções 9 e 10 — IPTU, situações de indeferimento e consequências graves',
  },
  {
    page: 10,
    chapter: 'Capítulo 7',
    title: 'Checklist Final e Conclusão',
    subtitle: 'Seções 11 e 12 — Validação completa antes de iniciar e norma aplicável',
    alt: true,
  },
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
      'Antes de qualquer anúncio de apoio, confira: se é contribuinte de ISSQN ou IPTU no município; se está regular perante o Município; se não é optante pelo Simples Nacional (caso de ISS); e se há viabilidade para a dedução pretendida.',
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
      'O Núcleo de Gestão do PMIC recebe a DI, verifica a regularidade formal e depois envia à Secretaria Municipal de Finanças para análise tributária. A SMCT faz conferência documental inicial e encaminha via ofício, inclusive por Web e-DOCS.',
  },
  {
    step: 7,
    title: 'Observar critérios da Fazenda (ISSQN)',
    content:
      'Para autorizar, a Fazenda exige condições cumulativas. No ISSQN: média dos 12 meses de ISS próprio × 25% deve ser >= valor mensal; alíquota >= 3%; não produzir carga < 2%; não ser Simples Nacional; apresentar CND.',
  },
  {
    step: 8,
    title: 'Só deduzir após autorização',
    content:
      'O valor deduzido só deve ser depositado na conta bancária do projeto após aprovação pela Secretaria Municipal de Finanças e pelo Núcleo de Gestão do PMIC. Somente após a autorização da primeira DI o proponente celebra o Termo de Compromisso.',
  },
  {
    step: 9,
    title: 'Entender quando o projeto pode começar',
    content:
      'O proponente só pode começar o projeto e movimentar a conta após duas condições: atingir 60% da captação do valor do projeto e ocorrer o depósito da primeira parcela pelo incentivador.',
  },
  {
    step: 10,
    title: 'Acompanhar execução e comunicação',
    content:
      'É obrigatória a menção ao Município de Uberlândia, à SMCT e ao PMIC com uso das logomarcas. As artes devem ser enviadas com 15 dias de antecedência para aprovação. O apoio está vinculado a um projeto público incentivado.',
  },
];

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
        <div className="pdf-header__title">Como empresas podem apoiar cultura e deduzir ISSQN ou IPTU</div>
      </div>
    </header>
  );
}

function GuideFooter({ page }: { page: number }) {
  return (
    <footer className="pdf-footer">
      <div className="pdf-footer__bar">
        <div className="pdf-footer__contacts">
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
            <p>{item.content}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CoverPage() {
  return (
    <section className="pdf-page pdf-page--cover">
      <div className="cover-top">
        <div className="cover-top__text">
          <h1 className="cover-top__title">Guia PMIC UDI 2026</h1>
          <p className="cover-top__summary">
            Como empresas podem apoiar cultura e deduzir ISSQN ou IPTU
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
          <a href={PMIC_SITE} target="_blank" rel="noopener noreferrer">{PMIC_SITE}</a>
        </div>
        <div className="cover-footer__row">
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
        Este guia está organizado em {TOTAL_PAGES - 3} capítulos que cobrem desde a apresentação do programa
        até o checklist final antes de protocolar a Declaração de Intenção. Use os números de página
        abaixo para localizar a seção de seu interesse.
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
    <PageShell page={3} bandTitle="O PMIC e a vantagem para a empresa" bandSubtitle="O que é o programa e por que isso interessa à empresa">
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
        <p>A lei permite a dedução de tributos municipais dentro de limites específicos conforme o imposto utilizado.</p>
        <div className="metric-grid">
          <article className="metric-card">
            <strong>até 3%</strong>
            <span>Dedução sobre o ISSQN mensal próprio</span>
          </article>
          <article className="metric-card">
            <strong>até 25%</strong>
            <span>Dedução sobre o IPTU do imóvel vinculado</span>
          </article>
        </div>
        <Callout tone="success" title="Na prática">
          A empresa transforma uma obrigação tributária em investimento cultural com visibilidade e retorno de imagem. O recurso que iria para o caixa do município é direcionado a um projeto cultural de sua escolha — dentro das regras do programa.
        </Callout>
        <p className="small-note">A dedução não é ilimitada: a Portaria Conjunta SMCT/SMF nº 55/2025 define critérios de viabilidade fiscal que serão analisados pela Secretaria Municipal de Finanças. Detalhes nos capítulos seguintes.</p>
      </Section>
    </PageShell>
  );
}

function Page4() {
  return (
    <PageShell page={4} bandTitle="Elegibilidade e escolha de projetos" bandSubtitle="Quem pode usar e o que pode ser apoiado">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={3} title="Quem pode usar o mecanismo">
        <p>Pela lei, o incentivador pode ser pessoa física ou jurídica contribuinte de IPTU ou ISSQN.</p>
        <Callout tone="warning" title="Atenção">
          A Portaria Conjunta SMCT/SMF nº 55/2025 trouxe condições objetivas para autorização. Nem toda empresa conseguirá usar o benefício.
        </Callout>
        <h3>Requisitos obrigatórios</h3>
        <BulletList items={[
          'Ser contribuinte de IPTU ou ISSQN em Uberlândia',
          'Apresentar Certidão Negativa de Débitos (CND) municipal atualizada',
          'Não ser optante pelo Simples Nacional (para dedução de ISSQN)',
          'Atender aos critérios fiscais específicos da Secretaria de Finanças',
        ]} />
        <Callout tone="info" title="Validação necessária">
          Valide sua situação tributária e documental com seu contador e com a Prefeitura antes de avançar.
        </Callout>
      </Section>

      <Section number={4} title="Quais projetos a empresa pode apoiar">
        <p>A empresa só pode direcionar recursos a <strong>projetos culturais já aprovados no PMIC</strong>.</p>
        <div className="porte-grid">
          {[
            ['Micro', 'até R$ 15 mil'],
            ['Pequeno', 'até R$ 35 mil'],
            ['Médio', 'até R$ 55 mil'],
            ['Grande', 'até R$ 150 mil'],
          ].map(([label, value]) => (
            <article className="porte-card" key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </article>
          ))}
        </div>
        <Callout tone="important" title="Proibido">
          A lei proíbe o incentivador de alterar planilha orçamentária, metas ou ações do projeto aprovado.
        </Callout>
        <p className="small-note">
          O programa divulga resultados dos editais no portal oficial do PMIC. Contate os proponentes para confirmar aptidão para captação via Incentivo Fiscal.
        </p>
      </Section>
    </PageShell>
  );
}

function Page5() {
  return (
    <PageShell page={5} bandTitle="Documentação necessária" bandSubtitle="O que a empresa precisa apresentar">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={5} title="Documentos exigidos pela Portaria 55/2025">
        <p>A documentação varia conforme o tipo de incentivador e o tributo utilizado.</p>
        <div className="doc-stack">
          <article className="doc-card doc-card--teal">
            <header>5.1. Empresa incentivando por ISSQN</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais atualizada',
              'CNPJ da empresa',
              'Cópia do ato constitutivo (contrato social, estatuto ou equivalente)',
              'Procuração, se quem assinar não for o representante legal direto',
              'RG e CPF do representante legal',
            ]} />
          </article>
          <article className="doc-card doc-card--orange">
            <header>5.2. Empresa incentivando por IPTU</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais atualizada',
              'CNPJ da empresa',
              'Cópia do ato constitutivo',
              'Procuração, se aplicável',
              'RG e CPF do representante legal',
              'Matrícula atualizada do imóvel (para comprovar propriedade)',
            ]} />
          </article>
          <article className="doc-card doc-card--gold">
            <header>5.3. Pessoa física incentivando por IPTU</header>
            <BulletList items={[
              'Certidão Negativa de Débitos Municipais atualizada',
              'RG e CPF',
              'Matrícula atualizada do imóvel',
            ]} />
          </article>
        </div>
        <Callout tone="info" title="Importante">
          A CND municipal pode ser emitida online no portal da Prefeitura de Uberlândia, na seção de Finanças. Certifique-se de que esteja atualizada no momento da entrega da Declaração de Intenção.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page6() {
  return (
    <PageShell page={6} bandTitle="Declaração de Intenção" bandSubtitle="O documento central do processo">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={6} title="O que o proponente precisa providenciar">
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
          O proponente entrega a DI em quatro vias, assinadas pelo proponente e assinadas/carimbadas pelo incentivador, acompanhada dos documentos da empresa e da CND.
        </Callout>
      </Section>

      <Section number={7} title="O que é a Declaração de Intenção (DI)">
        <div className="accent-panel">
          <p><strong>A Declaração de Intenção (DI)</strong> é o documento central do processo de incentivo fiscal.</p>
          <p>É nela que o incentivador declara formalmente sua intenção de apoiar um projeto cultural específico por meio da canalização de recursos provenientes de ISSQN ou IPTU.</p>
          <p>Pela lei, a obtenção do incentivo fiscal depende da apresentação da documentação do incentivador e do projeto cultural, conforme modelo e condições definidos em ato normativo.</p>
        </div>
        <Callout tone="important" title="Prazo crítico">
          A Portaria 55/2025 determina que a DI deve ser apresentada à Secretaria Municipal de Cultura e Turismo até o último dia útil da primeira quinzena do mês anterior à data do primeiro depósito na conta do projeto.
        </Callout>
        <div className="soft-panel soft-panel--compact">
          <h3>Formato da DI</h3>
          <BulletList items={[
            '4 vias impressas',
            'Assinadas pelo proponente',
            'Assinadas e carimbadas pelo incentivador',
            'Acompanhada de toda documentação exigida',
          ]} />
        </div>
      </Section>
    </PageShell>
  );
}

function Page7() {
  return (
    <PageShell page={7} bandTitle="Passo a passo completo" bandSubtitle="Como a empresa deve proceder — Parte 1">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={8} title="Roteiro detalhado para incentivo fiscal">
        <p className="small-note">Siga estes passos na ordem apresentada para garantir que o processo de incentivo seja realizado corretamente e evite problemas com a documentação ou análise tributária.</p>
        <TimelineSteps steps={TIMELINE_STEPS_PART1} />
      </Section>
    </PageShell>
  );
}

function Page8() {
  return (
    <PageShell page={8} bandTitle="Passo a passo completo" bandSubtitle="Como a empresa deve proceder — Parte 2">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={8} title="Roteiro detalhado (continuação — passos 6 a 10)">
        <TimelineSteps steps={TIMELINE_STEPS_PART2} />
        <Callout tone="warning" title="Ponto crítico">
          Nem sempre o valor desejado será aprovado, porque a Fazenda controla a viabilidade fiscal. A empresa deve estar preparada para ajustar o valor caso necessário.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page9() {
  return (
    <PageShell page={9} bandTitle="Regras específicas e problemas" bandSubtitle="IPTU e situações de indeferimento">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={9} title="Regras específicas para IPTU">
        <div className="accent-panel accent-panel--orange">
          <p>As DIs que envolvam dedução de IPTU devem conter a <strong>identificação precisa do imóvel</strong> vinculado ao imposto que servirá de base para a dedução.</p>
          <p>A dedução de até 25% será aplicada sobre o valor do IPTU, <strong>limitada ao montante efetivamente aportado</strong> ao projeto.</p>
          <p>Se o contribuinte optar pelo pagamento do IPTU à vista, a dedução será calculada sobre o <strong>valor líquido do tributo</strong>, já considerado o desconto legal dessa modalidade.</p>
        </div>
        <Callout tone="info" title="Documentação adicional">
          Empresas ou pessoas físicas que queiram incentivar por IPTU devem apresentar a matrícula atualizada do imóvel para comprovar propriedade.
        </Callout>
      </Section>

      <Section number={10} title="O que pode dar errado">
        <div className="risk-list">
          {[
            ['Documentação incompleta', 'Falta de documentos ou documentos desatualizados'],
            ['Ausência de CND municipal válida', 'Certidão vencida ou com pendências'],
            ['Não atendimento aos critérios fiscais', 'Valores incompatíveis com a média de recolhimentos'],
            ['Empresa optante pelo Simples Nacional', 'Vedação expressa pela Portaria 55/2025 para ISS'],
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
        <Callout tone="warning" title="Consequências graves">
          Se for apurado que o incentivo reduziu a carga tributária abaixo da alíquota mínima legal de 2% (casos aplicáveis), a portaria prevê estorno do crédito remanescente e cobrança do ISS não recolhido com juros e multa.
        </Callout>
      </Section>
    </PageShell>
  );
}

function Page10() {
  return (
    <PageShell page={10} bandTitle="Checklist final e conclusão" bandSubtitle="Validação completa antes de iniciar">
      <img src="/elementos/coroa.png" alt="" className="toc-deco" aria-hidden="true" />
      <Section number={11} title="Checklist final para a empresa">
        <p className="small-note">Antes de protocolar ou assinar a Declaração de Intenção, confirme todos estes itens:</p>
        <ul className="checklist-list">
          {[
            'Sou contribuinte de ISSQN ou IPTU em Uberlândia',
            'Tenho CND municipal atualizada',
            'Tenho CNPJ, contrato social/estatuto e documentos do representante',
            'Se for IPTU, tenho a matrícula atualizada do imóvel',
            'O projeto escolhido está aprovado no PMIC e apto a captar',
            'A DI será entregue no prazo correto (até último dia útil da 1ª quinzena do mês anterior)',
            'No caso de ISS, meu contador validou compatibilidade com Portaria 55/2025',
            'Não estou tentando deduzir valor sem autorização da Fazenda',
            'Entendo que o projeto e a divulgação seguem regras públicas e prestação de contas',
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section number={12} title="Norma aplicável">
        <Callout tone="info" title="Atenção à norma atual">
          A página do PMIC ainda menciona a antiga Portaria nº 43.103/2018. Porém, a norma vigente é a <strong>Portaria Conjunta SMCT/SMF nº 55/2025</strong>, que define os requisitos atuais e revoga a portaria anterior.
        </Callout>
      </Section>

      <div className="closing-panel">
        <h2>Conclusão</h2>
        <p>
          Em Uberlândia, o PMIC permite que empresas e contribuintes municipais apoiem projetos culturais aprovados e, observadas as regras do programa, deduzam parte do ISSQN ou do IPTU devido.
        </p>
        <p>
          Para usufruir corretamente do mecanismo, a empresa precisa verificar sua elegibilidade tributária, reunir a documentação exigida, formalizar a Declaração de Intenção junto ao proponente e aguardar a análise da Secretaria Municipal de Cultura e Turismo e da Secretaria Municipal de Finanças.
        </p>
        <p>
          O processo exige <strong>regularidade fiscal</strong>, <strong>respeito aos limites legais</strong> e <strong>observância estrita da norma vigente</strong>, disciplinada principalmente pela Lei nº 14.006/2023 e pela Portaria Conjunta SMCT/SMF nº 55/2025.
        </p>
      </div>

      <div className="closing-cta">
        <img src="/elementos/viaduto.png" alt="" className="closing-cta__deco" aria-hidden="true" />
        <strong>Dúvidas ou mais informações</strong>
        <a href={PMIC_SITE} target="_blank" rel="noopener noreferrer">Portal oficial do PMIC Uberlândia</a>
        <span>Secretaria Municipal de Cultura e Turismo</span>
      </div>
    </PageShell>
  );
}

export default function App() {
  return (
    <div className="guide-shell">
      <div className="guide-preview-toolbar no-print">
        <span>Preview do documento PDF</span>
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
      </div>
    </div>
  );
}

