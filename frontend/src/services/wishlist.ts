import { WishList } from '@prisma/client';
import { ExtendedCard } from './set';

export type FullWishlist = { id: number; userId: number; cards: ExtendedCard[] };

export const getWishList = async (): Promise<FullWishlist | undefined> => {
  try {
    const request = await fetch(`/api/wishlist`);
    const wishListsJson = await request.json();
    return wishListsJson.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getWishListById = async (id: string): Promise<FullWishlist | undefined> => {
  try {
    const response = await fetch(`/api/wishlist/${id}`);
    const wishList = await response.json();
    return wishList.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getWishListByUserId = async (userId: number): Promise<FullWishlist | undefined> => {
  try {
    const response = await fetch(`/api/wishlist/user/${userId}`);
    const wishList = await response.json();
    return wishList.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const addCardToWishList = async (cardIdentifier: string): Promise<WishList | undefined> => {
  try {
    const response = await fetch(`/api/wishlist/card/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card: cardIdentifier }),
    });
    const wishList = await response.json();
    return wishList;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const removeCardFromWishList = async (cardIdentifier: string): Promise<WishList | undefined> => {
  try {
    const response = await fetch(`/api/wishlist/card/${cardIdentifier}`, {
      method: 'DELETE',
    });
    const wishList = await response.json();
    return wishList;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
