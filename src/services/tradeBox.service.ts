import { CreateTradeBoxDto } from './../dtos/tradeBox.dto';
import { PrismaClient, TradeBox } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';

@Service()
export class TradeBoxService {
  public tradeBox = new PrismaClient().tradeBox;
  public userCards = new PrismaClient().userCard;
  public card = new PrismaClient().card;

  public async findAllTradeBoxesByUser(userId: number): Promise<TradeBox[]> {
    try {
      const allTradeBoxes: TradeBox[] = await this.tradeBox.findMany({
        where: { userId: userId },
        select: { id: true, name: true, description: true, userId: true, updatedAt: true, _count: { select: { cards: true } } },
      });
      return allTradeBoxes;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findTradeBoxById(tradeBoxId: number): Promise<TradeBox> {
    try {
      const findTradeBox: TradeBox = await this.tradeBox.findUnique({
        where: { id: tradeBoxId },
        include: {
          cards: {
            select: {
              id: true,
              userId: true,
              cardId: true,
              image: true,
              userImage: true,
              condition: true,
              grade: true,
              note: true,
              language: true,
              card: {
                include: {
                  set: { select: { name: true, identifier: true, image: true } },
                },
              },
            },
          },
        },
      });
      if (!findTradeBox) throw new HttpException(409, "TradeBox doesn't exist");

      return findTradeBox;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createTradeBox(tradeBoxData: CreateTradeBoxDto, req: RequestWithUser): Promise<TradeBox> {
    try {
      const nrOfTradeBoxes = await this.tradeBox.count({ where: { userId: req.user.id } });
      if (nrOfTradeBoxes >= 5) throw new HttpException(409, 'You can only have 5 tradeBoxes ');

      const dedupedCards = [...new Set(tradeBoxData.cards)];

      const areAllCardsValid = await this.userCards.findMany({ where: { id: { in: dedupedCards }, userId: req.user.id } });
      if (areAllCardsValid.length !== dedupedCards.length) throw new HttpException(409, 'Some cards are not yours');

      const createTradeBoxData: TradeBox = await this.tradeBox.create({
        data: {
          name: tradeBoxData.name,
          description: tradeBoxData.description,
          user: { connect: { id: req.user.id } },
          cards: { connect: dedupedCards.map(cardId => ({ id: cardId })) },
        },
      });
      return createTradeBoxData;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async renameTradebox(tradeBoxId: number, newName: string, req: RequestWithUser): Promise<TradeBox> {
    try {
      const doesTradeboxExist = await this.tradeBox.findFirst({ where: { id: tradeBoxId, userId: req.user.id } });
      if (!doesTradeboxExist) throw new HttpException(409, "TradeBox doesn't exist");
      const renameTradeBox: TradeBox = await this.tradeBox.update({ where: { id: tradeBoxId }, data: { name: newName } });
      return renameTradeBox;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async changeTradeBoxDescription(tradeBoxId: number, newDescription: string, req: RequestWithUser): Promise<TradeBox> {
    try {
      const doesTradeboxExist = await this.tradeBox.findFirst({ where: { id: tradeBoxId, userId: req.user.id } });
      if (!doesTradeboxExist) throw new HttpException(409, "TradeBox doesn't exist");
      const changeTradeBoxDescription: TradeBox = await this.tradeBox.update({
        where: { id: tradeBoxId },
        data: { description: newDescription },
      });
      return changeTradeBoxDescription;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addCardToTradeBox(tradeBoxId: number, cardId: number, req: RequestWithUser): Promise<TradeBox> {
    try {
      const doesTradeboxExist = await this.tradeBox.findFirst({ where: { id: tradeBoxId, userId: req.user.id } });
      if (!doesTradeboxExist) throw new HttpException(409, "TradeBox doesn't exist");
      const doesUserCardExist = await this.userCards.findFirst({ where: { id: cardId, userId: req.user.id } });
      if (!doesUserCardExist) throw new HttpException(409, "Card doesn't exist");
      const isCardAlreadyInTradeBox = await this.tradeBox.findFirst({
        where: { id: tradeBoxId, userId: req.user.id, cards: { some: { id: cardId } } },
      });
      if (isCardAlreadyInTradeBox) throw new HttpException(409, 'Card is already in tradeBox');
      const addCardToTradeBox: TradeBox = await this.tradeBox.update({
        where: { id: tradeBoxId },
        data: { cards: { connect: { id: cardId } } },
      });
      return addCardToTradeBox;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async removeCardFromTradeBox(tradeBoxId: number, cardId: number, req: RequestWithUser): Promise<TradeBox> {
    try {
      const doesTradeboxExist = await this.tradeBox.findFirst({ where: { id: tradeBoxId, userId: req.user.id } });
      if (!doesTradeboxExist) throw new HttpException(409, "TradeBox doesn't exist");
      const doesUserCardExist = await this.userCards.findFirst({ where: { id: cardId, userId: req.user.id } });
      if (!doesUserCardExist) throw new HttpException(409, "Card doesn't exist");
      const removeCardFromTradeBox: TradeBox = await this.tradeBox.update({
        where: { id: tradeBoxId },
        data: { cards: { disconnect: { id: cardId } } },
      });
      return removeCardFromTradeBox;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async deleteTradeBox(tradeBoxId: number, req: RequestWithUser): Promise<TradeBox> {
    try {
      const doesTradeboxExist = await this.tradeBox.findFirst({ where: { id: tradeBoxId, userId: req.user.id }, include: { cards: true } });
      if (!doesTradeboxExist) throw new HttpException(409, "TradeBox doesn't exist");
      // delete all usercards that are in the tradebox
      const tradeBoxCards = doesTradeboxExist.cards;
      await this.userCards.deleteMany({ where: { id: { in: tradeBoxCards.map(card => card.id) } } });
      const deleteTradeBox: TradeBox = await this.tradeBox.delete({ where: { id: tradeBoxId } });
      return deleteTradeBox;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
