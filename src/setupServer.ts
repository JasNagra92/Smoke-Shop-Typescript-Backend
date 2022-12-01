import express, { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import cookieSession from 'cookie-session';
import appRoutes from './routes';
import { config } from './config';

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
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.KEY_ONE!, config.KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  // anonymous function that will be called from routes file
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  // middleware that will be called after routes middleware to respond with error to client
  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: `${req.originalUrl} not found` });
      next();
    });
  }

  // creates http server and uses private method to start listening on port
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
