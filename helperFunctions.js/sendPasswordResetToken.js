
const nodemailer = require("nodemailer");
const knex = require('../config/KnexConnection');
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
const sendPasswordResetToken = async (user, token) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Do not reply -- PolyLogger"<noreply@polylogger.com>', // sender address
    to: user.email, // list of receivers
    subject: "Password Reset Link", // Subject line
    text: "Hello world?", // plain text body
    html: 
    `
    <b>Hello, ${user.username}</b>
    <p><a href="https://polylogger.com/auth/reset-password-via-email/${token}"> Reset your password! </a></p>
    `
    , // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
}

module.exports = sendPasswordResetToken;