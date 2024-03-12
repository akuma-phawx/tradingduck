import { Router } from 'express';
import { EventController } from '@/controllers/event.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateEventDto } from '@/dtos/event.dto';
import { AdminAuthMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class EventRoute implements Routes {
  public path = '/events';
  public router = Router();
  public event = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.event.getAllEvents);
    this.router.get(`${this.path}/type/:type`, AuthMiddleware, this.event.getAllEventsByType);
    this.router.get(`${this.path}/upcoming`, AuthMiddleware, this.event.getAllUpcomingEvents);
    this.router.get(`${this.path}/upcoming/type/:type`, AuthMiddleware, this.event.getAllUpcomingEventsByType);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.event.getEventById);
    this.router.get(`${this.path}/:name`, AuthMiddleware, this.event.getEventByName);
    this.router.post(`${this.path}`, AdminAuthMiddleware, ValidationMiddleware(CreateEventDto), this.event.createEvent);
    this.router.delete(`${this.path}/:id`, AdminAuthMiddleware, this.event.deleteEvent);
    this.router.post(`${this.path}/attend/:id`, AuthMiddleware, this.event.attendEvent);
    this.router.post(`${this.path}/unattend/:id`, AuthMiddleware, this.event.unattendEvent);
    this.router.get(`${this.path}/getEventsByAttendee/:id`, AuthMiddleware, this.event.getEventsByAttendee);
    this.router.get(`${this.path}/getEventsByShop/:id`, AuthMiddleware, this.event.getEventsByShop);
    this.router.get(`${this.path}/getUpcomingEventsByAttendee/:id`, AuthMiddleware, this.event.getUpcomingEventsByAttendee);
    this.router.get(`${this.path}/getUpcomingEventsByShop/:id`, AuthMiddleware, this.event.getUpcomingEventsByShop);
    this.router.post(`${this.path}/addShopToEvent/:id/:shopId`, AdminAuthMiddleware, this.event.addShopToEvent);
    this.router.post(`${this.path}/removeShopFromEvent/:id/:shopId`, AdminAuthMiddleware, this.event.removeShopFromEvent);
  }
}
