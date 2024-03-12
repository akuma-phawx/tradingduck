import { PaginationParams, PaginationResponse } from './../../../src/utils/pagination';
import { Card, Set } from '@prisma/client';
import { FullCard } from '../../../src/services/search.service';

export type NearbySearchParams = 'shops' | 'events' | 'spots' | 'all' | true | undefined;

export interface CardSearchParams {
  name?: string;
  rarity?: string;
  type?: string;
  setId?: string;
  onlyShowTradedCards?: boolean;
  onlyShowNearbyCards?: NearbySearchParams;
}

export const searchCards = async (searchParams: CardSearchParams, paginationParams: PaginationParams): Promise<PaginationResponse<FullCard[]>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request = await fetch(`/api/search/cards?${new URLSearchParams({ ...(searchParams as any), ...(paginationParams as any) }).toString()}`);
    const cardsJson = await request.json();
    return cardsJson.data;
  } catch (error) {
    console.error(error);
    return { result: [], total: 0 };
  }
};

export type FullSet = Set & { cards: Card[]; _count: { cards: number } };

export const searchSets = async (searchTerm: string): Promise<FullSet[]> => {
  try {
    const request = await fetch(`/api/search/sets/${searchTerm}`);
    const setsJson = await request.json();
    return setsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
