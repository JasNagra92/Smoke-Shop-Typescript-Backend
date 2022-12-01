import { smokeShopServer } from './setupServer';
import express, { Express, Application } from 'express';
import { config } from './config';
import dataBaseConnect from './setupDatabase';

class App {
  public initialize(): void {
    this.loadConfig();
    dataBaseConnect();
    const app: Express = express();
    smokeShopServer.start(app);
  }
  private loadConfig(): void {
    config.validateConfig();
  }
}

const app: App = new App();
app.initialize();
