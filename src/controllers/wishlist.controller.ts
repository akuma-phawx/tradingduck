import { WishlistService } from './../services/wishlist.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class WishlistController {
  public wishlist = Container.get(WishlistService);

  public getWishlist = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllWishlistsData = await this.wishlist.getWishlist(req);

      res.status(200).json({ data: findAllWishlistsData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getWishlistsByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findAllWishlistsData = await this.wishlist.findWishlistsByUser(userId);

      res.status(200).json({ data: findAllWishlistsData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getWishlistById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const wishlistId = Number(req.params.id);
      const findOneWishlistData = await this.wishlist.findWishlistById(wishlistId);

      res.status(200).json({ data: findOneWishlistData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public addCardToWishlist = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const card = req.body.card;
      const addCardToWishlistData = await this.wishlist.addCardToWishlist(card, req);

      res.status(200).json({ data: addCardToWishlistData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public removeCardFromWishlist = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const card = String(req.params.id);
      const removeCardFromWishlistData = await this.wishlist.removeCardFromWishlist(card, req);

      res.status(200).json({ data: removeCardFromWishlistData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
