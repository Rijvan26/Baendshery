import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

console.log("BREVO USER:", process.env.BREVO_SMTP_USER);
console.log("BREVO PASS:", !!process.env.BREVO_SMTP_PASS);

transporter.verify()
  .then(() => console.log("Brevo SMTP connected"))
  .catch((err) => console.error("Brevo SMTP error:", err));

export async function sendEmail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  });
}