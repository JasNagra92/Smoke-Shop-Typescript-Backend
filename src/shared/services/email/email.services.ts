import { BadRequestError } from './../../globals/helpers/errorHandler';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from 'src/config';
import Logger from 'bunyan';
import sendGridMail from '@sendgrid/mail';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = config.createLogger('mail');

export class EmailServices {
  public async sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    if (config.NODE_ENV === 'development' || config.NODE_ENV === 'test') {
      this.sendDevelopmentEmail(receiverEmail, subject, body);
    } else {
      this.sendProductionEmail(receiverEmail, subject, body);
    }
  }

  private async sendDevelopmentEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: config.SENDER_EMAIL,
      to: receiverEmail,
      subject,
      html: body
    };

    const transporter: Mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_PASSWORD
      }
    });
    try {
      await transporter.sendMail(mailOptions);
      log.info('dev email sent successfully');
    } catch (error) {
      log.error('error sending mail');
      throw new BadRequestError('error sending mail');
    }
  }
  public async sendProductionEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    const mailOptions: IMailOptions = {
      from: `Nagra Smoke Shop <${config.SENDER_EMAIL}>`,
      to: receiverEmail,
      subject,
      html: body
    };
    try {
      await sendGridMail.send(mailOptions);
      log.info('email sent successfully');
    } catch (error) {
      log.error('problem sending email');
      throw new BadRequestError('problem sending email');
    }
  }
}

export const emailServices: EmailServices = new EmailServices();
