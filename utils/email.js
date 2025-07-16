async function sendOrder(form) {
  const formData = new FormData(form);
  formData.append('cart', JSON.stringify(cart));
  try {
    const response = await fetch('/order', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      alert('Заказ успешно отправлен');
      localStorage.removeItem('cart');
      window.location.reload();
    } else {
      alert('Ошибка отправки заказа');
    }
  } catch (error) {
    alert('Ошибка сервера');
  }
}