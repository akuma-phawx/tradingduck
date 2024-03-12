import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminAuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AdminAuthMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, AdminAuthMiddleware, this.user.getUserById);
    this.router.post(`${this.path}`, AdminAuthMiddleware, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, AdminAuthMiddleware, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, AdminAuthMiddleware, this.user.deleteUser);
    this.router.post(`${this.path}/:id(\\d+)/ban`, AdminAuthMiddleware, this.user.banUser);
    this.router.post(`${this.path}/:id(\\d+)/unban`, AdminAuthMiddleware, this.user.unbanUser);
  }
}
