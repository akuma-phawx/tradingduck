import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TradeBoxService } from '@services/tradeBox.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class TradeBoxController {
  public tradeBox = Container.get(TradeBoxService);

  public getTradeBoxes = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllTradeBoxesData = await this.tradeBox.findAllTradeBoxesByUser(userId);

      res.status(200).json({ data: findAllTradeBoxesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTradeBoxesByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findAllTradeBoxesData = await this.tradeBox.findAllTradeBoxesByUser(userId);

      res.status(200).json({ data: findAllTradeBoxesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTradeBoxById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const findOneTradeBoxData = await this.tradeBox.findTradeBoxById(tradeBoxId);

      res.status(200).json({ data: findOneTradeBoxData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTradeBox = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxData = req.body;
      tradeBoxData.userId = Number(req.user.id);
      const createTradeBoxData = await this.tradeBox.createTradeBox(tradeBoxData, req);

      res.status(201).json({ data: createTradeBoxData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public renameTradeBox = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const newName = req.body.name;
      const userId = Number(req.user.id);
      const findTradeBox = await this.tradeBox.findTradeBoxById(tradeBoxId);
      if (findTradeBox.userId !== userId) throw new Error('Unauthorized');
      const renameTradeBoxData = await this.tradeBox.renameTradebox(tradeBoxId, newName, req);

      res.status(200).json({ data: renameTradeBoxData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public changeTradeBoxDescription = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const newDescription = req.body.description;
      const userId = Number(req.user.id);
      const findTradeBox = await this.tradeBox.findTradeBoxById(tradeBoxId);
      if (findTradeBox.userId !== userId) throw new Error('Unauthorized');
      const changeTradeBoxDescriptionData = await this.tradeBox.changeTradeBoxDescription(tradeBoxId, newDescription, req);

      res.status(200).json({ data: changeTradeBoxDescriptionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public addCardToTradeBox = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const cardId = Number(req.body.cardId);
      const userId = Number(req.user.id);
      const findTradeBox = await this.tradeBox.findTradeBoxById(tradeBoxId);
      if (findTradeBox.userId !== userId) throw new Error('Unauthorized');
      const addCardToTradeBoxData = await this.tradeBox.addCardToTradeBox(tradeBoxId, cardId, req);

      res.status(200).json({ data: addCardToTradeBoxData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public removeCardFromTradeBox = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const cardId = Number(req.body.cardId);
      const userId = Number(req.user.id);
      const findTradeBox = await this.tradeBox.findTradeBoxById(tradeBoxId);
      if (findTradeBox.userId !== userId) throw new Error('Unauthorized');
      const removeCardFromTradeBoxData = await this.tradeBox.removeCardFromTradeBox(tradeBoxId, cardId, req);

      res.status(200).json({ data: removeCardFromTradeBoxData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTradeBox = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeBoxId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeBox = await this.tradeBox.findTradeBoxById(tradeBoxId);
      if (findTradeBox.userId !== userId) throw new Error('Unauthorized');
      const deleteTradeBoxData = await this.tradeBox.deleteTradeBox(tradeBoxId, req);

      res.status(200).json({ data: deleteTradeBoxData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
