import { PaginationParams, PaginationResponse } from './../../../src/utils/pagination';
import { UserCard } from '@prisma/client';
import { FullCard } from '../../../src/services/search.service';

export type FullUsercard = UserCard & {
  card: FullCard;
  user: { id: number; isVerified: boolean; userProfile: { name: string; image: string; location?: { logo: string; name: string; code: string } } };
};

export const getUsercards = async (): Promise<UserCard[]> => {
  try {
    const request = await fetch(`/api/usercards`);
    const usercardsJson = await request.json();
    return usercardsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserCardById = async (id: string): Promise<UserCard | undefined> => {
  try {
    const response = await fetch(`/api/usercards/${id}`);
    const userCard = await response.json();
    return userCard.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createUsercard = async (
  cardId: string,
  condition: string,
  image?: string,
  grade?: number,
  language?: string,
  note?: string,
): Promise<UserCard | undefined> => {
  try {
    const response = await fetch(`/api/usercards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(image && { userImage: image }),
        ...(grade && { grade: grade }),
        ...(language && { language: language }),
        ...(note && { note: note }),
        cardId,
        languageCode: language,
        condition,
      }),
    });
    const userCard = await response.json();
    return userCard.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const updateUsercard = async (
  cardId: number,
  condition?: string,
  image?: string,
  grade?: number,
  languageCode?: string,
  note?: string,
): Promise<UserCard | undefined> => {
  try {
    const response = await fetch(`/api/usercards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(image && { userImage: image }),
        ...(grade && { grade: grade }),
        ...(languageCode && { languageCode: languageCode }),
        ...(note && { note: note }),
        ...(condition && { condition: condition }),
      }),
    });
    const userCard = await response.json();
    return userCard;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getUserCardsByCardId = async (cardId: string, paginationParams: PaginationParams): Promise<PaginationResponse<FullUsercard[]>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await fetch(`/api/usercards/card/${cardId}?${new URLSearchParams({ ...(paginationParams as any) }).toString()}`);
    const userCards = await response.json();
    return userCards.data;
  } catch (error) {
    console.error(error);
    return { result: [], total: 0 };
  }
};

export const deleteUsercard = async (id: string): Promise<UserCard | undefined> => {
  try {
    const response = await fetch(`/api/usercards/${id}`, {
      method: 'DELETE',
    });
    const userCard = await response.json();
    return userCard;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
