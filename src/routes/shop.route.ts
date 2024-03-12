import { Router } from 'express';
import { ShopController } from '@/controllers/shop.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateShopDto } from '@/dtos/shop.dto';
import { AdminAuthMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class ShopRoute implements Routes {
  public path = '/shops';
  public router = Router();
  public shop = new ShopController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.shop.getAllShops);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.shop.getShopById);
    this.router.post(`${this.path}`, AdminAuthMiddleware, ValidationMiddleware(CreateShopDto), this.shop.createShop);
    this.router.delete(`${this.path}/:id`, AdminAuthMiddleware, this.shop.deleteShop);
    this.router.put(`${this.path}/:id`, AdminAuthMiddleware, ValidationMiddleware(CreateShopDto, true), this.shop.updateShop);
    this.router.post(`${this.path}/:id/nearBy`, AuthMiddleware, this.shop.addShopToNearBy);
    this.router.delete(`${this.path}/:id/nearBy`, AuthMiddleware, this.shop.removeShopFromNearBy);
  }
}
