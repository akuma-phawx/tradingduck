import { Card } from '@prisma/client';

export const getCardById = async (id: string): Promise<Card | undefined> => {
  try {
    const response = await fetch(`/api/cards/${id}`);
    const card = await response.json();
    return card.data;
  } catch (error) {
    return undefined;
  }
};

export const getCardByName = async (name: string): Promise<Card | undefined> => {
  try {
    const response = await fetch(`/api/cards/${name}`);
    const card = await response.json();
    return card;
  } catch (error) {
    return undefined;
  }
};
