import { BadRequestError } from './../../globals/helpers/errorHandler';
import { config } from 'src/config';
import Logger from 'bunyan';
import sendGridMail from '@sendgrid/mail';
import { formatInTimeZone } from 'date-fns-tz';
sendGridMail.setApiKey(config.SENDGRID_API_KEY!);

const log: Logger = config.createLogger('mail');

export class EmailServices {
  public async sendReceiptEmail(
    receiverEmail: string,
    name: string,
    email: string,
    orderNumber: string,
    pickupDate: any,
    amount_total: number
  ): Promise<void> {
    const msg: sendGridMail.MailDataRequired = {
      to: config.NODE_ENV === 'development' ? config.SENDER_EMAIL : receiverEmail,
      from: config.NODE_ENV === 'development' ? config.SENDER_EMAIL! : 'nagra-smoke-house@outlook.com',
      templateId: 'd-b4a225546f484a32b1e882fd3bfaf9ce',
      dynamicTemplateData: {
        customer_name: name,
        customer_email: email,
        order_number: orderNumber,
        pickup_date: formatInTimeZone(new Date(`${pickupDate.pickupDate}`), 'Canada/Pacific', 'MM/dd/yyyy H:mm'),
        total: (amount_total / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'CAD'
        })
      }
    };
    try {
      await sendGridMail.send(msg);
      log.info('email sent successfully');
    } catch (error) {
      log.error('problem sending email');
      throw new BadRequestError('problem sending email');
    }
  }
  public async sendForgotPasswordEmail(receiverEmail: string, username: string, resetLink: string): Promise<void> {
    const msg: sendGridMail.MailDataRequired = {
      to: config.NODE_ENV === 'development' ? config.SENDER_EMAIL : receiverEmail,
      from: 'nagra-smoke-house@outlook.com',
      templateId: 'd-dfe80730cfc2441695cbe86ffec81fb5',
      dynamicTemplateData: {
        username,
        resetLink
      }
    };
    try {
      await sendGridMail.send(msg);
      log.info('email sent successfully');
    } catch (error) {
      log.error(error);
      throw new BadRequestError('problem sending email');
    }
  }
}

export const emailServices: EmailServices = new EmailServices();
