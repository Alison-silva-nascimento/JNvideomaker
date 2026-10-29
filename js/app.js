/* =========================================================
   JHENNYFER NASCIMENTO
   APP.JS
========================================================= */

(() => {
  "use strict";

  /*
   * Evita inicialização duplicada caso o script
   * seja carregado novamente por algum motivo.
   */
  if (document.documentElement.dataset.jnAppInitialized === "true") {
    return;
  }

  document.documentElement.dataset.jnAppInitialized = "true";


  /* =======================================================
     CONFIGURAÇÕES
  ======================================================= */

  const WHATSAPP_NUMBER = "556492315147";

  const MOBILE_BREAKPOINT = 1024;


  /* =======================================================
     UTILITÁRIOS
  ======================================================= */

  function cleanText(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  }


  function openWhatsApp(message) {
    const encodedMessage =
      encodeURIComponent(message);

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }


  /* =======================================================
     HEADER NO SCROLL
  ======================================================= */

  function initHeaderScroll() {
    const header =
      document.querySelector("#site-header");

    if (!header) {
      return;
    }

    const updateHeader = () => {
      header.classList.toggle(
        "scrolled",
        window.scrollY > 24
      );
    };

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );
  }


  /* =======================================================
     MENU MOBILE
  ======================================================= */

  function initMobileMenu() {
    const toggle =
      document.querySelector(".menu-toggle");

    const menu =
      document.querySelector("#mobile-menu");

    if (!toggle || !menu) {
      return;
    }


    const openMenu = () => {
      menu.hidden = false;

      toggle.setAttribute(
        "aria-expanded",
        "true"
      );

      toggle.setAttribute(
        "aria-label",
        "Fechar menu"
      );

      document.body.classList.add(
        "menu-open"
      );
    };


    const closeMenu = () => {
      menu.hidden = true;

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Abrir menu"
      );

      document.body.classList.remove(
        "menu-open"
      );
    };


    const toggleMenu = () => {
      const isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };


    toggle.addEventListener(
      "click",
      toggleMenu
    );


    /*
     * Fecha menu quando o usuário
     * escolhe uma seção.
     */

    menu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });


    /*
     * ESC fecha menu.
     */

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key !== "Escape") {
          return;
        }

        const isOpen =
          toggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (!isOpen) {
          return;
        }

        closeMenu();

        toggle.focus();
      }
    );


    /*
     * Se o usuário abrir o menu
     * no celular e depois aumentar
     * a janela para desktop.
     */

    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth >
          MOBILE_BREAKPOINT
        ) {
          closeMenu();
        }

      },
      {
        passive: true
      }
    );
  }


  /* =======================================================
     REVEAL NO SCROLL
  ======================================================= */

  function initRevealAnimations() {
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    const showImmediately = (element) => {
      element.classList.add(
        "is-visible"
      );
    };


    /*
     * Usuários que preferem menos animação.
     */

    if (reducedMotion) {

      document
        .querySelectorAll(".reveal")
        .forEach(showImmediately);

      return;
    }


    /*
     * Fallback para navegadores antigos.
     */

    if (
      !("IntersectionObserver" in window)
    ) {

      document
        .querySelectorAll(".reveal")
        .forEach(showImmediately);

      return;
    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -6% 0px"
        }
      );


    const observeElements = (
      root = document
    ) => {

      root
        .querySelectorAll(
          ".reveal:not(.is-visible)"
        )
        .forEach(
          (element) => {

            observer.observe(
              element
            );

          }
        );

    };


    observeElements();


    /*
     * O portfolio.js cria cards
     * dinamicamente.
     *
     * Este MutationObserver garante
     * que esses cards também recebam
     * animação mesmo caso sejam
     * adicionados depois do app.js.
     */

    const portfolioGrid =
      document.querySelector(
        "#portfolio-grid"
      );


    if (portfolioGrid) {

      const mutationObserver =
        new MutationObserver(
          () => {

            observeElements(
              portfolioGrid
            );

          }
        );


      mutationObserver.observe(
        portfolioGrid,
        {
          childList: true,
          subtree: true
        }
      );
    }
  }


  /* =======================================================
     FORMULÁRIO -> WHATSAPP
  ======================================================= */

  function initBriefForm() {
    const form =
      document.querySelector(
        "#brief-form"
      );

    if (!form) {
      return;
    }


    const feedback =
      document.querySelector(
        "#form-feedback"
      );


    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const name =
          cleanText(
            form.elements.name?.value
          );

        const brand =
          cleanText(
            form.elements.brand?.value
          );

        const service =
          cleanText(
            form.elements.service?.value
          );

        const message =
          cleanText(
            form.elements.message?.value
          );


        /*
         * Validação.
         */

        if (!name) {

          if (feedback) {
            feedback.textContent =
              "Informe seu nome para continuar.";
          }

          form.elements.name?.focus();

          return;
        }


        if (!service) {

          if (feedback) {
            feedback.textContent =
              "Selecione o serviço desejado.";
          }

          form.elements.service?.focus();

          return;
        }


        if (!message) {

          if (feedback) {
            feedback.textContent =
              "Conte um pouco sobre o seu projeto.";
          }

          form.elements.message?.focus();

          return;
        }


        /*
         * Mensagem enviada ao WhatsApp.
         */

        const whatsappMessage = [
          "Olá, Jhennyfer! 👋",
          "",
          "Conheci seu trabalho pelo site e gostaria de conversar sobre um projeto.",
          "",
          `Nome: ${name}`,
          brand
            ? `Empresa / Marca: ${brand}`
            : null,
          `Serviço: ${service}`,
          "",
          "Sobre o projeto:",
          message,
          "",
          "Podemos conversar?"
        ]
          .filter(Boolean)
          .join("\n");


        if (feedback) {
          feedback.textContent =
            "Abrindo o WhatsApp...";
        }


        openWhatsApp(
          whatsappMessage
        );


        /*
         * Não limpamos o formulário
         * automaticamente para o usuário
         * não perder o texto caso volte.
         */

        window.setTimeout(
          () => {

            if (feedback) {
              feedback.textContent =
                "Mensagem preparada. Finalize o envio pelo WhatsApp.";
            }

          },
          600
        );

      }
    );
  }


  /* =======================================================
     LINKS INTERNOS
  ======================================================= */

  function initInternalLinks() {
    const internalLinks =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    internalLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );


            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                targetId
              );


            if (!target) {
              return;
            }


            /*
             * O CSS já possui
             * scroll-behavior:smooth.
             *
             * Aqui apenas garantimos
             * que a URL continue
             * representando a seção.
             */

            event.preventDefault();


            target.scrollIntoView({
              behavior:
                window.matchMedia(
                  "(prefers-reduced-motion: reduce)"
                ).matches
                  ? "auto"
                  : "smooth",

              block: "start"
            });


            try {

              history.pushState(
                null,
                "",
                targetId
              );

            } catch {
              /*
               * Em localhost extremamente
               * restritivo pode não funcionar.
               * Não prejudica a navegação.
               */
            }

          }
        );

      }
    );
  }


  /* =======================================================
     ANO AUTOMÁTICO
  ======================================================= */

  function initCurrentYear() {
    const year =
      document.querySelector(
        "#year"
      );

    if (!year) {
      return;
    }

    year.textContent =
      new Date()
        .getFullYear()
        .toString();
  }


  /* =======================================================
     CONTROLES DA GALERIA DE SERVIÇOS
  ======================================================= */

  function initServicesShowcase() {
    const track =
      document.querySelector(
        "#services-showcase-track"
      );

    const previousButton =
      document.querySelector(
        '[data-showcase-direction="previous"]'
      );

    const nextButton =
      document.querySelector(
        '[data-showcase-direction="next"]'
      );

    if (
      !track ||
      !previousButton ||
      !nextButton
    ) {
      return;
    }

    const cards =
      Array.from(
        track.querySelectorAll(
          ".services-showcase-card"
        )
      );

    if (!cards.length) {
      return;
    }

    let currentIndex = 0;
    let currentOffset = 0;
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let dragDistance = 0;
    let suppressClick = false;

    const getCardPosition = (index) => {
      const styles =
        window.getComputedStyle(track);

      const gap =
        parseFloat(styles.columnGap) || 0;

      const cardWidth =
        cards[0]
          .getBoundingClientRect()
          .width;

      return index * (cardWidth + gap);
    };

    const getClosestIndex = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach(
        (card, index) => {
          const distance =
            Math.abs(
              getCardPosition(index) -
              currentOffset
            );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      );

      return closestIndex;
    };

    const getMaxOffset = () => {
      const lastIndex =
        cards.length - 1;

      const lastCardWidth =
        cards[lastIndex]
          .getBoundingClientRect()
          .width;

      return Math.max(
        0,
        getCardPosition(lastIndex) +
        lastCardWidth -
        track.clientWidth
      );
    };

    const applyOffset = (
      offset,
      animate = true
    ) => {
      currentOffset =
        Math.max(
          0,
          Math.min(
            getMaxOffset(),
            offset
          )
        );

      track.classList.toggle(
        "is-dragging",
        !animate
      );

      cards.forEach(
        (card) => {
          card.style.transform =
            `translate3d(${-currentOffset}px, 0, 0)`;
        }
      );
    };

    const updateButtons = () => {
      currentIndex = getClosestIndex();

      previousButton.disabled =
        currentIndex === 0;

      nextButton.disabled =
        currentIndex ===
        cards.length - 1;
    };

    const scrollToIndex = (index) => {
      currentIndex =
        Math.max(
          0,
          Math.min(
            cards.length - 1,
            index
          )
        );

      applyOffset(
        getCardPosition(currentIndex)
      );

      previousButton.disabled =
        currentIndex === 0;

      nextButton.disabled =
        currentIndex ===
        cards.length - 1;
    };

    previousButton.addEventListener(
      "click",
      () => scrollToIndex(currentIndex - 1)
    );

    nextButton.addEventListener(
      "click",
      () => scrollToIndex(currentIndex + 1)
    );

    track.addEventListener(
      "pointerdown",
      (event) => {
        if (
          event.pointerType === "mouse" &&
          event.button !== 0
        ) {
          return;
        }

        activePointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartOffset = currentOffset;
        dragDistance = 0;

        track.classList.add(
          "is-dragging"
        );

        track.setPointerCapture(
          event.pointerId
        );
      }
    );

    track.addEventListener(
      "pointermove",
      (event) => {
        if (
          activePointerId !==
          event.pointerId
        ) {
          return;
        }

        dragDistance =
          event.clientX - dragStartX;

        if (Math.abs(dragDistance) > 3) {
          event.preventDefault();
        }

        applyOffset(
          dragStartOffset - dragDistance,
          false
        );
      }
    );

    const finishDrag = (event) => {
      if (
        activePointerId !==
        event.pointerId
      ) {
        return;
      }

      if (
        track.hasPointerCapture(
          event.pointerId
        )
      ) {
        track.releasePointerCapture(
          event.pointerId
        );
      }

      suppressClick =
        Math.abs(dragDistance) > 8;

      activePointerId = null;

      scrollToIndex(
        getClosestIndex()
      );

      window.setTimeout(
        () => {
          suppressClick = false;
        },
        0
      );
    };

    track.addEventListener(
      "pointerup",
      finishDrag
    );

    track.addEventListener(
      "pointercancel",
      finishDrag
    );

    track.addEventListener(
      "click",
      (event) => {
        if (!suppressClick) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
      },
      true
    );

    window.addEventListener(
      "resize",
      () => {
        applyOffset(
          getCardPosition(currentIndex),
          false
        );

        updateButtons();
      },
      {
        passive: true
      }
    );

    updateButtons();
  }


  /* =======================================================
     SEGURANÇA PARA IMAGENS
  ======================================================= */

  function initImageProtection() {
    const images =
      document.querySelectorAll("img");


    images.forEach(
      (image) => {

        image.addEventListener(
          "error",
          () => {

            image.classList.add(
              "image-error"
            );

          },
          {
            once: true
          }
        );

      }
    );
  }


  /* =======================================================
     INICIALIZAÇÃO
  ======================================================= */

  function init() {
    initHeaderScroll();

    initMobileMenu();

    initRevealAnimations();

    initBriefForm();

    initInternalLinks();

    initCurrentYear();

    initServicesShowcase();

    initImageProtection();
  }


  /*
   * Como o script está com defer,
   * normalmente o DOM já estará pronto.
   *
   * Mesmo assim mantemos suporte caso
   * a forma de carregamento seja alterada.
   */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }

})();
