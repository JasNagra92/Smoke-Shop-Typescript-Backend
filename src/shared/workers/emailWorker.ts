import { emailServices } from './../services/email/email.services';
import { DoneCallback, Job } from 'bull';
import { config } from 'src/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('email worker');

export class EmailWorker {
  public sendEmail(job: Job, done: DoneCallback): void {
    try {
      const { receiverEmail, subject, body } = job.data;
      emailServices.sendDevelopmentEmail(receiverEmail, subject, body);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error('error sending email');
      done(error as Error);
    }
  }
}

export const emailWorker: EmailWorker = new EmailWorker();
