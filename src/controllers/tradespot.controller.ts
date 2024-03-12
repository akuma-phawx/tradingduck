import { TradespotService } from '@/services/tradespot.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateTradespotDto } from '@/dtos/tradespot.dto';
import { Tradespot } from '@prisma/client';

export class TradespotController {
  public tradespot = Container.get(TradespotService);

  public getAllTradespots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTradespotsData = await this.tradespot.findAllTradespot();

      res.status(200).json({ data: findAllTradespotsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTradespotById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotId = Number(req.params.id);
      const findOneTradespotData = await this.tradespot.findTradespotById(tradespotId);

      res.status(200).json({ data: findOneTradespotData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTradespot = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotData: CreateTradespotDto = req.body;
      const createTradespotData: Tradespot = await this.tradespot.createTradespot(tradespotData);

      res.status(201).json({ data: createTradespotData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTradespot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotId = Number(req.params.id);
      const tradespotData: CreateTradespotDto = req.body;
      const updateTradespotData: Tradespot = await this.tradespot.updateTradespot(tradespotId, tradespotData);

      res.status(200).json({ data: updateTradespotData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTradespot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotId = Number(req.params.id);
      const deleteTradespotData: Tradespot = await this.tradespot.deleteTradespot(tradespotId);

      res.status(200).json({ data: deleteTradespotData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public addTradespotToNearBy = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotId = Number(req.params.id);
      const userId = Number(req.user.id);
      const addTradespotToNearByData: Tradespot = await this.tradespot.addTradespotToUser(tradespotId, userId);

      res.status(200).json({ data: addTradespotToNearByData, message: 'added' });
    } catch (error) {
      next(error);
    }
  };

  public removeTradespotFromNearBy = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradespotId = Number(req.params.id);
      const userId = Number(req.user.id);
      const removeTradespotFromNearByData: Tradespot = await this.tradespot.removeTradespotToUser(tradespotId, userId);

      res.status(200).json({ data: removeTradespotFromNearByData, message: 'removed' });
    } catch (error) {
      next(error);
    }
  };
}
