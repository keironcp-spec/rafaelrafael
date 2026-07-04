(function() {
  var html = document.documentElement;

  function updateActive() {
    var current = html.getAttribute('data-theme') || 'dark';
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === current);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var choice = btn.getAttribute('data-theme-choice');
        html.setAttribute('data-theme', choice);
        localStorage.setItem('onlycrm-theme', choice);
        updateActive();
      });
    });

    updateActive();
  });
})();
