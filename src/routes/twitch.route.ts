import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { TwitchStreamerController } from '@/controllers/twitch.controller';

export class TwitchRoute implements Routes {
  public path = '/twitch';
  public router = Router();
  public twitch = new TwitchStreamerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all/:streamer`, AuthMiddleware, this.twitch.getAllTwitchStreamers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.twitch.getTwitchStreamerById);
  }
}
