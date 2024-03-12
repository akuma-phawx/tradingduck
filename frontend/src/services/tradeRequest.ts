import { CreateTradeRequestDto } from './../../../src/dtos/tradeRequest.dto';
import { TradeRequest, TradeStatus, UserProfile, TradeRequestMessage } from '@prisma/client';
import { FullUsercard } from './userCard';

export type FullTradeRequest = TradeRequest & {
  sendUser: {
    id: number;
    email: string;
    userProfile: UserProfile;
  };
  incUser: {
    id: number;
    email: string;
    userProfile: UserProfile;
  };
  tradeStatus: TradeStatus;
  wantCards: FullUsercard[];
  giveCards: FullUsercard[];
  messages: TradeRequestMessage[];
};

export const getAllSentTradeRequests = async (): Promise<FullTradeRequest[]> => {
  try {
    const request = await fetch(`/api/tradeRequests/send`);
    const tradeRequestsJson = await request.json();
    return tradeRequestsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllIncomingTradeRequests = async (): Promise<FullTradeRequest[]> => {
  try {
    const request = await fetch(`/api/tradeRequests/inc`);
    const tradeRequestsJson = await request.json();
    return tradeRequestsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTradeRequestById = async (id: string): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}`);
    const traderequest = await response.json();
    return traderequest.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createTradeRequest = async (data: CreateTradeRequestDto): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    });
    const traderequest = await response.json();
    return traderequest.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const acceptTradeRequest = async (id: number): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/accept/`);
    const traderequest = await response.json();
    return traderequest;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const declineTradeRequest = async (id: number): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/decline`);
    const traderequest = await response.json();
    return traderequest;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const cancelTradeRequest = async (id: number): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/cancel`);
    const traderequest = await response.json();
    return traderequest;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const completeTradeRequest = async (id: number): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/complete`);
    const traderequest = await response.json();
    return traderequest;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const addMessageToTradeRequest = async (id: number, message: string): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const traderequest = await response.json();
    return traderequest.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getMessagesFromTradeRequest = async (id: number): Promise<TradeRequestMessage[] | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}/messages`);
    const traderequest = await response.json();
    return traderequest.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const deleteTradeRequest = async (id: number): Promise<FullTradeRequest | undefined> => {
  try {
    const response = await fetch(`/api/tradeRequests/${id}`, {
      method: 'DELETE',
    });
    const traderequest = await response.json();
    return traderequest;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
