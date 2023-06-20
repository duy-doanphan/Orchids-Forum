// const nodemailer = require("nodemailer");
// require("dotenv").config();
//
// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_SERVER,
//     port: process.env.SMTP_PORT,
//     secure: true,
//     auth: {
//       user: process.env.SMPT_USERNAME,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });
//
//   const mailOptions = {
//     from: `ONetwork Forum <${process.env.SMPT_USERNAME}>`,
//     to: options.email,
//     subject: options.subject,
//     // text: options.text,
//     html: options.html,
//   };
//
//   transporter.sendMail(mailOptions, function (err, res) {
//
//     if (err) {
//       console.log(err.message);
//     }
//   });
// };
//
// module.exports = sendEmail;

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    // tls: {
    //   ciphers: "TLSv1.2",
    // },
  });

  const mailOptions = {
    from: `ONetwork Forum <${process.env.SMTP_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    // text: options.text,
    html: options.html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};

module.exports = sendEmail;

