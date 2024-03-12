import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CardService } from '@services/card.service';

export class CardController {
  public card = Container.get(CardService);

  public getCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCardsData = await this.card.findAllCard();

      res.status(200).json({ data: findAllCardsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = String(req.params.id);
      const findOneCardData = await this.card.findCardById(cardId);

      res.status(200).json({ data: findOneCardData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCardByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardName = String(req.params.name);
      const findOneCardData = await this.card.findCardByName(cardName);

      res.status(200).json({ data: findOneCardData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}
