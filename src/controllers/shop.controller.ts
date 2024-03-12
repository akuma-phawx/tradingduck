import { ShopService } from './../services/shop.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class ShopController {
  public shop = Container.get(ShopService);

  public getAllShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllShopsData = await this.shop.findAllShop();

      res.status(200).json({ data: findAllShopsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getShopById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const findOneShopData = await this.shop.findShopById(shopId);

      res.status(200).json({ data: findOneShopData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createShop = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopData = req.body;
      const createShopData = await this.shop.createShop(shopData);

      res.status(201).json({ data: createShopData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const shopData = req.body;
      const updateShopData = await this.shop.updateShop(shopId, shopData);

      res.status(200).json({ data: updateShopData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const deleteShopData = await this.shop.deleteShop(shopId);

      res.status(200).json({ data: deleteShopData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public addShopToNearBy = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const userId = req.user.id;
      const addShopToNearbyData = await this.shop.addShopToNearBy(shopId, userId);

      res.status(200).json({ data: addShopToNearbyData, message: 'added' });
    } catch (error) {
      next(error);
    }
  };

  public removeShopFromNearBy = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const userId = req.user.id;
      const removeShopFromNearbyData = await this.shop.removeShopFromNearBy(shopId, userId);

      res.status(200).json({ data: removeShopFromNearbyData, message: 'removed' });
    } catch (error) {
      next(error);
    }
  };
}
