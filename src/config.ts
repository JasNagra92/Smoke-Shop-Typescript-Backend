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

  constructor() {
    this.MONGO_URL = process.env.MONGO_URL;
    this.KEY_ONE = process.env.KEY_ONE;
    this.KEY_TWO = process.env.KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.CLIENT_URL = process.env.CLIENT_URL;
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
