// OnlyCRM — Manual Section Logic
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.manual-tab-btn');
  const sections = document.querySelectorAll('.manual-sec');
  const contentWrapper = document.getElementById('manual-content-wrapper');
  const expandOverlay = document.getElementById('manual-expand-overlay');
  const expandBtn = document.getElementById('manual-expand-btn');
  const nextButtons = document.querySelectorAll('.manual-next-btn');

  let isExpanded = false;

  function switchTab(tabId) {
    tabButtons.forEach(function(btn) {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    sections.forEach(function(sec) {
      var sectionId = sec.id.replace('msec-', '');
      if (sectionId === tabId) {
        sec.classList.remove('hidden');
        sec.style.animation = 'none';
        void sec.offsetHeight;
        sec.style.animation = '';
      } else {
        sec.classList.add('hidden');
      }
    });

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

    var manualContent = document.querySelector('.manual-content');
    if (manualContent) {
      manualContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  tabButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  if (expandBtn && contentWrapper && expandOverlay) {
    expandBtn.addEventListener('click', function() {
      isExpanded = true;
      contentWrapper.classList.remove('collapsed');
      contentWrapper.classList.add('expanded');
      expandOverlay.classList.add('hidden-overlay');
    });
  }

  nextButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var nextTabId = btn.getAttribute('data-next');
      if (nextTabId) {
        switchTab(nextTabId);
      }
    });
  });
});