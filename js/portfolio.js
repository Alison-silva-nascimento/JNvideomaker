/* =========================================================
   JHENNYFER NASCIMENTO
   PORTFOLIO.JS
========================================================= */


/* =========================================================
   DADOS DOS TRABALHOS
========================================================= */

const PORTFOLIO = [
  {
    id: 1,
    title: "Conteúdo institucional",
    category: "Produção audiovisual",

    url: "https://www.instagram.com/reel/Dd6TNmoRW3F/?stkn=MW9pcmgzMjcxbGNzaQ==",

    poster: "assets/portfolio/posters/reel-01.jpg",

    featured: true,

    /*
      A imagem reel-01 que criamos já possui
      número + play + texto desenhados nela.
    */
    posterHasOverlay: true
  },

  {
    id: 2,
    title: "Bastidores",
    category: "Videomaker",

    url: "https://www.instagram.com/reel/DVv5c0qiTJE/?stkn=MTlxZzRqNnR2Y3d0dA==",

    poster: "assets/portfolio/posters/reel-02.jpg",

    featured: false,
    posterHasOverlay: false
  },

  {
    id: 3,
    title: "Conteúdo para evento",
    category: "Produção audiovisual",

    url: "https://www.instagram.com/reel/DaGvSY0RSBB/?stkn=MXRtdXJ1NTRyMDNwbA==",

    poster: "assets/portfolio/posters/reel-03.jpg",

    featured: false,
    posterHasOverlay: false
  },

  {
    id: 4,
    title: "Cobertura de evento",
    category: "Videomaker",

    url: "https://www.instagram.com/reel/DZBiKoGMudRw0TAWvz-W0FM8eAAlQUmeRXiVbQ0/?stkn=NnY2bW1jZTN6M3Iz",

    poster: "assets/portfolio/posters/reel-04.jpg",

    featured: false,
    posterHasOverlay: false
  },

  {
    id: 5,
    title: "Conteúdo gastronômico",
    category: "Produção de conteúdo",

    url: "https://www.instagram.com/reel/DY-jGbFpUJ4/?stkn=N2wwd25sbTY2d3B4",

    poster: "assets/portfolio/posters/reel-05.jpg",

    featured: false,
    posterHasOverlay: false
  }
];


/* =========================================================
   CRIAR CARD
========================================================= */

function createPortfolioCard(project, index) {

  const featuredClass =
    project.featured
      ? "portfolio-featured"
      : "";


  /* =======================================================
     CAPA COM IMAGEM
  ======================================================= */

  let media;


  if (project.poster) {

    /*
      Caso especial:
      reel-01 já possui número/play/texto na própria imagem.
    */

    if (project.posterHasOverlay) {

      media = `
        <div class="portfolio-media reel-poster">

          <img
            src="${project.poster}"
            alt="Capa do trabalho ${project.title}"
            loading="${project.featured ? "eager" : "lazy"}"
            decoding="async"
          >

        </div>
      `;

    } else {

      /*
        Cards normais:
        o site adiciona número + play + texto por CSS.
      */

      media = `
        <div class="portfolio-media reel-poster">

          <img
            src="${project.poster}"
            alt="Capa do trabalho ${project.title}"
            loading="lazy"
            decoding="async"
          >


          <div
            class="portfolio-media-overlay"
            aria-hidden="true"
          ></div>


          <span
            class="portfolio-number"
            aria-hidden="true"
          >
            ${String(index + 1).padStart(2, "0")}
          </span>


          <div
            class="portfolio-play"
            aria-hidden="true"
          >

            <span class="play-icon">
              ▶
            </span>

            <span class="portfolio-view">
              Assistir Reel
            </span>

          </div>

        </div>
      `;
    }

  } else {

    /* =====================================================
       FALLBACK CASO ALGUMA CAPA NÃO EXISTA
    ===================================================== */

    media = `
      <div class="portfolio-media reel-placeholder">

        <span
          class="portfolio-number"
          aria-hidden="true"
        >
          ${String(index + 1).padStart(2, "0")}
        </span>


        <div
          class="portfolio-play"
          aria-hidden="true"
        >

          <span class="play-icon">
            ▶
          </span>

          <span class="portfolio-view">
            Assistir Reel
          </span>

        </div>

      </div>
    `;
  }


  /* =======================================================
     CARD COMPLETO
  ======================================================= */

  return `
    <article
      class="portfolio-card ${featuredClass} reveal"
    >

      <a
        href="${project.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Assistir ${project.title} no Instagram"
      >

        ${media}


        <div class="portfolio-info">

          <div>

            <span class="portfolio-category">
              ${project.category}
            </span>

            <h3>
              ${project.title}
            </h3>

          </div>


          <span
            class="portfolio-link-icon"
            aria-hidden="true"
          >
            ↗
          </span>

        </div>

      </a>

    </article>
  `;
}


/* =========================================================
   RENDERIZAR PORTFÓLIO
========================================================= */

function renderPortfolio() {

  const grid =
    document.querySelector("#portfolio-grid");


  if (!grid) {
    return;
  }


  grid.innerHTML =
    PORTFOLIO
      .map(createPortfolioCard)
      .join("");
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  renderPortfolio
);
