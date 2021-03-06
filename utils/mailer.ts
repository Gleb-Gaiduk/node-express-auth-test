import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from './logger';
// async function createTestCreds() {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// }

// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('smtp');

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass }
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, 'Error sending email');
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
