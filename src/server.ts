import { UserProfileRoute } from './routes/userProfile.route';
import { App } from '@/app';
import { UserRoute } from '@routes/users.route';
import { AuthRoute } from './routes/auth.route';
import { SetRoute } from '@routes/set.route';
import { CardRoute } from '@routes/card.route';
import { UserCardRoute } from './routes/userCard.route';
import { TradeBoxRoute } from './routes/tradeBox.route';
import { WishlistRoute } from './routes/wishlist.route';
import { SearchRoute } from './routes/search.route';
import { TradeRequestRoute } from './routes/tradeRequest.route';
import { EventRoute } from './routes/event.route';
import { RarityRoute } from './routes/rarity.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CountryRoute } from './routes/country.route';
import { StreamerRoute } from './routes/streamer.route';
import { ShopRoute } from './routes/shop.route';
import { TradespotRoute } from './routes/tradespot.route';
import { NearByRoute } from './routes/nearby.route';
import { TwitchRoute } from './routes/twitch.route';
ValidateEnv();

const app = new App([
  new UserRoute(),
  new SetRoute(),
  new CardRoute(),
  new UserCardRoute(),
  new TradeBoxRoute(),
  new WishlistRoute(),
  new TradeRequestRoute(),
  new SearchRoute(),
  new EventRoute(),
  new AuthRoute(),
  new RarityRoute(),
  new CountryRoute(),
  new UserProfileRoute(),
  new StreamerRoute(),
  new ShopRoute(),
  new TradespotRoute(),
  new NearByRoute(),
  new TwitchRoute(),
]);

app.listen();
