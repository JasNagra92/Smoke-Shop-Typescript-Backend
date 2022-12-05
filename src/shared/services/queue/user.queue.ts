import { userWorker } from './../../workers/userWorker';
import { IUserDocument } from 'src/features/user/interfaces/user.interface';
import { BaseQueue } from './base.queue';

class UserQueue extends BaseQueue {
  constructor() {
    super('user');
    this.processJob('addUserToDB', 5, userWorker.addUserToQueue);
  }
  public addUserJob(name: string, data: IUserDocument): void {
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();
