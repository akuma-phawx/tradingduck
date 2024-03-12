import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserCardService } from '@services/userCard.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { getPaginationParams } from '@/utils/pagination';

export class UserCardController {
  public userCard = Container.get(UserCardService);

  public getCards = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllCardsData = await this.userCard.findAllCardsByUser(userId);

      res.status(200).json({ data: findAllCardsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Number(req.params.id);
      const findOneCardData = await this.userCard.findCardById(cardId);

      res.status(200).json({ data: findOneCardData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCard = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardData = req.body;
      cardData.userId = Number(req.user.id);
      const createCardData = await this.userCard.createCard(cardData, req);

      res.status(201).json({ data: createCardData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Number(req.params.id);
      const cardData = req.body;
      const userId = Number(req.user.id);
      const findCard = await this.userCard.findCardById(cardId);
      if (findCard.userId !== userId) throw new Error('Unauthorized');
      const updateCardData = await this.userCard.updateCard(cardId, cardData);

      res.status(200).json({ data: updateCardData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public findCardsByCardId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = String(req.params.id);
      const paginationParams = getPaginationParams(req.query.page, req.query.pageSize);

      const findAllCardsData = await this.userCard.getUserCardsByCardId(cardId, paginationParams);

      res.status(200).json({ data: findAllCardsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Number(req.params.id);
      const userId = Number(req.user.id);
      const findCard = await this.userCard.findCardById(cardId);
      if (findCard.userId !== userId) throw new Error('Unauthorized');
      const deleteCardData = await this.userCard.deleteCard(cardId);

      res.status(200).json({ data: deleteCardData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
