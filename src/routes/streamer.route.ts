import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { StreamerController } from '@/controllers/streamer.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class StreamerRoute implements Routes {
  public path = '/streamers';
  public router = Router();
  public streamer = new StreamerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.streamer.getStreamers);
  }
}
