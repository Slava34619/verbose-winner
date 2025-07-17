window.api = {
  renderProducts(list, containerSel) {
    const tpl = document.getElementById('product-card-tpl').content;
    const con = document.querySelector(containerSel);
    list.forEach(p=>{
      const card = tpl.cloneNode(true);
      card.querySelector('.product-card').dataset.id = p.id;
      card.querySelector('.product-img').src = p.img;
      card.querySelector('.product-name').textContent = p.name;
      card.querySelector('.product-desc').textContent = p.desc;
      card.querySelector('.product-price').textContent = `${p.price} руб.`;
      con.append(card);
    });
  },
  sendOrder(form) {
    const err = validateForm(form);
    if(err){ alert(err); return; }
    const data = new FormData(form);
    data.append('cart', JSON.stringify(cart.items));
    fetch('/api/order', { method:'POST', body:data })
      .then(r=>r.ok?alert('Заказ отправлен'):alert('Ошибка'))
      .then(()=>{ cart.items=[]; localStorage.removeItem('cart'); })
      .catch(()=>alert('Ошибка соединения'));
  }
};
document.addEventListener('submit', e=>{
  if(e.target.id==='order-form'){
    e.preventDefault();
    api.sendOrder(e.target);
  }
});
