import { Shop, Tradespot } from '@prisma/client';
import { Service, Container } from 'typedi';
import { ShopService } from './../services/shop.service';
import { HttpException } from '@/exceptions/httpException';
import { TradespotService } from './tradespot.service';
import { EventService, EventWithShopsAndAttendees } from './events.service';

export interface NearBy {
  shops: Shop[];
  tradespots: Tradespot[];
  upcomingEvents: EventWithShopsAndAttendees[];
}

@Service()
export class NearByService {
  public shop = Container.get(ShopService);
  public tradespot = Container.get(TradespotService);
  public event = Container.get(EventService);

  public async getNearby(userId: number): Promise<NearBy> {
    try {
      const shops = await this.shop.findShopsNearBy(userId);
      const tradespots = await this.tradespot.findTradespotsNearBy(userId);
      const upcomingEvents = await this.event.findUpcomingEventsByAttendee(userId);
      return { shops, tradespots, upcomingEvents };
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }

  public async isUserNearby(userId: number, otherUserId: number): Promise<boolean> {
    try {
      const userNearBy = await this.getNearby(userId);
      const otherUserNearBy = await this.getNearby(otherUserId);
      const userShops = userNearBy.shops.map(shop => shop.id);
      const otherUserShops = otherUserNearBy.shops.map(shop => shop.id);
      const userTradespots = userNearBy.tradespots.map(tradespot => tradespot.id);
      const otherUserTradespots = otherUserNearBy.tradespots.map(tradespot => tradespot.id);
      const userEvents = userNearBy.upcomingEvents.map(event => event.id);
      const otherUserEvents = otherUserNearBy.upcomingEvents.map(event => event.id);
      const userNearByOtherUser =
        userShops.some(shop => otherUserShops.includes(shop)) ||
        userTradespots.some(tradespot => otherUserTradespots.includes(tradespot)) ||
        userEvents.some(event => otherUserEvents.includes(event));
      return userNearByOtherUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
