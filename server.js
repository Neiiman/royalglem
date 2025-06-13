const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moabelolethabo090@gmail.com', // business Gmail
    pass: 'tjgo eeey bgmt jlife' // App Password if using Gmail
  }
});

app.post('/book', (req, res) => {
  const { name, email, phone, address, service, quote } = req.body;

  const businessMailOptions = {
    from: '',
    to: 'moabelolethabo090@gmail.com',
    subject: `New Booking from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nService: ${service}\nQuote: ${quote}`
  };

  const customerMailOptions = {
    from: 'moabelolethabo090@gmail.com',
    to: email,
    subject: 'Booking Confirmation - Royal Glem Auto Detailing',
    text: `Hi ${name},\n\nThank you for your booking!\n\nDetails:\nService: ${service}\nQuote: ${quote}\nAddress: ${address}\nPhone: ${phone}\n\nWe'll get in touch soon.\n\n- Royal Glem Team`
  };

  transporter.sendMail(businessMailOptions, (err, info) => {
    if (err) {
      console.error('Business email failed:', err);
      return res.status(500).send('Error sending email to business');
    }

    transporter.sendMail(customerMailOptions, (err, info) => {
      if (err) {
        console.error('Customer email failed:', err);
        return res.status(500).send('Error sending email to customer');
      }

      res.status(200).send('Booking emails sent successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
