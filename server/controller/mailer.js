const nodemailer = require('nodemailer');

const sendMail = (email, emailBody, emailSubject) => {
  const transporter = nodemailer.createTransport({
    name: "lmsadmin",
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass : process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "LMS group of tech",
    to: email,
    subject : emailSubject,
    html : emailBody,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent !`);
    }
  });
};


module.exports = sendMail;
