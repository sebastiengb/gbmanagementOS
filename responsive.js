// ============================================================
// GB Management OS — Responsive nav
// Injects a mobile hamburger button + sidebar overlay
// Toggles the sidebar on/off on mobile.
// ============================================================
(function () {
  function init() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Inject toggle button (hidden on desktop via CSS @media)
    const toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.textContent = '☰';
    document.body.appendChild(toggle);

    // Inject overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openNav() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      toggle.textContent = '✕';
    }
    function closeNav() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      toggle.textContent = '☰';
    }

    toggle.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) closeNav();
      else openNav();
    });
    overlay.addEventListener('click', closeNav);

    // Close on nav-item click (mobile only)
    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeNav();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeNav();
    });

    // Close when resizing back up to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        closeNav();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
