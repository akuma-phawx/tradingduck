import { TradeBox, UserCard } from '@prisma/client';

export type FullTradeBox = TradeBox & {
  cards: UserCard[];
};

export type TradeBoxWithCardCount = TradeBox & {
  _count: {
    cards: number;
  };
};

export const getTradeboxes = async (): Promise<TradeBoxWithCardCount[]> => {
  try {
    const request = await fetch(`/api/tradeboxes`);
    const tradeboxesJson = await request.json();
    return tradeboxesJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTradeBoxById = async (id: number): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/${id}`);
    const tradeBox = await response.json();
    return tradeBox.data;
  } catch (error) {
    return undefined;
  }
};

export const getTradeboxesByUser = async (userId: number): Promise<TradeBoxWithCardCount[]> => {
  try {
    const request = await fetch(`/api/tradeboxes/user/${userId}`);
    const tradeboxesJson = await request.json();
    return tradeboxesJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTradeBox = async (name: string, description: string, cards: number[]): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, cards }),
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};

export const renameTradeBox = async (id: string, name: string): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/name/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};

export const changeTradeBoxDescription = async (id: string, description: string): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/description/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};

export const addCardToTradeBox = async (id: number, cardId: number): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/cards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId }),
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};

export const removeCardFromTradeBox = async (id: number, cardId: number): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/cards/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId }),
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};

export const deleteTradeBox = async (id: string): Promise<FullTradeBox | undefined> => {
  try {
    const response = await fetch(`/api/tradeboxes/${id}`, {
      method: 'DELETE',
    });
    const tradeBox = await response.json();
    return tradeBox;
  } catch (error) {
    return undefined;
  }
};
