const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const sendEmail = async (to, subject, html) => {
    console.log("Sending email to:", to);
    console.log("Email subject:", subject);
  try {
  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000,
  socketTimeout: 30000
});

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;