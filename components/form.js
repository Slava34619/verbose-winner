// /components/form.js
async function handleFormSubmission() {
  const form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const comment = form.querySelector('[name="comment"]').value;
    const file = form.querySelector('[name="file"]').files[0];

    // Validation
    if (!name || !email || !phone) {
      showError('Заполните все обязательные поля');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError('Некорректный email');
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      showError('Файл не должен превышать 10 МБ');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('comment', comment);
    if (file) formData.append('file', file);
    formData.append('cart', JSON.stringify(cart)); // Assuming cart is a global variable from cart.js

    try {
      const response = await fetch('/order', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        showNotification('Заказ успешно отправлен');
        localStorage.removeItem('cart');
        form.reset();
        updateCart(); // From cart.js
      } else {
        showError('Ошибка отправки заказа');
      }
    } catch (error) {
      showError('Ошибка сервера');
    }
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

handleFormSubmission();