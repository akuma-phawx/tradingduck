import { Router } from 'express';
import { WishlistController } from '@controllers/wishlist.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class WishlistRoute implements Routes {
  public path = '/wishlist';
  public router = Router();
  public wishlist = new WishlistController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.wishlist.getWishlist);
    this.router.get(`${this.path}/user/:id`, AuthMiddleware, this.wishlist.getWishlistsByUser);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.wishlist.getWishlistById);
    this.router.put(`${this.path}/card`, AuthMiddleware, this.wishlist.addCardToWishlist);
    this.router.delete(`${this.path}/card/:id`, AuthMiddleware, this.wishlist.removeCardFromWishlist);
  }
}
