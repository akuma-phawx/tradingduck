import { HttpException } from '@/exceptions/httpException';
import { createTransport } from 'nodemailer';
import { Service } from 'typedi';
import { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } from '@/config';

@Service()
export class EmailService {
  private transporter = createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  public async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
