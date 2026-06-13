export async function sendEmail({ to, subject, html }) {
  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "Perplexity",
            email: "khanrijvan2610@gmail.com",
          },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        }),
      }
    );

    const data = await response.json();

    console.log("BREVO RESPONSE:", data);

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (err) {
    console.error("BREVO EMAIL ERROR:", err);
    throw err;
  }
}