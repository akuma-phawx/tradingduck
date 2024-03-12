import { PrismaClient, Card } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

const includeOpts = {
  set: true,
  rarity: true,
};

@Service()
export class CardService {
  public card = new PrismaClient().card;

  public async findAllCard(): Promise<Card[]> {
    try {
      const allCard: Card[] = await this.card.findMany({
        include: includeOpts,
      });
      return allCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findCardById(cardId: string): Promise<Card> {
    try {
      const findCard: Card = await this.card.findUnique({
        where: { identifier: cardId },
        include: includeOpts,
      });
      if (!findCard) throw new HttpException(409, "Card doesn't exist");

      return findCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findCardByName(cardName: string): Promise<Card> {
    try {
      const findCard: Card = await this.card.findFirst({
        where: { name: cardName },
        include: includeOpts,
      });
      if (!findCard) throw new HttpException(409, "Card doesn't exist");

      return findCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
