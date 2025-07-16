const reviews = [
  { text: "Отличное качество!", author: "Иван" },
  { text: "Быстрая доставка!", author: "Мария" }
];

function initCarousel() {
  const carousel = document.querySelector('.review-carousel');
  reviews.forEach(review => {
    const div = document.createElement('div');
    div.textContent = `${review.text} — ${review.author}`;
    carousel.appendChild(div);
  });
}
initCarousel();