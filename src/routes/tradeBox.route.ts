import { Router } from 'express';
import { TradeBoxController } from '@controllers/tradeBox.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateTradeBoxDto } from '@/dtos/tradeBox.dto';

export class TradeBoxRoute implements Routes {
  public path = '/tradeboxes';
  public router = Router();
  public tradeBox = new TradeBoxController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.tradeBox.getTradeBoxes);
    this.router.get(`${this.path}/user/:id`, AuthMiddleware, this.tradeBox.getTradeBoxesByUser);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.tradeBox.getTradeBoxById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTradeBoxDto), this.tradeBox.createTradeBox);
    this.router.put(`${this.path}/name/:id`, AuthMiddleware, ValidationMiddleware(CreateTradeBoxDto, true), this.tradeBox.renameTradeBox);
    this.router.put(
      `${this.path}/description/:id`,
      AuthMiddleware,
      ValidationMiddleware(CreateTradeBoxDto, true),
      this.tradeBox.changeTradeBoxDescription,
    );
    this.router.put(`${this.path}/cards/:id`, AuthMiddleware, this.tradeBox.addCardToTradeBox);
    this.router.delete(`${this.path}/cards/:id`, AuthMiddleware, this.tradeBox.removeCardFromTradeBox);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.tradeBox.deleteTradeBox);
  }
}
