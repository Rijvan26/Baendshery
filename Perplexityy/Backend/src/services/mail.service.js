import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "oauth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
  logger: true,
  debug: true,
});



transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendEmail({to, subject, html}) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html
    }; 

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}