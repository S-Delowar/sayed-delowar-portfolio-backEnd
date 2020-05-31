const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.post('/sendMessage', (req, res) => {
    var data = req.body;
    console.log(data);

    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        }
    });
    var mailOptions = {
        from: data.email,
        to: process.env.DB_USER,
        subject: 'Portfolio Message',
        html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
    };
    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.send(error)
                console.log(error)
            } else {
                res.send('Success')
                console.log('successfylly sent', mailOptions)
            }
            smtpTransport.close();
        });
})


app.listen(port, () => {
    console.log(`We are live on port ${port}`);
  });