import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { StreamerService } from '@/services/streamer.service';

export class StreamerController {
  public streamer = Container.get(StreamerService);

  public getStreamers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStreamersData = await this.streamer.findAllStreamers();

      res.status(200).json({ data: findAllStreamersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
