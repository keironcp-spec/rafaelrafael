// OnlyCRM — Pricing Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to pricing cards
  var pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      card.style.borderColor = 'var(--accent)';
    });
    card.addEventListener('mouseleave', function() {
      if (!card.classList.contains('featured')) {
        card.style.borderColor = '';
      }
    });
  });
});