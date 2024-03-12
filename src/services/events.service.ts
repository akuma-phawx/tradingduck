import { PrismaClient, Event, EventType, Shop } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { CreateEventDto } from '@/dtos/event.dto';

const isEventType = (eventType: string): eventType is EventType => {
  // check if string is a part of the enum
  return Object.values(EventType).includes(eventType as EventType);
};

export type EventWithAttendees = Event & { attendees: { id: number; email: string; userProfile: { name: string; image: string } }[] };
export type EventWithShopsAndAttendees = EventWithAttendees & {
  attendingShops: Shop[];
};

const selectEventWithAttendees = {
  id: true,
  name: true,
  description: true,
  date: true,
  eventType: true,
  location: true,
  countryId: true,
  image: true,
  attendees: {
    select: {
      id: true,
      email: true,
      userProfile: {
        select: {
          name: true,
          image: true,
          location: true,
        },
      },
    },
  },
  attendingShops: true,
};

@Service()
export class EventService {
  public event = new PrismaClient().event;
  public shop = new PrismaClient().shop;

  public async findAllEvent(): Promise<EventWithShopsAndAttendees[]> {
    try {
      const allEvent: EventWithShopsAndAttendees[] = await this.event.findMany({
        select: selectEventWithAttendees,
      });
      return allEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findAllEventByType(eventType: string): Promise<EventWithShopsAndAttendees[]> {
    try {
      const allEvent: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { eventType: eventType as EventType },
        select: selectEventWithAttendees,
      });
      return allEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findAllUpcomingEvent(): Promise<EventWithShopsAndAttendees[]> {
    try {
      const allEvent: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { date: { gt: new Date() } },
        select: selectEventWithAttendees,
      });
      return allEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findAllUpcomingEventByType(eventType: string): Promise<EventWithShopsAndAttendees[]> {
    try {
      const allEvent: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { date: { gt: new Date() }, eventType: eventType as EventType },
        select: selectEventWithAttendees,
      });
      return allEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findEventById(eventId: number): Promise<EventWithShopsAndAttendees> {
    try {
      const findEvent: EventWithShopsAndAttendees = await this.event.findUnique({
        where: { id: eventId },
        select: selectEventWithAttendees,
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");

      return findEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findEventByName(eventName: string): Promise<EventWithShopsAndAttendees> {
    try {
      const findEvent: EventWithShopsAndAttendees = await this.event.findFirst({
        where: { name: eventName },
        select: selectEventWithAttendees,
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");

      return findEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async createEvent(event: CreateEventDto): Promise<Event> {
    try {
      if (!isEventType(event.eventType)) throw new HttpException(409, "Event Type doesn't exist");

      // we us ts-ignore because ts does not understand that we check if eventType is a part of the enum
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const createEvent: Event = await this.event.create({ data: event });
      return createEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async attendEvent(eventId: number, userId: number): Promise<Event> {
    try {
      const findEvent: Event = await this.event.findUnique({
        where: { id: eventId },
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");
      if (findEvent.date < new Date()) throw new HttpException(409, 'Event is in the past');

      const updateEvent: Event = await this.event.update({
        where: { id: eventId },
        data: { attendees: { connect: { id: userId } } },
      });
      return updateEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async unattendEvent(eventId: number, userId: number): Promise<Event> {
    try {
      const findEvent: Event = await this.event.findUnique({
        where: { id: eventId },
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");

      const updateEvent: Event = await this.event.update({
        where: { id: eventId },
        data: { attendees: { disconnect: { id: userId } } },
      });
      return updateEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async addShopToEvent(eventId: number, shopId: number): Promise<Event> {
    try {
      const findEvent: Event = await this.event.findUnique({
        where: { id: eventId },
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");

      const findShop: Shop = await this.shop.findUnique({
        where: { id: shopId },
      });
      if (!findShop) throw new HttpException(409, "Shop doesn't exist");

      const updateEvent: Event = await this.event.update({
        where: { id: eventId },
        data: { attendingShops: { connect: { id: findShop.id } } },
      });
      return updateEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async removeShopFromEvent(eventId: number, shopId: number): Promise<Event> {
    try {
      const findEvent: Event = await this.event.findUnique({
        where: { id: eventId },
      });
      if (!findEvent) throw new HttpException(409, "Event doesn't exist");

      const findShop: Shop = await this.shop.findUnique({
        where: { id: shopId },
      });
      if (!findShop) throw new HttpException(409, "Shop doesn't exist");

      const updateEvent: Event = await this.event.update({
        where: { id: eventId },
        data: { attendingShops: { disconnect: { id: findShop.id } } },
      });
      return updateEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findEventsByAttendee(userId: number): Promise<EventWithShopsAndAttendees[]> {
    try {
      const findEvents: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { attendees: { some: { id: userId } } },
        select: selectEventWithAttendees,
      });
      return findEvents;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findUpcomingEventsByAttendee(userId: number): Promise<EventWithShopsAndAttendees[]> {
    try {
      const findEvents: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { date: { gt: new Date() }, attendees: { some: { id: userId } } },
        select: selectEventWithAttendees,
      });
      return findEvents;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findEventsByShop(shopId: number): Promise<EventWithShopsAndAttendees[]> {
    try {
      const findEvents: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { attendingShops: { some: { id: shopId } } },
        select: selectEventWithAttendees,
      });
      return findEvents;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async findUpcomingEventsByShop(shopId: number): Promise<EventWithShopsAndAttendees[]> {
    try {
      const findEvents: EventWithShopsAndAttendees[] = await this.event.findMany({
        where: { date: { gt: new Date() }, attendingShops: { some: { id: shopId } } },
        select: selectEventWithAttendees,
      });
      return findEvents;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async deleteEvent(eventId: number): Promise<Event> {
    try {
      const deleteEvent: Event = await this.event.delete({
        where: { id: eventId },
      });
      return deleteEvent;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
