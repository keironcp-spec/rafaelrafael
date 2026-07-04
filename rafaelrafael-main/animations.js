// OnlyCRM — Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
  // ─── Intersection Observer for fade-up elements ───
  const animElements = document.querySelectorAll('.anim-fade-up');
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animElements.forEach(function(el) {
    fadeObserver.observe(el);
  });

  // ─── Section visibility ───
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(function(sec) {
    sectionObserver.observe(sec);
  });
});