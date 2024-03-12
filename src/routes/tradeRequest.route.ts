import { CreateTradeRequestDto } from './../dtos/tradeRequest.dto';
import { CreateTradeRequestMessageDto } from '@/dtos/tradeRequestMessage.dto';
import { TradeRequestController } from './../controllers/tradeRequest.controller';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AdminAuthMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export class TradeRequestRoute implements Routes {
  public path = '/tradeRequests';
  public router = Router();
  public tradeRequest = new TradeRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/send`, AuthMiddleware, this.tradeRequest.getAllSentTradeRequests);
    this.router.get(`${this.path}/inc`, AuthMiddleware, this.tradeRequest.getAllIncomingTradeRequests);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.tradeRequest.getTradeRequestById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTradeRequestDto), this.tradeRequest.createTradeRequest);
    this.router.get(`${this.path}/:id/accept`, AuthMiddleware, this.tradeRequest.acceptTradeRequest);
    this.router.get(`${this.path}/:id/decline`, AuthMiddleware, this.tradeRequest.declineTradeRequest);
    this.router.get(`${this.path}/:id/cancel`, AuthMiddleware, this.tradeRequest.cancelTradeRequest);
    this.router.get(`${this.path}/:id/complete`, AuthMiddleware, this.tradeRequest.completeTradeRequest);
    this.router.post(
      `${this.path}/:id/message`,
      AuthMiddleware,
      ValidationMiddleware(CreateTradeRequestMessageDto),
      this.tradeRequest.addMessageToTradeRequest,
    );
    this.router.get(`${this.path}/:id/messages`, AuthMiddleware, this.tradeRequest.getMessagesFromTradeRequest);
    this.router.delete(`${this.path}/:id`, AdminAuthMiddleware, this.tradeRequest.deleteTradeRequest);
  }
}
