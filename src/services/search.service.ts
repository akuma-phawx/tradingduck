import { RequestWithUser } from './../interfaces/auth.interface';
import { PaginationResponse } from './../utils/pagination';
import { PrismaClient, Card, Set, Rarity } from '@prisma/client';
import { Service, Container } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { PaginationParams, getSkipAndTake } from '@/utils/pagination';
import { NearBy, NearByService } from './nearby.service';

export type NearbySearchParams = 'shops' | 'events' | 'spots' | 'all' | 'true' | true | undefined;

export interface CardSearchParams {
  name?: string;
  rarity?: string;
  type?: string;
  setId?: string;
  onlyShowTradedCards?: boolean;
  onlyShowNearbyCards?: NearbySearchParams;
}

export type FullCard = Partial<Card> & {
  set: Set;
  rarity: Rarity;
  _count: { userCards: number; userCardsTrader?: number };
  userCards: {
    user: {
      id: number;
      ShopsNearBy: { id: number }[];
      TradespotsNearBy: { id: number }[];
      EventAttendees: { id: number }[];
    };
  }[];
};
@Service()
export class SearchService {
  public card = new PrismaClient().card;
  public set = new PrismaClient().set;
  public usercard = new PrismaClient().userCard;
  public nbs = Container.get(NearByService);

  public async findAllCardsByName(
    req: RequestWithUser,
    searchParams: CardSearchParams,
    paginationParams?: PaginationParams,
  ): Promise<PaginationResponse<FullCard[]>> {
    try {
      if (Object.keys(searchParams).length === 0) {
        throw new HttpException(400, 'No search parameters provided');
      }
      const searchExpression = createCardSearchExpression(
        searchParams,
        searchParams.onlyShowNearbyCards ? await this.nbs.getNearby(req.user.id) : undefined,
      );
      const total = await this.card.count({
        where: { ...searchExpression },
      });
      const allCards: FullCard[] = await this.card.findMany({
        where: {
          ...searchExpression,
        },
        select: {
          _count: {
            select: { userCards: true },
          },
          identifier: true,
          name: true,
          image: true,
          artist: true,
          flavorText: true,
          releaseDate: true,
          types: true,
          rarity: true,
          set: true,
          userCards: {
            select: {
              user: {
                select: {
                  id: true,
                  ShopsNearBy: true,
                  TradespotsNearBy: true,
                  EventAttendees: true,
                },
              },
            },
          },
        },
        ...getSkipAndTake(paginationParams.page, paginationParams.pageSize),
      });

      for (const card of allCards) {
        if (card._count.userCards === 0) continue;
        const users = await this.usercard.groupBy({
          by: ['userId'],
          where: { cardId: card.identifier },
        });
        card._count.userCardsTrader = users.length;
      }
      return { result: allCards, total };
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findAllSetsByName(setName: string): Promise<Set[]> {
    try {
      const allSets: Set[] = await this.set.findMany({
        where: { name: { contains: setName, mode: 'insensitive' } },
        include: { cards: true, _count: { select: { cards: true } } },
      });
      return allSets;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}

export const createCardSearchExpression = (searchParams: CardSearchParams, nearby?: NearBy) => {
  const searchExpression = {};
  if (searchParams.name) {
    searchExpression['name'] = { contains: searchParams.name, mode: 'insensitive' };
  }
  if (searchParams.rarity) {
    searchExpression['rarity'] = { name: searchParams.rarity };
  }
  if (searchParams.type) {
    searchExpression['type'] = { contains: searchParams.type, mode: 'insensitive' };
  }
  if (searchParams.setId) {
    searchExpression['setId'] = searchParams.setId;
  }
  if (searchParams.onlyShowTradedCards) {
    searchExpression['userCards'] = { some: { userId: { gt: 0 } } };
  }
  if (searchParams.onlyShowNearbyCards) {
    // I know that I overwrite the userCards property here, but I don't care
    // as nearby cards are always traded cards

    if (searchParams.onlyShowNearbyCards === 'all' || searchParams.onlyShowNearbyCards === true || searchParams.onlyShowNearbyCards === 'true') {
      searchExpression['userCards'] = {
        some: {
          user: {
            OR: [
              {
                ShopsNearBy: {
                  some: {
                    id: {
                      in: nearby.shops.map(s => s.id),
                    },
                  },
                },
              },
              {
                EventAttendees: {
                  some: {
                    id: {
                      in: nearby.upcomingEvents.map(e => e.id),
                    },
                  },
                },
              },
              {
                TradespotsNearBy: {
                  some: {
                    id: {
                      in: nearby.tradespots.map(e => e.id),
                    },
                  },
                },
              },
            ],
          },
        },
      };
    } else if (searchParams.onlyShowNearbyCards === 'shops') {
      searchExpression['userCards'] = {
        some: {
          user: {
            ShopsNearBy: {
              some: {
                id: {
                  in: nearby.shops.map(s => s.id),
                },
              },
            },
          },
        },
      };
    } else if (searchParams.onlyShowNearbyCards === 'events') {
      searchExpression['userCards'] = {
        some: {
          user: {
            EventAttendees: {
              some: {
                id: {
                  in: nearby.upcomingEvents.map(e => e.id),
                },
              },
            },
          },
        },
      };
    } else if (searchParams.onlyShowNearbyCards === 'spots') {
      searchExpression['userCards'] = {
        some: {
          user: {
            TradespotsNearBy: {
              some: {
                id: {
                  in: nearby.tradespots.map(e => e.id),
                },
              },
            },
          },
        },
      };
    }
  }

  return searchExpression;
};

export const isNearbySearchparams = (searchParams: string | boolean): searchParams is NearbySearchParams => {
  if (searchParams === 'true') return true;
  return ['shops', 'events', 'spots', 'all', 'true', true].includes(searchParams as NearbySearchParams);
};
