import './flyer.css';

const SITE_URL = 'https://www.festivalmaisqueviaduto.com.br';
const SITE_NAME = SITE_URL.replace('https://www.', '');
const FESTIVAL_EMAIL = 'festivalmaisqueviaduto@gmail.com';
const FESTIVAL_INSTAGRAM = '@festivalmaisqueviaduto';
const FESTIVAL_INSTAGRAM_URL = `https://www.instagram.com/${FESTIVAL_INSTAGRAM.replace('@', '')}`;
const FESTIVAL_TIKTOK = '@festivalmaisqueviaduto';
const FESTIVAL_TIKTOK_URL = `https://www.tiktok.com/${FESTIVAL_TIKTOK.replace('@', '')}`;
const FESTIVAL_X_URL = 'https://x.com/maisqueviaduto';
const FESTIVAL_X = '@maisqueviaduto';
const PMIC_SITE = 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/cultura-e-turismo/pmic/';
const PORTARIA_SMCT_N_55_2025_URL = 'https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/07/7152.pdf';
const EDITAL_SMCT_N_11_2025_URL = 'https://docs.uberlandia.mg.gov.br/wp-content/uploads/2025/06/EDITAL-SMCT-N-112025.pdf';

export default function Flyer() {
  return (
    <div className="flyer-shell">
      <div className="flyer-preview-toolbar no-print">
        <span>Preview do flyer PDF</span>
        <button onClick={() => window.print()}>Imprimir / Salvar PDF</button>
      </div>

      <section className="flyer-page">
        {/* ── Top band: gold background ── */}
        <header className="flyer-top">
          <div className="flyer-top__text">
            <h1 className="flyer-top__title">
              Sua empresa pode apoiar a cultura e deduzir impostos
            </h1>
            <p className="flyer-top__lead">
              O <strong>PMIC de Uberlândia</strong> permite que contribuintes de ISSQN ou IPTU
              direcionem parte dos tributos a projetos culturais aprovados — com dedução fiscal real.
            </p>
          </div>
          <div className="flyer-top__logoWrap">
            <img
              src="/logos/LOGO - FESTIVAL +QV 2026.png"
              alt="Logo Festival +QV"
              className="flyer-top__logo"
            />
          </div>
        </header>

        {/* ── Main body ── */}
        <div className="flyer-body">
          {/* Metrics row */}
          <div className="flyer-metrics">
            <article className="flyer-metric">
              <strong>até 25%</strong>
              <span>de dedução sobre o ISSQN mensal próprio</span>
            </article>
            <article className="flyer-metric">
              <strong>até 25%</strong>
              <span>de dedução sobre o IPTU do imóvel vinculado</span>
            </article>
          </div>

          {/* How it works */}
          <h2 className="flyer-heading">Como funciona</h2>
          <ol className="flyer-steps">
            <li>
              <strong>Escolha um projeto cultural</strong> já aprovado no PMIC
            </li>
            <li>
              <strong>Verifique sua elegibilidade</strong> tributária com seu contador
            </li>
            <li>
              <strong>Reúna a documentação</strong> (CNPJ, CND municipal, contrato social)
            </li>
            <li>
              <strong>Formalize a Declaração de Intenção</strong> junto ao proponente cultural
            </li>
            <li>
              <strong>Aguarde a análise</strong> da Secretaria de Cultura e da Fazenda
            </li>
            <li>
              <strong>Deduza o valor autorizado</strong> diretamente do ISSQN ou IPTU
            </li>
          </ol>

          {/* Benefits callout */}
          <div className="flyer-callout">
            <div className="flyer-callout__icon">✦</div>
            <div>
              <strong>Por que participar?</strong>
              <p>
                Transforme uma obrigação tributária em investimento cultural com visibilidade e
                retorno de imagem. Sua empresa apoia a cultura local e obtém dedução fiscal —
                tudo dentro da lei.
              </p>
            </div>
          </div>

          {/* Who can participate */}
          <div className="flyer-who">
            <h2 className="flyer-heading">Quem pode usar</h2>
            <div className="flyer-who__grid">
              <div className="flyer-who__item flyer-who__item--yes">
                <span>✓</span> Contribuintes de ISSQN ou IPTU em Uberlândia
              </div>
              <div className="flyer-who__item flyer-who__item--yes">
                <span>✓</span> Com CND municipal atualizada
              </div>
              <div className="flyer-who__item flyer-who__item--no">
                <span>✗</span> Optantes pelo Simples Nacional (para ISSQN)
              </div>
              <div className="flyer-who__item flyer-who__item--no">
                <span>✗</span> Empresas com débitos municipais
              </div>
            </div>
          </div>

          {/* Festival highlight */}
          <div className="flyer-highlight">
            <img src="/elementos/megafone.png" alt="" className="flyer-highlight__img" aria-hidden="true" />
            <div className="flyer-highlight__content">
              <h2 className="flyer-heading">Festival Mais Que Viaduto 2026</h2>
              <p>
                O <strong>+QV</strong> é um dos projetos culturais aprovados pelo PMIC. Ao apoiar o festival,
                sua empresa se associa a um evento que movimenta a cena cultural de Uberlândia —
                com música, exposição de artes, comidas e bebidas, ocupando os espaços públicos.
              </p>
              <div className="flyer-highlight__tags">
                <span>Cultura</span>
                <span>Música</span>
                <span>Artes</span>
                <span>Incentivo Fiscal</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Decorative image ── */}
        <img
          src="/logos/05LOGOQV.png"
          alt=""
          className="flyer-body__watermark"
          aria-hidden="true"
        />

        {/* ── CTA band ── */}
        <div className="flyer-cta">
          <strong>Quer saber mais? Acesse os links e entre em contato</strong>
          <div className="flyer-cta__links">
            <div className="flyer-cta__cluster">
              <div className="flyer-cta__cluster-links">
                <a href={PMIC_SITE} target="_blank" rel="noopener noreferrer">
                  {PMIC_SITE.replace('https://', '')}
                </a>
                <a href="tel:+553432143266">(34) 3214-3266</a>
                <a href="mailto:pmic@uberlandia.mg.gov.br">pmic@uberlandia.mg.gov.br</a>
              </div>
              <h3 className="flyer-cta__cluster-title">PMIC Uberlândia</h3>
            </div>

            <div className="flyer-cta__cluster">
              <div className="flyer-cta__cluster-links">
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer">{SITE_NAME}</a>
                <a href={`mailto:${FESTIVAL_EMAIL}`}>{FESTIVAL_EMAIL}</a>
                <a href={FESTIVAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{FESTIVAL_INSTAGRAM}</a>
              </div>
              <h3 className="flyer-cta__cluster-title">Festival +QV</h3>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="flyer-footer">
          <div className="flyer-footer__row flyer-footer__row--site">
            <span>
              Norma vigente: <a href={PORTARIA_SMCT_N_55_2025_URL} target="_blank" rel="noopener noreferrer">Portaria Conjunta SMCT/SMF nº 55/2025</a> · Lei Municipal nº 14.006/2023 sobre o <a href={EDITAL_SMCT_N_11_2025_URL} target="_blank" rel="noopener noreferrer">Edital SMCT nº 11/2025</a>
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
}
