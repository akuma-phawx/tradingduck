import { PrismaClient, UserCard } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PaginationResponse } from './../utils/pagination';
import { PaginationParams, getSkipAndTake } from '@/utils/pagination';
import languages from '../../languages.json';

@Service()
export class UserCardService {
  public userCard = new PrismaClient().userCard;
  public card = new PrismaClient().card;

  public async findAllCardsByUser(userId: number): Promise<UserCard[]> {
    try {
      const allCards: UserCard[] = await this.userCard.findMany({ where: { userId: userId }, include: { card: true } });
      return allCards;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findCardById(cardId: number): Promise<UserCard> {
    try {
      const findCard: UserCard = await this.userCard.findUnique({ where: { id: cardId } });
      if (!findCard) throw new HttpException(409, "Card doesn't exist");

      return findCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createCard(cardData: UserCard, req: RequestWithUser): Promise<UserCard> {
    try {
      const card = await this.card.findUnique({ where: { identifier: cardData.cardId } });
      if (!card) throw new HttpException(409, "Card doesn't exist");
      const nrOfUsercards = await this.userCard.count({ where: { userId: req.user.id } });
      if (nrOfUsercards >= 100) throw new HttpException(409, 'You can only have 100 cards in your collection');
      cardData.cardId = undefined;
      const conditions = ['MINT', 'NEAR_MINT', 'EXCELLENT', 'GOOD', 'LIGHT_PLAYED', 'PLAYED', 'POOR'];
      if (!conditions.includes(cardData.condition)) {
        throw new HttpException(409, 'Wrong card condition');
      }
      if (
        cardData.languageCode &&
        !languages.some(lang => {
          return lang.code === cardData.languageCode;
        })
      ) {
        throw new HttpException(409, 'Wrong card language');
      }
      const createCard: UserCard = await this.userCard.create({
        data: {
          ...(cardData.userImage && { userImage: cardData.userImage }),
          ...(cardData.grade && { grade: cardData.grade }),
          ...(cardData.note && { note: cardData.note }),
          ...(cardData.languageCode && {
            language: {
              connect: {
                code: cardData.languageCode,
              },
            },
          }),
          condition: cardData.condition,
          image: card.image,
          user: {
            connect: {
              id: req.user.id,
            },
          },
          card: {
            connect: {
              identifier: card.identifier,
            },
          },
        },
      });
      return createCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async updateCard(cardId: number, cardData: UserCard): Promise<UserCard> {
    try {
      const updateCard: UserCard = await this.userCard.update({ where: { id: cardId }, data: cardData });
      return updateCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async getUserCardsByCardId(cardId: string, paginationParams?: PaginationParams): Promise<PaginationResponse<UserCard[]>> {
    try {
      const total = await this.userCard.count({
        where: { cardId: cardId },
      });
      const allCards: UserCard[] = await this.userCard.findMany({
        where: { cardId: cardId },
        include: {
          card: true,
          language: true,
          user: {
            select: {
              id: true,
              email: true,
              isVerified: true,
              userProfile: { include: { location: true } },
            },
          },
        },

        ...getSkipAndTake(paginationParams.page, paginationParams.pageSize),
      });
      return { result: allCards, total };
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
  public async deleteCard(cardId: number): Promise<UserCard> {
    try {
      const deleteCard: UserCard = await this.userCard.delete({ where: { id: cardId } });
      return deleteCard;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
