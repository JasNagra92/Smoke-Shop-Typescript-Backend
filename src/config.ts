import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  MONGO_URL: string | undefined;
  NODE_ENV: string | undefined;
  KEY_ONE: string | undefined;
  KEY_TWO: string | undefined;
  JWT_SECRET: string | undefined;
  CLIENT_URL: string | undefined;
  SENDER_EMAIL: string | undefined;
  SENDER_PASSWORD: string | undefined;
  SENDGRID_API_KEY: string | undefined;
  REDIS_HOST: string | undefined;
  STRIPE_API_KEY: string | undefined;
  STRIPE_ENDPOINT_SECRET: string | undefined;

  constructor() {
    this.MONGO_URL = process.env.MONGO_URL;
    this.KEY_ONE = process.env.KEY_ONE;
    this.KEY_TWO = process.env.KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.SENDER_EMAIL = process.env.SENDER_EMAIL;
    this.SENDER_PASSWORD = process.env.SENDER_PASSWORD;
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    this.REDIS_HOST = process.env.REDIS_HOST;
    this.STRIPE_API_KEY = process.env.STRIPE_API_KEY;
    this.STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
  }
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`${key} is undefined`);
      }
    }
  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
}

export const config: Config = new Config();
