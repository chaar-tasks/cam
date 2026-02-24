/**
* Template Name: NiceRestaurant
* Template URL: https://bootstrapmade.com/nice-restaurant-bootstrap-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function autoApplyAosAttributes() {
    if (typeof AOS === 'undefined') return;

    const excludedSelectors = 'header, #header, nav, #navmenu, footer, #footer, .breadcrumbs, .scroll-top, #preloader';

    const candidates = document.querySelectorAll([
      'main .card',
      'main .icon-box',
      'main .step-item',
      'main .camelexis-card',
      'main .camelexis-values',
      'main .camelexis-pill',
      'main .gap-mapping__card',
      'main .feature-box',
      'main .financial-sustainability__tile',
      'main .investment-digital__feature',
      'main .key-gaps__item',
      'main .privatization-strategy__banner',
      'main .executive-snapshot__kpi',
      'main .executive-snapshot__revenue',
      'main .executive-snapshot__distribution',
      'main .strategy-block',
      'main .feature-card',
      'main .event-card',
      'main .gallery-item',
      'main .stats-item',
      'main .portfolio-item'
    ].join(','));

    let idx = 0;
    candidates.forEach((el) => {
      if (!el || el.hasAttribute('data-aos')) return;
      if (el.closest(excludedSelectors)) return;

      const aosType = (idx % 3 === 0) ? 'fade-up' : (idx % 2 === 0) ? 'fade-left' : 'fade-right';
      const delay = Math.min(50 + (idx % 8) * 70, 600);

      el.setAttribute('data-aos', aosType);
      el.setAttribute('data-aos-delay', String(delay));
      idx += 1;
    });
  }

  function aosInit() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }
  function runAosSetup() {
    autoApplyAosAttributes();
    aosInit();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  window.addEventListener('load', () => {
    // Run during idle time to keep first paint fast.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runAosSetup, { timeout: 1200 });
    } else {
      setTimeout(runAosSetup, 0);
    }
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  function initPureCounter() {
    if (typeof PureCounter === 'undefined') return;
    new PureCounter();
  }

  function initKpisRecountOnScroll() {
    if (typeof IntersectionObserver === 'undefined') return;

    const kpisBlock = document.querySelector('.executive-snapshot__kpis');
    if (!kpisBlock) return;

    const counterEls = Array.from(kpisBlock.querySelectorAll('.purecounter'));
    if (!counterEls.length) return;

    counterEls.forEach((el) => {
      if (!el.dataset.purecounterStart) el.dataset.purecounterStart = '0';
      if (!el.dataset.purecounterOnce) el.dataset.purecounterOnce = 'false';
      if (!el.dataset.purecounterDurationOriginal) {
        el.dataset.purecounterDurationOriginal = el.dataset.purecounterDuration || '1';
      }
    });

    const resetCounters = () => {
      counterEls.forEach((el) => {
        const start = el.dataset.purecounterStart || '0';
        el.textContent = start;
        el.setAttribute('data-purecounter-duration', el.dataset.purecounterDurationOriginal || '1');
        el.setAttribute('data-purecounter-once', 'false');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initPureCounter();
            return;
          }

          resetCounters();
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(kpisBlock);
  }

  initPureCounter();
  window.addEventListener('load', initKpisRecountOnScroll);

  function initStandardDropdowns() {
    const blocks = document.querySelectorAll('.how-we-work .standard-block');
    if (!blocks.length) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationDurationMs = 260;

    blocks.forEach((block) => {
      if (block.dataset.standardDropdownsInitialized === 'true') return;
      block.dataset.standardDropdownsInitialized = 'true';

      const nodes = Array.from(block.childNodes).filter((n) => {
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
        return n.nodeType === Node.ELEMENT_NODE;
      });

      const sections = [];
      let i = 0;
      while (i < nodes.length) {
        const node = nodes[i];
        if (!(node instanceof HTMLElement) || node.tagName !== 'H4') {
          i += 1;
          continue;
        }

        const titleEl = node;
        const title = titleEl.textContent?.trim() ?? '';
        const contentNodes = [];
        i += 1;
        while (i < nodes.length) {
          const next = nodes[i];
          if (next instanceof HTMLElement && next.tagName === 'H4') break;
          contentNodes.push(next);
          i += 1;
        }

        sections.push({ titleEl, title, contentNodes });
      }

      if (!sections.length) return;

      sections.forEach((section, idx) => {
        const details = document.createElement('details');
        details.className = 'standard-dropdown';
        if (idx === 0) details.open = true;

        const summary = document.createElement('summary');
        summary.className = 'standard-dropdown__summary';
        summary.textContent = section.title;

        const content = document.createElement('div');
        content.className = 'standard-dropdown__content';
        section.contentNodes.forEach((n) => content.appendChild(n));

        details.appendChild(summary);
        details.appendChild(content);

        section.titleEl.replaceWith(details);

        if (details.open) {
          content.style.height = 'auto';
        } else {
          content.style.height = '0px';
        }

        const closeDetails = (targetDetails, animate) => {
          const targetContent = targetDetails.querySelector('.standard-dropdown__content');
          if (!targetContent) {
            targetDetails.open = false;
            return;
          }
          if (!targetDetails.open) return;

          if (!animate || prefersReducedMotion) {
            targetContent.style.height = '0px';
            targetDetails.open = false;
            return;
          }

          targetContent.style.height = targetContent.scrollHeight + 'px';
          targetContent.getBoundingClientRect();
          targetContent.style.height = '0px';

          window.setTimeout(() => {
            targetDetails.open = false;
          }, animationDurationMs);
        };

        const openDetails = (targetDetails) => {
          const targetContent = targetDetails.querySelector('.standard-dropdown__content');
          if (!targetContent) {
            targetDetails.open = true;
            return;
          }

          if (prefersReducedMotion) {
            targetDetails.open = true;
            targetContent.style.height = 'auto';
            return;
          }

          targetDetails.open = true;
          targetContent.style.height = '0px';
          targetContent.getBoundingClientRect();

          const toHeight = targetContent.scrollHeight;
          targetContent.style.height = toHeight + 'px';

          window.setTimeout(() => {
            targetContent.style.height = 'auto';
          }, animationDurationMs);
        };

        summary.addEventListener('click', (e) => {
          e.preventDefault();

          if (details.open) {
            closeDetails(details, true);
            return;
          }

          block.querySelectorAll('details.standard-dropdown[open]').forEach((d) => {
            if (d !== details) closeDetails(d, true);
          });

          openDetails(details);
        });
      });
    });
  }

  window.addEventListener('load', initStandardDropdowns);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          autoApplyAosAttributes();
          aosInit();
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();