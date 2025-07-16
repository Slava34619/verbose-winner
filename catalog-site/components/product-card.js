function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Цена: ${product.price} ₽</p>
    <input type="number" min="1" value="1" class="quantity">
    <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
  `;
  const button = card.querySelector('.add-to-cart');
  button.addEventListener('click', () => {
    addToCart(product, card.querySelector('.quantity').value);
    button.textContent = 'В корзине';
    button.disabled = true;
    showNotification(`Добавлено: ${product.name}`);
  });
  return card;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}