const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/order', async (req, res) => {
  const { name, email, phone, comment, cart } = req.body;
  const file = req.files?.file;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'snabpromgroup@mail.ru',
    subject: 'Новый заказ',
    text: `
      Имя: ${name}
      Email: ${email}
      Телефон: ${phone}
      Комментарий: ${comment || 'Нет'}
      Заказ: ${JSON.stringify(cart)}
      Сумма: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽
    `,
    attachments: file ? [{ filename: file.name, content: file.data }] : []
  };

  try {
    await transporter.sendMail(mailOptions);
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: `Новый заказ от ${name}\nEmail: ${email}\nТелефон: ${phone}\nСумма: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽`
    });
    res.status(200).send('Заказ отправлен');
  } catch (error) {
    res.status(500).send('Ошибка отправки');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));