import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { SetController } from '@controllers/set.controller';
import { Routes } from '@interfaces/routes.interface';

export class SetRoute implements Routes {
  public path = '/sets';
  public router = Router();
  public set = new SetController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.set.getSets);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.set.getSetById);
    this.router.get(`${this.path}/:name`, AuthMiddleware, this.set.getSetByName);
  }
}
