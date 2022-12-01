import { config } from './config';
import mongoose from 'mongoose';

export default (): void => {
  const connect = () => {
    mongoose
      .connect(`${config.MONGO_URL!}`)
      .then(() => console.log('database connection successfull'))
      .catch((error) => {
        console.log('database error', error);
        process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnect', connect);
};
