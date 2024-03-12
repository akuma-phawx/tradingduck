import { Router } from 'express';
import { CountryController } from '@/controllers/country.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class CountryRoute implements Routes {
  public path = '/countries';
  public router = Router();
  public country = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.country.getCountries);
  }
}
