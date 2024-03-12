import { TwitchStreamerService } from '@/services/twitch.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class TwitchStreamerController {
  public twitchStreamer = Container.get(TwitchStreamerService);

  public getAllTwitchStreamers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const streamer: string[] = req.params.streamer.split(',');
      const findAllTwitchStreamersData = await this.twitchStreamer.fetchAllStreamData(streamer);

      res.status(200).json({ data: findAllTwitchStreamersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTwitchStreamerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const twitchStreamerId = String(req.params.id);
      const findOneTwitchStreamerData = await this.twitchStreamer.fetchStreamData(twitchStreamerId);

      res.status(200).json({ data: findOneTwitchStreamerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}
