import * as brevo from "@getbrevo/brevo";
console.log(Object.keys(brevo));

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

console.log("BREVO_API_KEY:", !!process.env.BREVO_API_KEY);
export async function sendEmail({ to, subject, html }) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Perplexity",
      email: "khanrijvan2610@gmail.com",
    };

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent:", result);
    return result;
  } catch (err) {
    console.error("BREVO API ERROR:", err);
    throw err;
  }
}