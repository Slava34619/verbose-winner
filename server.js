const express = require('express');
const multer  = require('multer');
const nodemailer = require('nodemailer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(express.static('public'));

app.post('/api/order', upload.single('file'), async (req, res) => {
  const { name, email, phone, comment, cart } = req.body;
  const transporter = nodemailer.createTransport({ /* SMTP-конфиг */ });
  const mailOptions = {
    from: '"ПромТехСнаб" <no-reply@promtehsnab.ru>',
    to: 'snabpromgroup@mail.ru',
    subject: 'Новый заказ',
    html: `<h3>Контакты</h3>
           <p>${name}, ${email}, ${phone}</p>
           <h3>Товары</h3>
           <pre>${cart}</pre>
           ${comment?`<h3>Комментарий</h3><p>${comment}</p>`:''}`,
    attachments: req.file ? [{ path: req.file.path, filename: req.file.originalname }] : []
  };
  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch(err){
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, ()=>console.log('Server on port 3000'));
