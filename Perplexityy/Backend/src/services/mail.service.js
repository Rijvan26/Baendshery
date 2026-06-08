import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer";


console.log("GOOGLE_USER:", process.env.GOOGLE_USER);
console.log("CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT_SECRET exists:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("REFRESH_TOKEN exists:", !!process.env.GOOGLE_REFRESH_TOKEN);


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{ 
      type:"oauth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
})



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