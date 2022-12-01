class Config {
  MONGO_URL: string | undefined;
  NODE_ENV: string | undefined;
  KEY_ONE: string | undefined;
  KEY_TWO: string | undefined;

  constructor() {
    this.MONGO_URL = process.env.MONGO_URL;
    this.KEY_ONE = process.env.KEY_ONE;
    this.KEY_TWO = process.env.KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
  }
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
