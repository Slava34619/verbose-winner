// /utils/telegram.js
const axios = require('axios');
require('dotenv').config();

async function sendTelegramNotification(orderData) {
  const { name, email, phone, cart } = orderData;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `
    Новый заказ от ${name}
    Email: ${email}
    Телефон: ${phone}
    Заказ: ${JSON.stringify(cart, null, 2)}
    Сумма: ${total} ₽
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log('Telegram notification sent successfully');
  } catch (error) {
    console.error('Error sending Telegram notification:', error.message);
    throw new Error('Failed to send Telegram notification');
  }
}

module.exports = { sendTelegramNotification };