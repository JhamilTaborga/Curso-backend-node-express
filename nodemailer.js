const nodemailer = require('nodemailer');
const { config } = require('./api/config/config');

async function sendMail() {
// Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
          user: config.googleMail,
          pass: config.googlePass
      }
  });

  try {
    const info = await transporter.sendMail({
      from: config.googleMail, // sender address
      to: config.googleMail, // list of recipients
      subject: "Hello this is the email conection with google mail", // subject line
      text: "Hello google email?", // plain text body
      html: "<b>Hello google email?</b>", // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

sendMail();
