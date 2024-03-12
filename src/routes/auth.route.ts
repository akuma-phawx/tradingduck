import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LogInUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post(`${this.path}/login`, ValidationMiddleware(LogInUserDto), this.auth.logIn);
    this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logOut);
    this.router.get(`${this.path}/amiloggedin`, AuthMiddleware, this.auth.amILoggedIn);
    this.router.get(`${this.path}/verify/:token`, this.auth.verifyEmail);
    this.router.post(`${this.path}/forgotpassword`, this.auth.forgotPassword);
    this.router.post(`${this.path}/resetpassword`, this.auth.resetPassword);
    this.router.post(`${this.path}/changepassword`, AuthMiddleware, this.auth.changePassword);
    this.router.post(`${this.path}/deleteMe`, AuthMiddleware, this.auth.deleteMe);
  }
}
