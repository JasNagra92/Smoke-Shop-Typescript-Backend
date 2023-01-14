import { userServices } from './../services/db/user.services';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { config } from '../../config';

const log: Logger = config.createLogger('UserWorkerLog');

class UserWorker {
  public async addUserToQueue(job: Job, done: DoneCallback): Promise<void> {
    try {
      await userServices.addUserToDB(job.data);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error('error with worker');
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
