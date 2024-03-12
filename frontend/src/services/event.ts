import { Event, EventType } from '@prisma/client';
import { EventWithShopsAndAttendees } from '../../../src/services/events.service';

export const getEvents = async (): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEventsByType = async (type: EventType): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/type/${type}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomingEvents = async (): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/upcoming`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomingEventsByType = async (type: EventType): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/upcoming/type/${type}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEventById = async (id: string): Promise<EventWithShopsAndAttendees | undefined> => {
  try {
    const response = await fetch(`/api/events/${id}`);
    const event = await response.json();
    return event.data;
  } catch (error) {
    return undefined;
  }
};

export const attendEvent = async (id: string): Promise<Event | undefined> => {
  try {
    const response = await fetch(`/api/events/attend/${id}`, {
      method: 'POST',
    });
    const event = await response.json();
    return event.data;
  } catch (error) {
    return undefined;
  }
};

export const unattendEvent = async (id: string): Promise<Event | undefined> => {
  try {
    const response = await fetch(`/api/events/unattend/${id}`, {
      method: 'POST',
    });
    const event = await response.json();
    return event.data;
  } catch (error) {
    return undefined;
  }
};

export const getEventsByAttendee = async (id: string): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/getEventsByAttendee/${id}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEventsByShop = async (id: string): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/getEventsByShop/${id}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomingEventsByAttendee = async (id: number): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/getUpcomingEventsByAttendee/${id}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomingEventsByShop = async (id: string): Promise<EventWithShopsAndAttendees[]> => {
  try {
    const response = await fetch(`/api/events/getUpcomingEventsByShop/${id}`);
    const eventsJson = await response.json();
    return eventsJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// admin only stuff

export const addShopToEvent = async (eventId: string, shopId: string): Promise<Event | undefined> => {
  try {
    const response = await fetch(`/api/events/addShopToEvent/${eventId}/${shopId}`, {
      method: 'POST',
    });
    const event = await response.json();
    return event.data;
  } catch (error) {
    return undefined;
  }
};

export const removeShopFromEvent = async (eventId: string, shopId: string): Promise<Event | undefined> => {
  try {
    const response = await fetch(`/api/events/removeShopFromEvent/${eventId}/${shopId}`, {
      method: 'POST',
    });
    const event = await response.json();
    return event.data;
  } catch (error) {
    return undefined;
  }
};

export const createEvent = async (event: Partial<Event>): Promise<Event | undefined> => {
  try {
    const response = await fetch(`/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const eventJson = await response.json();
    return eventJson.data;
  } catch (error) {
    return undefined;
  }
};
