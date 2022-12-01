import { Application } from 'express';

const BASE_PATH = '/api/vi';

export default (app: Application) => {
  app.use(BASE_PATH);
};
