import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { rateLimit } from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    // this.initializeFrontend();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`URL: http://localhost:${this.port}`);
      logger.info(`API Docs: http://localhost:${this.port}/api-docs`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      limit: 250, // limit each IP to 250 requests per windowMs
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    });
    this.app.use(limiter);
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            'default-src': ["'self'", 'https://ka-f.fontawesome.com', 'https://mcdn.wallpapersafari.com/'],
            'base-uri': ["'self'"],
            'script-src': [
              "'self'",
              "'unsafe-inline'",
              'https://cdn.jsdelivr.net/npm/',
              'https://kit.fontawesome.com/',
              'https://cdn.cookie-script.com/',
            ],
            'img-src': [
              "'self'",
              'data:',
              'https://mcdn.wallpapersafari.com/',
              'https://images.pokemontcg.io',
              'https://easyfairsassets.com/',
              'https://cdn.dribbble.com/',
              'https://static-cdn.jtvnw.net/',
            ],
          },
        },
      }),
    );
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/', route.router);
    });
  }

  // function that serves the frontend if frontend/dist is present
  private initializeFrontend() {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    if (fs.existsSync(frontendPath)) {
      this.app.use(express.static(frontendPath));
      this.app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
      });
    }
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
