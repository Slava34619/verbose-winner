window.validateForm = form => {
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const file = form.file.files[0];
  if(!/\S+@\S+\.\S+/.test(email)) return 'Неверный email';
  if(!/^[\d\+\-\s]{6,}$/.test(phone)) return 'Неверный телефон';
  if(file && file.size>10*1024*1024) return 'Файл слишком большой';
  return '';
};
