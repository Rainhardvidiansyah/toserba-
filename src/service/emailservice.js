const nodemailer = require('nodemailer');
require('dotenv').config();



const  transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAPUSERNAME,
      pass: process.env.MAILTRAPPASSWORD
    }
  });

  const sendEmail = (email, link) => {
    const mailOptions = {
        from: "rainhard@bookstore.com",
        to: email,
        subject: 'Please activate your account by clicking this link',
        text: 'Click this link to activate your account ' + link
      };
      transport.sendMail(mailOptions, function(err, info) {
        if(err){
            console.log(err);
        }else{
            console.info(info);
        }
      });
  };

  module.exports = sendEmail;

 
