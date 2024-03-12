import { Router } from 'express';
import { UserProfileController } from '@controllers/userProfile.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserProfileRoute implements Routes {
  public path = '/userProfile';
  public router = Router();
  public userProfile = new UserProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.userProfile.getUserProfile);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.userProfile.getUserProfileById);
    this.router.patch(`${this.path}`, AuthMiddleware, this.userProfile.updateUserProfile);
  }
}
