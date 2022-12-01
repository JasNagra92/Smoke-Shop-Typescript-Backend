import express, { Application } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';

const PORT = 4000;

class SmokeShopServer {
  app: Application;
  constructor() {
    this.app = express();
  }

  // public function that will be called in main app class
  public start(app: Application): void {
    this.securityMiddelware(app);
    this.standardMiddleware(app);
    this.routesMiddleware(app);
    this.globalErrorHandler(app);
    this.startServer(app);
  }

  private securityMiddelware(app: Application): void {
    app.use(hpp());
    app.use(helmet());
    app.use(cors());
  }

  private standardMiddleware(app: Application): void {}

  // anonymous function that will be called from routes file
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private globalErrorHandler(app: Application): void {}

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHTTPServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }

  private startHTTPServer(httpServer: http.Server): void {
    httpServer.listen(PORT, () => {
      console.log('server started now listening on ' + PORT);
    });
  }
}
export const smokeShopServer: SmokeShopServer = new SmokeShopServer();
