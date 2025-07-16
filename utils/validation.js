document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const file = form.file.files[0];
  if (!form.name.value || !form.email.value || !form.phone.value) {
    alert('Заполните все обязательные поля');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email.value)) {
    alert('Некорректный email');
    return;
  }
  if (file && file.size > 10 * 1024 * 1024) {
    alert('Файл не должен превышать 10 МБ');
    return;
  }
  sendOrder(form);
});