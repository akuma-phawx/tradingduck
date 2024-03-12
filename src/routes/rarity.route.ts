import { Router } from 'express';
import { RarityController } from '@/controllers/rarity.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class RarityRoute implements Routes {
  public path = '/rarities';
  public router = Router();
  public rarity = new RarityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.rarity.getRarities);
  }
}
