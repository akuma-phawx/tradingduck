import { PrismaClient, Streamer } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class StreamerService {
  public streamer = new PrismaClient().streamer;

  public async findAllStreamers(): Promise<Streamer[]> {
    try {
      const allStreamers: Streamer[] = await this.streamer.findMany();
      return allStreamers;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
