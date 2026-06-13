import nodemailer from "nodemailer";


console.log("GOOGLE_USER:", process.env.GOOGLE_USER);
console.log("CLIENT_ID:", !!process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT_SECRET:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("REFRESH_TOKEN:", !!process.env.GOOGLE_REFRESH_TOKEN);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.APP_PASSWORD,
  },
});

transporter.verify()
    .then(() => { console.log("Email transporter is ready to send emails"); })
    .catch((err) => { console.error("Email transporter verification failed:", err); });


export async function sendEmail({ to, subject, html, text }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}