import { Set, Card } from '@prisma/client';

export type ExtendedCard = Card & {
  set: Omit<Set, 'releaseDate' | 'cards'>;
};

export type SetWithCards = Set & {
  cards: ExtendedCard[];
};
export const getSets = async (): Promise<(Set & { _count: { cards: number } })[]> => {
  try {
    const request = await fetch(`/api/sets`);
    const setsJson = await request.json();
    return setsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSetById = async (id: string): Promise<SetWithCards | undefined> => {
  try {
    const response = await fetch(`/api/sets/${id}`);
    const res = await response.json();
    const set = res.data;
    return set;
  } catch (error) {
    return undefined;
  }
};

export const getSetByName = async (name: string): Promise<Set | undefined> => {
  try {
    const response = await fetch(`/api/sets/${name}`);
    const set = await response.json();
    return set;
  } catch (error) {
    return undefined;
  }
};
