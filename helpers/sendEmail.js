const nodemailer = require('nodemailer');

module.exports.sendMail =  (email,subject,html) => {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html
    };
    // Send email
    transporter.sendMail(mailOptions,function(error, info){
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });

};