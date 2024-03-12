import { PrismaClient, Tradespot } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { CreateTradespotDto } from '@/dtos/tradespot.dto';

const INCLUDES = {
  country: true,
  nearByUsers: {
    select: {
      id: true,
      email: true,
      userProfile: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  },
};

@Service()
export class TradespotService {
  public tradespot = new PrismaClient().tradespot;
  public user = new PrismaClient().user;

  public async findAllTradespot(): Promise<Tradespot[]> {
    try {
      const allTradespot: Tradespot[] = await this.tradespot.findMany({
        include: INCLUDES,
      });
      return allTradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findTradespotById(tradespotId: number): Promise<Tradespot | null> {
    try {
      const tradespot: Tradespot | null = await this.tradespot.findUnique({
        where: { id: Number(tradespotId) },
        include: INCLUDES,
      });
      return tradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createTradespot(tradespotData: CreateTradespotDto): Promise<Tradespot> {
    try {
      const tradespot: Tradespot = await this.tradespot.create({
        data: { ...tradespotData },
      });
      return tradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async updateTradespot(tradespotId: number, tradespotData: CreateTradespotDto): Promise<Tradespot> {
    try {
      const tradespot: Tradespot = await this.tradespot.update({
        where: { id: Number(tradespotId) },
        data: { ...tradespotData },
      });
      return tradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async deleteTradespot(tradespotId: number): Promise<Tradespot> {
    try {
      const deletedTradespot: Tradespot = await this.tradespot.delete({
        where: { id: Number(tradespotId) },
      });
      return deletedTradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addTradespotToUser(tradespotId: number, userId: number): Promise<Tradespot> {
    try {
      const tradespot: Tradespot = await this.tradespot.update({
        where: { id: Number(tradespotId) },
        data: {
          nearByUsers: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
      return tradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async removeTradespotToUser(tradespotId: number, userId: number): Promise<Tradespot> {
    try {
      const tradespot: Tradespot = await this.tradespot.update({
        where: { id: Number(tradespotId) },
        data: {
          nearByUsers: {
            disconnect: {
              id: Number(userId),
            },
          },
        },
      });
      return tradespot;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findTradespotsNearBy(userId: number): Promise<Tradespot[]> {
    try {
      const tradespots: Tradespot[] = await this.tradespot.findMany({
        where: { nearByUsers: { some: { id: Number(userId) } } },
        include: INCLUDES,
      });
      return tradespots;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
