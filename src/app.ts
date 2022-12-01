import { smokeShopServer } from './setupServer';
import express, { Express, Application } from 'express';
import { config } from './config';

class App {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    smokeShopServer.start(app);
  }
  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const app: App = new App();
app.initialize();
