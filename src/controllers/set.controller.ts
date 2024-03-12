import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SetService } from '@services/set.service';

export class SetController {
  public set = Container.get(SetService);

  public getSets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSetsData = await this.set.findAllSet();

      res.status(200).json({ data: findAllSetsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const setId = String(req.params.id);
      const findOneSetData = await this.set.findSetById(setId);

      res.status(200).json({ data: findOneSetData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getSetByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const setName = String(req.params.name);
      const findOneSetData = await this.set.findSetByName(setName);

      res.status(200).json({ data: findOneSetData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}
