import { SearchController } from './../controllers/search.controller';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class SearchRoute implements Routes {
  public path = '/search';
  public router = Router();
  public search = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/cards`, AuthMiddleware, this.search.getCardsByName);
    this.router.get(`${this.path}/sets/:name`, AuthMiddleware, this.search.getSetsByName);
  }
}
