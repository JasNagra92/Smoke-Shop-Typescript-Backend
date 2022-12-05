import { emailWorker } from './../../workers/emailWorker';
import { IEmailJob } from './../../../features/user/interfaces/user.interface';
import { BaseQueue } from './base.queue';

class EmailQueue extends BaseQueue {
  constructor() {
    super('email');
    this.processJob('sendEmail', 5, emailWorker.sendEmail);
  }
  public addUserJob(name: string, data: IEmailJob): void {
    this.addJob(name, data);
  }
}

export const emailQueue: EmailQueue = new EmailQueue();
