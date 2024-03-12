import { RequestWithUser } from '@/interfaces/auth.interface';
import { NearByService } from './../services/nearby.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class NearByController {
  public nearby = Container.get(NearByService);

  public getNearbyByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params;
      const getNearbyStuff = await this.nearby.getNearby(Number(userId));

      res.status(200).json({ data: getNearbyStuff, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNearby = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: userId } = req.user;
      const getNearbyStuff = await this.nearby.getNearby(userId);

      res.status(200).json({ data: getNearbyStuff, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public isUserNearby = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: userId } = req.user;
      const { otherUserId } = req.params;
      const isUserNearby = await this.nearby.isUserNearby(userId, Number(otherUserId));

      res.status(200).json({ data: isUserNearby, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
