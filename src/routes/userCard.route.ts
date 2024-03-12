import { Router } from 'express';
import { UserCardController } from '@controllers/usercard.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateUserCardDto } from '@/dtos/userCard.dto';

export class UserCardRoute implements Routes {
  public path = '/usercards';
  public router = Router();
  public userCard = new UserCardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.userCard.getCards);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.userCard.getCardById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateUserCardDto), this.userCard.createCard);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateUserCardDto, true), this.userCard.updateCard);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.userCard.deleteCard);
    this.router.get(`${this.path}/card/:id`, AuthMiddleware, this.userCard.findCardsByCardId);
  }
}
