import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CardSearchParams, NearbySearchParams, SearchService, isNearbySearchparams } from '@services/search.service';
import { getPaginationParams } from '@/utils/pagination';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class SearchController {
  public search = Container.get(SearchService);

  public getCardsByName = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const searchParams: CardSearchParams = {
        name: req.query.name ? String(req.query.name) : undefined,
        rarity: req.query.rarity ? String(req.query.rarity) : undefined,
        type: req.query.type ? String(req.query.type) : undefined,
        setId: req.query.setId ? String(req.query.setId) : undefined,
        onlyShowTradedCards: req.query.onlyShowTradedCards ? req.query.onlyShowTradedCards === 'true' : undefined,
        onlyShowNearbyCards:
          req.query.onlyShowNearbyCards && isNearbySearchparams(String(req.query.onlyShowNearbyCards))
            ? (req.query.onlyShowNearbyCards as NearbySearchParams)
            : undefined,
      };

      const paginationParams = getPaginationParams(req.query.page, req.query.pageSize);

      const findAllCardsData = await this.search.findAllCardsByName(req, searchParams, paginationParams);

      res.status(200).json({ data: findAllCardsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSetsByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const setName = String(req.params.name);
      const findAllSetsData = await this.search.findAllSetsByName(setName);

      res.status(200).json({ data: findAllSetsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
