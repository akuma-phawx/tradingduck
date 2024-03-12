import { PrismaClient, Rarity } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class RarityService {
  public rarity = new PrismaClient().rarity;

  public async findAllRarities(): Promise<Rarity[]> {
    try {
      const allRarities: Rarity[] = await this.rarity.findMany();
      return allRarities;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
