import { CreateTradespotDto } from './../../../src/dtos/tradespot.dto';
import { Tradespot } from '@prisma/client';

export const getTradespots = async (): Promise<Tradespot[]> => {
  try {
    const response = await fetch(`/api/tradespots`);
    const tradespots = await response.json();
    return tradespots.data;
  } catch (error) {
    return [];
  }
};

export const getTradespotById = async (id: string): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots/${id}`);
    const tradespot = await response.json();
    return tradespot.data;
  } catch (error) {
    return undefined;
  }
};

export const addTradespotToNearBy = async (tradespotId: string): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots/${tradespotId}/nearby`, {
      method: 'POST',
    });
    const tradespot = await response.json();
    return tradespot.data;
  } catch (error) {
    return undefined;
  }
};

export const removeTradespotFromNearBy = async (tradespotId: string): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots/${tradespotId}/nearby`, {
      method: 'DELETE',
    });
    const tradespot = await response.json();
    return tradespot.data;
  } catch (error) {
    return undefined;
  }
};

// admin stuff

export const createTradespot = async (tradespot: CreateTradespotDto): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tradespot),
    });
    const newTradespot = await response.json();
    return newTradespot.data;
  } catch (error) {
    return undefined;
  }
};

export const updateTradespot = async (tradespot: Tradespot): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots/${tradespot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tradespot),
    });
    const updatedTradespot = await response.json();
    return updatedTradespot.data;
  } catch (error) {
    return undefined;
  }
};

export const deleteTradespot = async (tradespotId: string): Promise<Tradespot | undefined> => {
  try {
    const response = await fetch(`/api/tradespots/${tradespotId}`, {
      method: 'DELETE',
    });
    const tradespot = await response.json();
    return tradespot.data;
  } catch (error) {
    return undefined;
  }
};
