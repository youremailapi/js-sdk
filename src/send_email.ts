import SendEmailInterface from "./interfaces/send_email.interface";
import axios from "axios";

export async function sendEmail(
  apikey: string,
  { to, subject, smtp_account, template, variables }: SendEmailInterface
) {
  return axios
    .post(
      "https://api.youremailapi.com/mailer",
      {
        to,
        subject,
        smtp_account,
        template,
        variables,
      },
      {
        headers: {
          apikey,
        },
      }
    )
    .then((data) => {
      return { data: data.data };
    })
    .catch((response) => {
      return response;
    });
}
