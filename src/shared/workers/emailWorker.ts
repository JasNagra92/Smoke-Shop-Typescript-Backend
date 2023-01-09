import { emailServices } from './../services/email/email.services';
import { DoneCallback, Job } from 'bull';
import { config } from 'src/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('email worker');

export class EmailWorker {
  public sendForgotPasswordEmail(job: Job, done: DoneCallback): void {
    try {
      const { receiverEmail, username, resetLink } = job.data;
      emailServices.sendForgotPasswordEmail(receiverEmail, username, resetLink);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error('error sending forgot password email');
      done(error as Error);
    }
  }

  public sendReceiptEmail(job: Job, done: DoneCallback): void {
    try {
      const { name, email, orderNumber, pickupDate, amount_total } = job.data;
      emailServices.sendReceiptEmail(name, email, orderNumber, pickupDate, amount_total);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error('error sending receipt email');
      done(error as Error);
    }
  }
}

export const emailWorker: EmailWorker = new EmailWorker();
