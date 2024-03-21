export default interface SendEmailInterface {
  smtp_account: string;
  template: string;
  to: string;
  subject: string;
  variables?: object;
  attachments?: Array<string>;
  bcc?: Array<string>
}
