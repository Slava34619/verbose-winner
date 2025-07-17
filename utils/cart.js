window.cart = {
  items: JSON.parse(localStorage.getItem('cart'))||[],
  init(iconSel, modalSel) {
    this.icon = document.querySelector(iconSel);
    this.modal = document.querySelector(modalSel);
    this.updateCount();
    this.icon.addEventListener('click', ()=> this.showModal());
    document.addEventListener('click', e=>{
      if(e.target.matches('.btn-add')) this.addItem(e.target.closest('.product-card'));
      if(e.target.id==='close-cart') this.hideModal();
      if(e.target.matches('.remove-item')) this.removeItem(+e.target.dataset.id);
    });
  },
  addItem(card) {
    const id = +card.dataset.id;
    const name = card.querySelector('.product-name').textContent;
    const price = +card.querySelector('.product-price').textContent;
    const qty = +card.querySelector('.qty-input').value;
    const idx = this.items.findIndex(i=>i.id===id);
    if(idx>-1) this.items[idx].qty+=qty;
    else this.items.push({id,name,price,qty});
    localStorage.setItem('cart',JSON.stringify(this.items));
    this.updateCount();
    this.notify(`В корзину добавлено ${qty}×${name}`);
  },
  removeItem(id){
    this.items=this.items.filter(i=>i.id!==id);
    localStorage.setItem('cart',JSON.stringify(this.items));
    this.renderModal();
    this.updateCount();
  },
  updateCount(){
    const sum = this.items.reduce((s,i)=>s+i.qty,0);
    this.icon.querySelector('#cart-count').textContent = sum;
  },
  showModal(){ this.renderModal(); this.modal.style.display='flex'; },
  hideModal(){ this.modal.style.display='none'; },
  renderModal(){
    const container = this.modal.querySelector('#cart-items');
    if(!this.items.length) container.innerHTML = '<p>Корзина пуста</p>';
    else container.innerHTML = this.items.map(i=>
      `<div>
         <span>${i.name} ×${i.qty}</span>
         <span>${i.price*i.qty} руб.</span>
         <button class="remove-item" data-id="${i.id}">✕</button>
       </div>`).join('');
    this.modal.querySelector('#cart-total-sum').textContent =
      this.items.reduce((s,i)=>s+i.price*i.qty,0)+' руб.';
  },
  notify(msg){
    const n=document.createElement('div');
    n.className='notification'; n.textContent=msg; document.body.append(n);
    setTimeout(()=>n.remove(),3000);
  }
};
