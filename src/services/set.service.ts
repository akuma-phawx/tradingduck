import { PrismaClient, Set } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class SetService {
  public set = new PrismaClient().set;

  public async findAllSet(): Promise<Set[]> {
    try {
      const allSet: Set[] = await this.set.findMany({ include: { _count: { select: { cards: true } } } });
      return allSet;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findSetById(setId: string): Promise<Set> {
    try {
      const findSet: Set = await this.set.findUnique({ where: { identifier: setId }, include: { cards: true } });
      if (!findSet) throw new HttpException(409, "Set doesn't exist");

      return findSet;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findSetByName(setName: string): Promise<Set> {
    try {
      const findSet: Set = await this.set.findFirst({ where: { name: setName }, include: { cards: true } });
      if (!findSet) throw new HttpException(409, "Set doesn't exist");

      return findSet;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
