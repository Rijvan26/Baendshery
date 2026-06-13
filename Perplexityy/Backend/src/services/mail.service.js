import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

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