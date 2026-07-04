// OnlyCRM Manual — Main Script
document.addEventListener('DOMContentLoaded', function () {
  const TAB_ORDER = ['dashboard', 'dialogs', 'accounts', 'employees', 'notes'];

  const tabButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.section');
  const contentWrapper = document.getElementById('content-wrapper');
  const expandOverlay = document.getElementById('expand-overlay');
  const expandBtn = document.getElementById('expand-btn');
  const nextButtons = document.querySelectorAll('.next-btn');

  let isExpanded = false;

  // ─── Switch Tab ───
  function switchTab(tabId) {
    // Update buttons
    tabButtons.forEach(function (btn) {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update sections
    sections.forEach(function (sec) {
      var sectionId = sec.id.replace('section-', '');
      if (sectionId === tabId) {
        sec.classList.remove('hidden');
        sec.style.animation = 'none';
        void sec.offsetHeight; // force reflow
        sec.style.animation = '';
      } else {
        sec.classList.add('hidden');
      }
    });

    // Safe checks (чтобы не падало на Vercel)
    if (contentWrapper && expandOverlay) {
      if (isExpanded) {
        contentWrapper.classList.remove('collapsed');
        contentWrapper.classList.add('expanded');
        expandOverlay.classList.add('hidden-overlay');
      } else {
        contentWrapper.classList.add('collapsed');
        contentWrapper.classList.remove('expanded');
        expandOverlay.classList.remove('hidden-overlay');
      }
    }

    // Smooth scroll
    var contentCard = document.querySelector('.content-card');
    if (contentCard) {
      contentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ─── Tab Click Handlers ───
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // ─── Expand Button (FIXED) ───
  if (expandBtn && contentWrapper && expandOverlay) {
    expandBtn.addEventListener('click', function () {
      isExpanded = true;
      contentWrapper.classList.remove('collapsed');
      contentWrapper.classList.add('expanded');
      expandOverlay.classList.add('hidden-overlay');
    });
  }

  // ─── Next Buttons ───
  nextButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nextTabId = btn.getAttribute('data-next');
      if (nextTabId) {
        switchTab(nextTabId);
      }
    });
  });
});