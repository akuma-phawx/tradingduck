import { CreateTradespotDto } from '@/dtos/tradespot.dto';
import { Router } from 'express';
import { TradespotController } from '@/controllers/tradespot.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AdminAuthMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class TradespotRoute implements Routes {
  public path = '/tradespots';
  public router = Router();
  public tradespot = new TradespotController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.tradespot.getAllTradespots);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.tradespot.getTradespotById);
    this.router.post(`${this.path}`, AdminAuthMiddleware, ValidationMiddleware(CreateTradespotDto), this.tradespot.createTradespot);
    this.router.delete(`${this.path}/:id`, AdminAuthMiddleware, this.tradespot.deleteTradespot);
    this.router.put(`${this.path}/:id`, AdminAuthMiddleware, ValidationMiddleware(CreateTradespotDto, true), this.tradespot.updateTradespot);
    this.router.post(`${this.path}/:id/nearBy`, AuthMiddleware, this.tradespot.addTradespotToNearBy);
    this.router.delete(`${this.path}/:id/nearBy`, AuthMiddleware, this.tradespot.removeTradespotFromNearBy);
  }
}
