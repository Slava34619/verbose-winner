// /components/review-form.js
const reviews = [
  { text: "Отличное качество продукции!", author: "Иван" },
  { text: "Быстрая доставка и отличный сервис!", author: "Мария" },
];

function initReviewForm() {
  const form = document.getElementById('review-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = form.querySelector('[name="author"]').value;
    const text = form.querySelector('[name="text"]').value;

    if (!author || !text) {
      showError('Заполните все поля');
      return;
    }

    reviews.push({ text, author });
    updateCarousel();
    form.reset();
    showNotification('Отзыв добавлен');
  });
}

function updateCarousel() {
  const carousel = document.querySelector('.review-carousel');
  carousel.innerHTML = '';
  reviews.forEach(review => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<p>"${review.text}"</p><p>— ${review.author}</p>`;
    carousel.appendChild(div);
  });
}

function showError(message) {
  const notification = document.createElement('div');
  notification.className = 'notification error';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

initReviewForm();
updateCarousel();