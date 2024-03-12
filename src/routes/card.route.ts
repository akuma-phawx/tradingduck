import { Router } from 'express';
import { CardController } from '@controllers/card.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class CardRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public card = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.card.getCards);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.card.getCardById);
    this.router.get(`${this.path}/:name`, AuthMiddleware, this.card.getCardByName);
  }
}
