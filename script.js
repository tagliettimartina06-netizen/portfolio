/* ==============================================================================
   PORTFOLIO MARTINA TAGLIETTI - JAVASCRIPT LOGIC
   Interactive Features: Filtering, Lightbox, Project Drawer, Copy-to-Clipboard
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const technicalGrid = document.getElementById('technicalGrid');
  const toggleGridBtn = document.getElementById('toggleGridBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const toastNotification = document.getElementById('toastNotification');
  const emailCard = document.getElementById('emailCard');

  // Filter Buttons & Projects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Lightbox Elements
  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const prevLightboxBtn = document.getElementById('prevLightboxBtn');
  const nextLightboxBtn = document.getElementById('nextLightboxBtn');

  // Project Modal Elements
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDynamicBody = document.getElementById('modalDynamicBody');

  // Photo tiles array for lightbox
  const photoTiles = Array.from(document.querySelectorAll('.photo-tile'));
  let currentPhotoIndex = 0;

  /* ---------------------------------------------------------------------------
     1. TECHNICAL GRID OVERLAY TOGGLE
     --------------------------------------------------------------------------- */
  if (toggleGridBtn && technicalGrid) {
    toggleGridBtn.addEventListener('click', () => {
      technicalGrid.classList.toggle('active');
      const isActive = technicalGrid.classList.contains('active');
      showToast(isActive ? '📐 Griglia: ATTIVA' : '📐 Griglia: DISATTIVA');
    });
  }

  /* ---------------------------------------------------------------------------
     2. MOBILE MENU TOGGLE
     --------------------------------------------------------------------------- */
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  /* ---------------------------------------------------------------------------
     3. BACK TO TOP
     --------------------------------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------------
     4. TOAST NOTIFICATION HELPER
     --------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }

  /* ---------------------------------------------------------------------------
     5. EMAIL COPY TO CLIPBOARD
     --------------------------------------------------------------------------- */
  if (emailCard) {
    emailCard.addEventListener('click', () => {
      const email = emailCard.getAttribute('data-email') || 'tagliettimartina06@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copiata: ' + email);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  }

  /* ---------------------------------------------------------------------------
     6. PROJECTS FILTERING
     --------------------------------------------------------------------------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------------------------------------------------------------------------
     7. SIMPLE & DIRECT PROJECT MODAL DATA
     --------------------------------------------------------------------------- */
  const projectsData = {
    'soundground': {
      title: 'SOUNDGROUND',
      category: 'PROGETTO DIGITALE',
      tools: 'Figma, Adobe Illustrator',
      summary: 'Concept di una piattaforma digitale per musicisti e produttori creata per connettersi, condividere tracce e collaborare online.',
      gallery: [
        { src: 'site_assets/soundground_hero.png', caption: 'Homepage e Mockup Laptop' },
        { src: 'site_assets/soundground_features.png', caption: 'Funzionalità profilo e community' },
        { src: 'site_assets/soundground_albums.png', caption: 'Sezione tracce e album' }
      ]
    },

    'camelia': {
      title: 'CAMELIA · LAGO MAGGIORE',
      category: 'IDENTITÀ VISIVA',
      tools: 'Adobe Illustrator',
      summary: 'Identità visiva e manuale del marchio per una struttura sul Lago Maggiore. Comprende il logo con simbolo floreale, la palette cromatica e i biglietti da visita.',
      gallery: [
        { src: 'site_assets/camelia_hero.png', caption: 'Marchio Istituzionale Camelia' },
        { src: 'site_assets/camelia_cards_mockup.png', caption: 'Mockup Biglietti da Visita' },
        { src: 'site_assets/camelia_grid_manual.png', caption: 'Costruzione Geometrica del Marchio' },
        { src: 'site_assets/camelia_palette_manual.png', caption: 'Palette Colori' }
      ]
    },

    'dgm': {
      title: 'DGM MOTORI',
      category: 'PROTOTIPO WEB & MOBILE',
      tools: 'Figma, Adobe Photoshop, Illustrator',
      summary: 'Prototipo interattivo web e mobile per l’officina meccanica DGM Motori, realizzato per presentare l’officina e permettere la prenotazione dei tagliandi.',
      gallery: [
        { src: 'site_assets/dgm_laptop_hero.png', caption: 'Mockup Laptop Desktop' },
        { src: 'site_assets/dgm_instagram_mockup.jpg', caption: 'Mockup Smartphone Feed Instagram' },
        { src: 'site_assets/foto_dgm_team_hero.jpg', caption: 'Foto dello Staff DGM' }
      ]
    },

    'forme-essenziali': {
      title: 'FORME ESSENZIALI',
      category: 'TEMA D\'ESAME',
      tools: 'Figma, Adobe Illustrator',
      summary: 'Tema d\'esame scolastico: ideazione del logo e del prototipo web per un collettivo di artigiani del Made in Italy (ceramica, falegnameria e design tessile).',
      gallery: [
        { src: 'site_assets/forme_essenziali_mockup.png', caption: 'Mockup Desktop e Mobile' },
        { src: 'site_assets/forme_essenziali_artisan.png', caption: 'Sezione Artigiani e Prodotti' }
      ]
    },

    'vertex': {
      title: 'VERTEX STUDIO',
      category: 'SITO TEMPO LIBERO (IA + FIGMA)',
      tools: 'Figma, Strumenti AI',
      summary: 'Semplicemente un sito realizzato nel tempo libero dove ho combinato l’uso dell’Intelligenza Artificiale a Figma.',
      gallery: [
        { src: 'site_assets/vertex_figma_preview.jpg', caption: 'Workspace su Figma' },
        { src: 'site_assets/vertex_tecnometal.jpg', caption: 'Schermata Tecnometal' },
        { src: 'site_assets/vertex_abbigliamento.jpeg', caption: 'Schermata Fashion' },
        { src: 'site_assets/vertex_pizza.jpeg', caption: 'Schermata Menù Digitale' }
      ],
      liveLink: 'https://vertexstudiolab.github.io/'
    },

    'aura': {
      title: 'AURA · SOUND & SENSORY LAB',
      category: 'LOGO DESIGN',
      tools: 'Adobe Illustrator',
      summary: 'Progetto di logo geometrico per uno studio di sound design e acustica, con griglia costruttiva a cerchi proporzionali e mockup su biglietti da visita.',
      gallery: [
        { src: 'site_assets/aura_logo_hero_dark.png', caption: 'Logo su Fondo Scuro' },
        { src: 'site_assets/aura_construction_grid.png', caption: 'Griglia Costruttiva Vettoriale' },
        { src: 'site_assets/aura_stationery_mockup.png', caption: 'Mockup Biglietti da Visita' }
      ]
    },

    'fotografia': {
      title: 'SET FOTOGRAFICO · OFFICINA DGM',
      category: 'REPORTAGE FOTOGRAFICO',
      tools: 'Fotocamera Reflex Digitale, Adobe Lightroom Classic',
      summary: 'Reportage fotografico per raccontare il lavoro manuale, i volti e gli attrezzi dell’officina meccanica DGM Motori.',
      gallery: [
        { src: 'site_assets/foto_dgm_team_hero.jpg', caption: 'Il Team DGM' },
        { src: 'site_assets/foto_dgm_attrezzatura.jpg', caption: 'Pannello Attrezzi' },
        { src: 'site_assets/foto_dgm_motore_dettaglio.jpg', caption: 'Dettaglio Motore' },
        { src: 'site_assets/foto_dgm_ponte_sollevatore.jpg', caption: 'Ponte Sollevatore' }
      ]
    }
  };

  // Open Project Modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pKey = card.getAttribute('data-project');
      const data = projectsData[pKey];
      if (!data) return;

      let galleryHtml = '';
      data.gallery.forEach(img => {
        galleryHtml += `
          <div class="modal-gallery-item">
            <img src="${img.src}" alt="${img.caption}" class="modal-zoomable-img" data-full="${img.src}" data-cap="${img.caption}" loading="lazy">
            <span class="img-caption-tag">${img.caption}</span>
          </div>
        `;
      });

      let liveLinkBtn = '';
      if (data.liveLink) {
        liveLinkBtn = `
          <div style="margin-top:1.5rem;">
            <a href="${data.liveLink}" target="_blank" rel="noopener" class="vertex-live-btn" style="display:inline-flex;">
              APRI IL SITO VERTEX ↗
            </a>
          </div>
        `;
      }

      modalDynamicBody.innerHTML = `
        <div class="modal-project-header">
          <span class="modal-meta-tag">${data.category}</span>
          <h2 class="modal-title">${data.title}</h2>
        </div>

        <div class="modal-specs-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="modal-spec-item">
            <h5>PROGRAMMI USATI</h5>
            <p>${data.tools}</p>
          </div>
          <div class="modal-spec-item">
            <h5>CATEGORIA</h5>
            <p>${data.category}</p>
          </div>
        </div>

        <div class="modal-description-text">
          <h4 style="font-family:var(--font-title); font-size:1.4rem; margin-bottom:0.35rem;">PER COSA È STATO FATTO</h4>
          <p style="font-size:1.05rem; line-height:1.6;">${data.summary}</p>
          ${liveLinkBtn}
        </div>

        <h4 style="font-family:var(--font-title); font-size:1.6rem; margin:1.5rem 0 1rem; border-top:1px solid var(--border-light); padding-top:1.25rem;">IMMAGINI DEL PROGETTO</h4>
        <div class="modal-gallery-row">
          ${galleryHtml}
        </div>
      `;

      // Zoomable listeners inside modal
      modalDynamicBody.querySelectorAll('.modal-zoomable-img').forEach(imgEl => {
        imgEl.addEventListener('click', (e) => {
          e.stopPropagation();
          openLightbox(imgEl.getAttribute('data-full'), imgEl.getAttribute('data-cap'));
        });
      });

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Project Modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------------------------------------------------------------------------
     8. FULLSCREEN LIGHTBOX
     --------------------------------------------------------------------------- */
  function openLightbox(src, caption) {
    if (!imageLightbox) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    imageLightbox.classList.add('active');
    imageLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    imageLightbox.setAttribute('aria-hidden', 'true');
    if (!projectModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox) closeLightbox();
    });
  }

  // Photo gallery tile clicks
  photoTiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      currentPhotoIndex = index;
      const fullSrc = tile.getAttribute('data-src');
      const cap = tile.getAttribute('data-caption');
      openLightbox(fullSrc, cap);
    });
  });

  // Next / Prev photo in Lightbox
  if (prevLightboxBtn) {
    prevLightboxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (photoTiles.length === 0) return;
      currentPhotoIndex = (currentPhotoIndex - 1 + photoTiles.length) % photoTiles.length;
      const tile = photoTiles[currentPhotoIndex];
      openLightbox(tile.getAttribute('data-src'), tile.getAttribute('data-caption'));
    });
  }

  if (nextLightboxBtn) {
    nextLightboxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (photoTiles.length === 0) return;
      currentPhotoIndex = (currentPhotoIndex + 1) % photoTiles.length;
      const tile = photoTiles[currentPhotoIndex];
      openLightbox(tile.getAttribute('data-src'), tile.getAttribute('data-caption'));
    });
  }

  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  /* ---------------------------------------------------------------------------
     9. KEYBOARD NAVIGATION (Esc, Left, Right)
     --------------------------------------------------------------------------- */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imageLightbox && imageLightbox.classList.contains('active')) {
        closeLightbox();
      } else if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    } else if (e.key === 'ArrowLeft') {
      if (imageLightbox && imageLightbox.classList.contains('active') && photoTiles.length > 0) {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoTiles.length) % photoTiles.length;
        const tile = photoTiles[currentPhotoIndex];
        openLightbox(tile.getAttribute('data-src'), tile.getAttribute('data-caption'));
      }
    } else if (e.key === 'ArrowRight') {
      if (imageLightbox && imageLightbox.classList.contains('active') && photoTiles.length > 0) {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoTiles.length;
        const tile = photoTiles[currentPhotoIndex];
        openLightbox(tile.getAttribute('data-src'), tile.getAttribute('data-caption'));
      }
    }
  });

  /* ---------------------------------------------------------------------------
     10. CONTACT FORM SUBMISSION
     --------------------------------------------------------------------------- */
  window.handleFormSubmit = function() {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const type = document.getElementById('projectTypeSelect').value;
    const msg = document.getElementById('messageInput').value.trim();
    const feedback = document.getElementById('formFeedback');

    if (!name || !email || !msg) {
      feedback.style.color = 'var(--c-orange)';
      feedback.textContent = 'Compila tutti i campi obbligatori.';
      return;
    }

    const subject = encodeURIComponent(`[Contatto Portfolio] ${type} - ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nOggetto: ${type}\n\nMessaggio:\n${msg}`);
    const mailtoUrl = `mailto:tagliettimartina06@gmail.com?subject=${subject}&body=${body}`;

    feedback.style.color = 'var(--c-teal)';
    feedback.textContent = 'Invio in corso... Grazie!';
    showToast('✉️ Apertura email...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);
  };

  /* ---------------------------------------------------------------------------
     11. ACTIVE NAVIGATION SPY
     --------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
