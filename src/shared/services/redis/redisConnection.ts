import Logger from 'bunyan';
import { config } from 'src/config';
import { BaseCache } from './base.cache';

const log: Logger = config.createLogger('redisConnection');

export class RedisConnection extends BaseCache {
  constructor() {
    super('redisConnection');
  }
  public async connect(): Promise<void> {
    try {
      this.client.connect();
    } catch (error) {
      log.error(error);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
