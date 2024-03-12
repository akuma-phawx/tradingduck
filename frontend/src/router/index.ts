import { amILoggedIn } from '@/services/auth';
import { createRouter, createWebHistory, NavigationGuard, Router } from 'vue-router';
import { hideSidebar } from '@/utils/togglers';
import { useUserStore } from '@/stores/userStore.ts';

//App
const AppLayout = () => import('@/layout/AppLayout.vue');
const Index = () => import('@/pages/home/Index.vue');
const Tac = () => import('@/pages/home/Tac.vue');
const PrivacyPolicy = () => import('@/pages/PrivacyPolicy.vue');
const CookiesPolicy = () => import('@/pages/CookiesPolicy.vue');
const PokemonCopyright = () => import('@/pages/PokemonCopyright.vue');
const Imprint = () => import('@/pages/Imprint.vue');
const AboutUs = () => import('@/pages/auth/additional/AboutUs.vue');
const ContactUs = () => import('@/pages/auth/additional/ContactUs.vue');
const HowTo = () => import('@/pages/auth/additional/HowTo.vue');
const CurrentVersion = () => import('@/pages/auth/additional/CurrentVersion.vue');
const Verify = () => import('@/pages/Verify.vue');
//Dashboard
const Dashboard = () => import('@/pages/auth/dashboard/Index.vue');
// Cards
const Cards = () => import('@/pages/auth/pokemon/cards/CardsOverview.vue');
const CardDetails = () => import('@/pages/auth/pokemon/cards/CardDetails.vue');
// Sets
const Sets = () => import('@/pages/auth/pokemon/sets/SetsOverview.vue');
const SetDetails = () => import('@/pages/auth/pokemon/sets/SetDetails.vue');
// Tradebox
const TradeboxOverview = () => import('@/pages/auth/tradebox/TradeboxOverview.vue');
const TradeboxDetails = () => import('@/pages/auth/tradebox/TradeboxDetails.vue');
const TradeboxCreate = () => import('@/pages/auth/tradebox/TradeboxCreate.vue');
//Wishlist
const Wishlist = () => import('@/pages/auth/wishlist/Wishlist.vue');
//Events
const Events = () => import('@/pages/auth/event/Events.vue');
const EventDetails = () => import('@/pages/auth/event/EventDetails.vue');
const EventCreate = () => import('@/pages/auth/event/EventCreate.vue');
//Additional
const Policy = () => import('@/pages/auth/additional/TradingPolicy.vue');
const SafetyMeasures = () => import('@/pages/auth/additional/SafetyMeasures.vue');
const AuthenticityGuide = () => import('@/pages/auth/additional/AuthenticityGuide.vue');
const TradeTips = () => import('@/pages/auth/additional/TradeTips.vue');
//Trades
const TradesOverview = () => import('@/pages/auth/trades/TradesOverview.vue');
const TradeDetails = () => import('@/pages/auth/trades/details/TradeDetails.vue');
const TradeRequest = () => import('@/pages/auth/trades/request/TradeRequest.vue');
// Usercard
const UsercardDetails = () => import('@/pages/auth/usercard/UsercardDetails.vue');
//User(s)
const UserSettings = () => import('@/pages/auth/users/UserSettings.vue');
const PrivateProfile = () => import('@/pages/auth/users/PrivateProfile.vue');
const PublicProfile = () => import('@/pages/auth/users/PublicProfile.vue');
// Commercial
const Shops = () => import('@/pages/auth/commercial/Shops.vue');
const ShopCreate = () => import('@/pages/auth/commercial/ShopCreate.vue');
const Streams = () => import('@/pages/auth/commercial/Streams.vue');
const Tradespots = () => import('@/pages/auth/commercial/Tradespots.vue');
//Error
const Page404 = () => import('@/pages/error/NotFound.vue');
//Admin
const AdminDashboard = () => import('@/pages/admin/AdminDashboard.vue');

const adminGuard: NavigationGuard = async (to, _from, next) => {
  const userStore = useUserStore();
  if (userStore?.userProfile?.type === 'ADMIN') {
    next();
  } else {
    next({ path: '/app' });
  }
};

const allowedPaths = ['/log-in', '/sign-up', '/privacy-policy', '/tradingduck-tac'];

const redirectGuard: NavigationGuard = async (to, _from, next) => {
  if (allowedPaths.includes(to.path)) {
    return next();
  }
  const logInInfo = await amILoggedIn();
  if (logInInfo) {
    next({ path: '/app' });
  } else {
    next();
  }
};

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: Index,
      beforeEnter: redirectGuard,
    },
    {
      path: '/reset-password',
      children: [
        {
          path: ':token',
          component: Index,
        },
      ],
    },
    {
      path: '/verify',
      children: [
        {
          path: ':token',
          component: Verify,
        },
      ],
    },
    {
      path: '/tradingduck-tac',
      component: Tac,
      beforeEnter: redirectGuard,
    },
    {
      path: '/privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/imprint',
      component: Imprint,
    },
    {
      path: '/cookie-policy',
      component: CookiesPolicy,
    },
    {
      path: '/pokemon-copyright',
      component: PokemonCopyright,
    },
    // App
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: '',
          component: Dashboard,
        },
        {
          path: 'version',
          component: CurrentVersion,
        },
        {
          path: 'howto',
          component: HowTo,
        },
        {
          path: 'about-us',
          component: AboutUs,
        },
        {
          path: 'contact',
          component: ContactUs,
        },
        {
          path: 'admin',
          beforeEnter: adminGuard,
          component: AdminDashboard,
        },
        {
          path: 'streams',
          component: Streams,
        },
        {
          path: 'tradespots',
          component: Tradespots,
        },
        {
          path: 'usercard/:id',
          component: UsercardDetails,
        },
        {
          path: 'cards',
          children: [
            { path: '', component: Cards },
            { path: ':id', component: CardDetails },
          ],
        },
        {
          path: 'shops',
          children: [
            { path: '', component: Shops },
            { path: 'create', component: ShopCreate },
          ],
        },
        {
          path: 'sets',
          children: [
            { path: '', component: Sets },
            { path: ':id', component: SetDetails },
          ],
        },
        {
          path: 'tradebox',
          children: [
            { path: '', component: TradeboxOverview },
            { path: 'create', component: TradeboxCreate },
            { path: ':id', component: TradeboxDetails },
          ],
        },
        {
          path: 'events',
          children: [
            { path: '', component: Events },
            { path: 'create', component: EventCreate },
            { path: ':id', component: EventDetails },
          ],
        },
        { path: 'wishlist', component: Wishlist },
        { path: 'settings', component: UserSettings },
        {
          path: 'trades',
          children: [
            { path: '', component: TradesOverview },
            { path: ':id', component: TradeDetails },
          ],
        },
        {
          path: 'trade/:user',
          component: TradeRequest,
        },
        { path: 'policy', component: Policy },
        {
          path: 'safety-measures',
          component: SafetyMeasures,
        },
        {
          path: 'authenticity-guide',
          component: AuthenticityGuide,
        },
        { path: 'trade-tips', component: TradeTips },

        {
          path: 'profile',
          component: PrivateProfile,
        },
        {
          path: 'user/:id',
          component: PublicProfile,
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: Page404,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (window.innerWidth <= 1200) {
    hideSidebar();
  }
  next();
});
export default router;
