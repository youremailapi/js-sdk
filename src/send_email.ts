import SendEmailInterface from "./interfaces/send_email.interface";
import axios from "axios";

export async function sendEmail(
  apikey: string,
  {
    to,
    subject,
    smtp_account,
    template,
    variables,
    attachments,
    bcc,
  }: SendEmailInterface
) {
  const body = {
    to,
    subject,
    smtp_account,
    template,
    variables,
  };

  if (null !== attachments) {
    body["attachments"] = attachments;
  }
  if (null !== bcc) {
    body["bcc"] = bcc;
  }

  return axios
    .post("https://api.youremailapi.com/mailer", body, {
      headers: {
        apikey,
      },
    })
    .then((data) => {
      return { data: data.data };
    })
    .catch((response) => {
      return response;
    });
}
