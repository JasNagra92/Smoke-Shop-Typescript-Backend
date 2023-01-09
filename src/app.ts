import Logger from 'bunyan';
import { smokeShopServer } from './setupServer';
import express, { Express } from 'express';
import { config } from './config';
import dataBaseConnect from './setupDatabase';

const log: Logger = config.createLogger('app');

class App {
  public initialize(): void {
    this.loadConfig();
    dataBaseConnect();
    const app: Express = express();
    smokeShopServer.start(app);
    App.handleExit();
  }
  private loadConfig(): void {
    config.validateConfig();
  }

  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      log.error(`There was an uncaught error: ${error}`);
      App.shutDownProperly(1);
    });

    process.on('unhandleRejection', (reason: Error) => {
      log.error(`Unhandled rejection at promise: ${reason}`);
      App.shutDownProperly(2);
    });

    process.on('SIGTERM', () => {
      log.error('Caught SIGTERM');
      App.shutDownProperly(2);
    });

    process.on('SIGINT', () => {
      log.error('Caught SIGINT');
      App.shutDownProperly(2);
    });

    process.on('exit', () => {
      log.error('Exiting');
    });
  }

  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        log.info('Shutdown Complete');
        process.exit(exitCode);
      })
      .catch((error) => {
        log.error(`Error during shutdown: ${error}`);
        process.exit(1);
      });
  }
}

const app: App = new App();
app.initialize();
