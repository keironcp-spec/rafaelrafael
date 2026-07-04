
(function() {
  const html = document.documentElement;
  const logo = document.getElementById('theme-logo');

  // ─── Load saved preferences ───
  const savedTheme = localStorage.getItem('onlycrm-theme') || 'dark';
  const savedAccent = localStorage.getItem('onlycrm-accent') || 'purple';

  html.setAttribute('data-theme', savedTheme);
  html.setAttribute('data-accent', savedAccent);

  function updateLogo() {
    if (!logo) return;

    const nextSrc = html.getAttribute('data-theme') === 'dark' ? 'photo2.png' : 'photo1.png';

    // Если уже нужный src, ничего не делаем
    if (logo.src.endsWith(nextSrc)) return;

  logo.style.transition = 'opacity 0.3s ease';
  logo.style.opacity = 0;

  // Ждём окончания transition
  setTimeout(() => {
    // Меняем источник изображения
    logo.src = nextSrc;

    // Когда новое изображение загрузится, возвращаем opacity
    logo.onload = () => {
      logo.style.opacity = 1;
    };
  }, 150); // Время совпадает с transition
}

  document.addEventListener('DOMContentLoaded', function() {
    // ─── Theme Toggle ───
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('onlycrm-theme', next);

        // плавно обновляем логотип
        updateLogo();
      });
    }

    // ─── Accent Color Picker ───
    const colorDots = document.querySelectorAll('.color-dot');
    function updateActiveDot() {
      const currentAccent = html.getAttribute('data-accent');
      colorDots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-accent') === currentAccent);
      });
    }

    colorDots.forEach(dot => {
      dot.addEventListener('click', function() {
        const accent = dot.getAttribute('data-accent');
        html.setAttribute('data-accent', accent);
        localStorage.setItem('onlycrm-accent', accent);
        updateActiveDot();
      });
    });

    updateActiveDot();
    updateLogo(); // сразу при загрузке страницы
  });
})();