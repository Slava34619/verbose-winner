let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, quantity) {
  cart.push({ ...product, quantity: parseInt(quantity) });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.textContent = `${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} ₽`;
    cartItems.appendChild(itemEl);
    total += item.price * item.quantity;
  });
  totalEl.textContent = total;
}