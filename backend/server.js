const express = require('express');
const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Define your endpoint for handling form submissions
app.post('/api/sendForm', (req, res) => {
    const { firstName, lastName, email, phone, street, city, state, zipcode, country } = req.body;

    const mailOptions = {
        from: 'alirajpoot8857@gmail.com',
        to: 'alirajpooot8857@gmail.com', // Owner's email
        subject: 'New User Form Submission',
        text: `New user has filled the form with the following details:
                Name: ${firstName} ${lastName}
                Email: ${email}
                Phone: ${phone}
                Address: ${street}, ${city}, ${state}, ${zipcode}, ${country}`
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alirajpoot8857@gmail.com',
            pass: 'vpgl byvd zugc wggz',
        },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Email sent successfully' });
      });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


  