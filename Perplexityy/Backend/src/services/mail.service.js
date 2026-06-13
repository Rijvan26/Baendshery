import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail({ to, subject, html }) {
  try {
    const sendSmtpEmail = {
      sender: {
        name: "Perplexity",
        email: "khanrijvan2610@gmail.com",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent:", result);
    return result;
  } catch (err) {
    console.error("BREVO API ERROR:", err);
    throw err;
  }
}