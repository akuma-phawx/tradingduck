import { Router } from 'express';
import { NearByController } from '@/controllers/nearby.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class NearByRoute implements Routes {
  public path = '/nearby';
  public router = Router();
  public nearby = new NearByController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, AuthMiddleware, this.nearby.getNearbyByUserId);
    this.router.get(`${this.path}`, AuthMiddleware, this.nearby.getNearby);
    this.router.get(`${this.path}/near/:otherUserId`, AuthMiddleware, this.nearby.isUserNearby);
  }
}
