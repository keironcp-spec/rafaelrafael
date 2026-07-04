// OnlyCRM — Legal page content translations
// Works together with i18n.js: i18n.js translates the shared chrome
// (nav labels, footer links, tagline) via [data-i18n], while this file
// swaps the actual legal document body (.legal-card) using the
// page-specific `window.legalTranslations` object declared before this
// script is loaded.
(function() {
  var STORAGE_KEY = 'onlycrm-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ru';
  }

  function applyLegalContent(lang) {
    var dict = window.legalTranslations;
    if (!dict) return;

    var data = dict[lang] || dict.en;
    if (!data) return;

    var card = document.querySelector('.legal-content-wrap .legal-card');
    if (card && data.html) {
      card.innerHTML = data.html;
    }

    if (data.title) {
      document.title = data.title;
    }

    if (data.description) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', data.description);
    }

    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Apply the content matching whatever language is already active
    applyLegalContent(getLang());

    // React to language switches
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        applyLegalContent(btn.getAttribute('data-lang'));
      });
    });
  });
})();
