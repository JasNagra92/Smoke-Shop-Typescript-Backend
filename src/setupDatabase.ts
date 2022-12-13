import { redisConnection } from './shared/services/redis/redisConnection';
import { config } from './config';
import mongoose from 'mongoose';
import Logger from 'bunyan';

const log: Logger = config.createLogger('databaseLog');

export default (): void => {
  const connect = () => {
    mongoose
      .connect(`${config.MONGO_URL!}`)
      .then(() => {
        log.info('database connection successfull');
        redisConnection.connect();
      })
      .catch((error) => {
        log.info('database error', error);
        process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnect', connect);
};
