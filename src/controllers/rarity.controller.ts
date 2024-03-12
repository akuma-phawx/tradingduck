import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RarityService } from '@services/rarity.service';

export class RarityController {
  public rarity = Container.get(RarityService);

  public getRarities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRaritiesData = await this.rarity.findAllRarities();

      res.status(200).json({ data: findAllRaritiesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
