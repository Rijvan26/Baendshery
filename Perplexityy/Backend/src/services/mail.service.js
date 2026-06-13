import * as SibApiV3Sdk from "@getbrevo/brevo";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

console.log("BREVO SDK:", Object.keys(SibApiV3Sdk));

console.log("BREVO API KEY EXISTS:", !!process.env.BREVO_API_KEY);

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