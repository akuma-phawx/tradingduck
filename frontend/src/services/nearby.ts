import { Shop, Tradespot } from '@prisma/client';
import { EventWithShopsAndAttendees } from '../../../src/services/events.service';

export interface NearBy {
  shops: Shop[];
  tradespots: Tradespot[];
  upcomingEvents: EventWithShopsAndAttendees[];
}

export const getNearBy = async (): Promise<NearBy> => {
  try {
    const request = await fetch(`/api/nearby`);
    const nearbyJson = await request.json();
    return nearbyJson.data;
  } catch (error) {
    console.error(error);
    return {
      shops: [],
      tradespots: [],
      upcomingEvents: [],
    };
  }
};

export const getNearByByUserId = async (userId: number): Promise<NearBy> => {
  try {
    const request = await fetch(`/api/nearby/${userId}`);
    const nearbyJson = await request.json();
    return nearbyJson.data;
  } catch (error) {
    console.error(error);
    return {
      shops: [],
      tradespots: [],
      upcomingEvents: [],
    };
  }
};

export const isUserNearby = async (otherUserId: number): Promise<boolean> => {
  try {
    const request = await fetch(`/api/nearby/near/${otherUserId}`);
    const nearbyJson = await request.json();
    return nearbyJson.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
