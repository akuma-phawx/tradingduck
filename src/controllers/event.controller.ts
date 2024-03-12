import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EventService } from '@/services/events.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EventController {
  public event = Container.get(EventService);

  public getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllEventsData = await this.event.findAllEvent();

      res.status(200).json({ data: findAllEventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllEventsByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventType = req.params.type;
      const findAllEventsData = await this.event.findAllEventByType(eventType);

      res.status(200).json({ data: findAllEventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUpcomingEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUpcomingEventsData = await this.event.findAllUpcomingEvent();

      res.status(200).json({ data: findAllUpcomingEventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUpcomingEventsByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventType = req.params.type;
      const findAllUpcomingEventsData = await this.event.findAllUpcomingEventByType(eventType);

      res.status(200).json({ data: findAllUpcomingEventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      const findOneEventData = await this.event.findEventById(eventId);

      res.status(200).json({ data: findOneEventData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getEventByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventName = req.params.name;
      const findOneEventData = await this.event.findEventByName(eventName);

      res.status(200).json({ data: findOneEventData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventData = req.body;
      const createEventData = await this.event.createEvent(eventData);

      res.status(201).json({ data: createEventData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public attendEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      const userId = Number(req.user.id);
      const attendEventData = await this.event.attendEvent(eventId, userId);

      res.status(200).json({ data: attendEventData, message: 'attend' });
    } catch (error) {
      next(error);
    }
  };

  public unattendEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      const userId = Number(req.user.id);
      const unattendEventData = await this.event.unattendEvent(eventId, userId);

      res.status(200).json({ data: unattendEventData, message: 'unattend' });
    } catch (error) {
      next(error);
    }
  };

  public getEventsByAttendee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findEventByAttendeeData = await this.event.findEventsByAttendee(userId);

      res.status(200).json({ data: findEventByAttendeeData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public getUpcomingEventsByAttendee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findUpcomingEventByAttendeeData = await this.event.findUpcomingEventsByAttendee(userId);

      res.status(200).json({ data: findUpcomingEventByAttendeeData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public addShopToEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const addShopToEventData = await this.event.addShopToEvent(eventId, shopId);

      res.status(200).json({ data: addShopToEventData, message: 'add' });
    } catch (error) {
      next(error);
    }
  };

  public removeShopFromEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const removeShopFromEventData = await this.event.removeShopFromEvent(eventId, shopId);

      res.status(200).json({ data: removeShopFromEventData, message: 'remove' });
    } catch (error) {
      next(error);
    }
  };

  public getEventsByShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const findEventByShopData = await this.event.findEventsByShop(shopId);

      res.status(200).json({ data: findEventByShopData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public getUpcomingEventsByShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shopId = Number(req.params.id);
      const findUpcomingEventByShopData = await this.event.findUpcomingEventsByShop(shopId);

      res.status(200).json({ data: findUpcomingEventByShopData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);

      const deleteEventData = await this.event.deleteEvent(eventId);

      res.status(200).json({ data: deleteEventData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
