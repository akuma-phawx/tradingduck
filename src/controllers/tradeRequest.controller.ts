import { TradeRequestService } from './../services/tradeRequest.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class TradeRequestController {
  public tradeRequest = Container.get(TradeRequestService);

  public getAllSentTradeRequests = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllTradeRequestsData = await this.tradeRequest.findAllSendTradeRequestsByUser(userId);

      res.status(200).json({ data: findAllTradeRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllIncomingTradeRequests = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllTradeRequestsData = await this.tradeRequest.findAllIncTradeRequestsByUser(userId);

      res.status(200).json({ data: findAllTradeRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTradeRequestById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const findOneTradeRequestData = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);

      res.status(200).json({ data: findOneTradeRequestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestData = req.body;
      tradeRequestData.senderId = Number(req.user.id);
      const createTradeRequestData = await this.tradeRequest.createTradeRequest(tradeRequestData, req);

      res.status(201).json({ data: createTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public addMessageToTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const message = req.body.message;
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.sendUserId !== userId && findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const addMessageToTradeRequestData = await this.tradeRequest.addMessageToTradeRequest(tradeRequestId, message, req);

      res.status(201).json({ data: addMessageToTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getMessagesFromTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.sendUserId !== userId && findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const getMessagesFromTradeRequestData = await this.tradeRequest.getMessagesFromTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: getMessagesFromTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public acceptTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const acceptTradeRequestData = await this.tradeRequest.acceptTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: acceptTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public completeTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.sendUserId !== userId && findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const completeTradeRequestData = await this.tradeRequest.completeTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: completeTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public declineTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const declineTradeRequestData = await this.tradeRequest.declineTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: declineTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.sendUserId !== userId && findTradeRequest.incUserId !== userId) throw new Error('Unauthorized');
      const deleteTradeRequestData = await this.tradeRequest.deleteTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: deleteTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public cancelTradeRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tradeRequestId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findTradeRequest = await this.tradeRequest.findTradeRequestById(tradeRequestId, req);
      if (findTradeRequest.sendUserId !== userId) throw new Error('Unauthorized');
      const cancelTradeRequestData = await this.tradeRequest.cancelTradeRequest(tradeRequestId, req);

      res.status(201).json({ data: cancelTradeRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
