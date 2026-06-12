import nodemailer from "nodemailer";

console.log("MAIL SERVICE LOADED");
console.log("GOOGLE_USER:", process.env.GOOGLE_USER);
console.log("APP_PASSWORD EXISTS:", !!process.env.GOOGLE_APP_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email server ready");
  }
});

export async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
}