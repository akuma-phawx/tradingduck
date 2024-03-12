import countries from '../../../countries.json';
import languages from '../../../languages.json';
import { Language } from '@prisma/client';
// Card
export function getCardLanguages(): Language[] {
  return languages;
}

export function getCardGrades(): string[] {
  return ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '-'];
}

export function getCardConditions(): string[] {
  return ['MINT', 'NEAR_MINT', 'EXCELLENT', 'GOOD', 'LIGHT_PLAYED', 'PLAYED', 'POOR'];
}

export function getConditionText(condition: string): string {
  switch (condition) {
    case 'NEAR_MINT':
      return 'NEAR MINT';
    case 'LIGHT_PLAYED':
      return 'LIGHT PLAYED';
    default:
      return condition;
  }
}

export function getConditionColor(condition: string): string {
  switch (condition) {
    case 'MINT':
      return 'green';
    case 'NEAR_MINT':
      return 'lime-darken-3';
    case 'EXCELLENT':
      return 'teal';
    case 'GOOD':
      return 'indigo';
    case 'LIGHT_PLAYED':
      return 'amber';
    case 'PLAYED':
      return 'orange';
    default:
      return 'dark';
  }
}

export function getGradeColor(condition?: number | null): string {
  switch (condition) {
    case 10:
      return 'green';
    case 9:
    case 8:
      return 'lime-darken-3';
    case 7:
    case 6:
      return 'teal';
    case 5:
    case 4:
      return 'indigo';
    case 3:
    case 2:
      return 'amber';
    case 1:
      return 'orange';
    default:
      return 'dark';
  }
}
// Trade
export function getTradeColor(condition: string): string {
  switch (condition) {
    case 'pending':
      return 'orange';
    case 'cancelled':
      return 'dark';
    case 'accepted':
      return 'purple';
    case 'rejected':
      return 'red';
    case 'completed':
      return 'green';
    case 'completed-sender':
      return 'light-green';
    case 'completed-receiver':
      return 'light-green';
    default:
      return 'gray';
  }
}

// Events
export function getEventTypeText(type: string): string {
  switch (type) {
    case 'CONFERENCE':
      return 'Conference';
    case 'RELEASE':
      return 'Release';
    case 'TOURNAMENT':
      return 'Tournament';
    case 'MEETUP':
      return 'Meetup';
    case 'OTHER':
      return 'Other';
    default:
      return type;
  }
}
export function getEventTypeColor(type: string): string {
  switch (type) {
    case 'CONFERENCE':
      return 'pink';
    case 'RELEASE':
      return 'green';
    case 'TOURNAMENT':
      return 'blue';
    case 'MEETUP':
      return 'indigo';
    default:
      return 'dark';
  }
}
export function getEventTypeIcon(type: string): string {
  switch (type) {
    case 'CONFERENCE':
      return 'mdi-ticket';
    case 'RELEASE':
      return 'mdi-new-box';
    case 'TOURNAMENT':
      return 'mdi-trophy';
    case 'MEETUP':
      return 'mdi-human-greeting-proximity';
    case 'OTHER':
      return 'mdi-alpha-o-box-outline';
    default:
      return 'dark';
  }
}
interface EventSelector {
  title: string;
  value: string;
}

export function getEventTypes(): EventSelector[] {
  return [
    {
      title: 'Conference',
      value: 'CONFERENCE',
    },
    {
      title: 'Release',
      value: 'RELEASE',
    },
    {
      title: 'Meetup',
      value: 'MEETUP',
    },
    {
      title: 'Tournament',
      value: 'TOURNAMENT',
    },
    {
      title: 'Other',
      value: 'OTHER',
    },
  ];
}
// User
export function getUserIsVerifiedColor(isVerified: boolean): string {
  return isVerified ? 'blue' : 'red';
}
export function getUserIsVerifiedText(isVerified: boolean): string {
  return isVerified ? 'Verified' : 'Not Verified';
}
export function getUserIsVerifiedIcon(isVerified: boolean): string {
  return isVerified ? 'mdi-check-decagram' : 'mdi-alert-decagram';
}
// Admin
export function getUserTypeColor(type: string): string {
  switch (type) {
    case 'USER':
      return 'blue';
    case 'ADMIN':
      return 'primary';
    default:
      return 'dark';
  }
}
export function getStatusColor(status: boolean): string {
  return status ? 'green' : 'red';
}
export function getStatusText(status: boolean): string {
  return status ? 'YES' : 'NO';
}

export function getAdminUserText(userType: string): string {
  switch (userType) {
    case 'USER':
      return 'User';
    case 'ADMIN':
      return 'Admin';
    default:
      return 'All';
  }
}

export function getCountryName(code: string): string {
  const country = countries.find(country => {
    return country.code === code;
  });
  return country?.name ?? 'All';
}

export function getBreadcrumbsTitle(segment: string): string {
  switch (segment) {
    case 'app':
      return 'Dashboard';
    case 'trades':
      return 'My Trades';
    case 'tradespots':
      return 'Tradespots';
    case 'tradebox':
      return 'My Tradeboxes';
    case 'wishlist':
      return 'My Wishlist';
    case 'cards':
      return 'Pokémon Cards';
    case 'sets':
      return 'Pokémon Sets';
    case 'events':
      return 'Events';
    case 'shops':
      return 'Retail Shops';
    case 'streams':
      return 'Streams';
    case 'howto':
      return 'Platform Guide';
    case 'version':
      return 'Platform Version';
    case 'contact':
      return 'Contact Us';
    case 'about-us':
      return 'About Us';
    case 'user':
      return 'User Profile';
    case 'settings':
      return 'Account Settings';
    case 'profile':
      return 'Personal Profile';
    case 'policy':
      return 'Trading Policy';
    case 'safety-measures':
      return 'Safety Measures';
    case 'trade-tips':
      return 'Trade Tips';
    case 'authenticity-guide':
      return 'Authenticity Guide';
    default:
      return segment;
  }
}

export function getLanugageFlagId(language: string): string {
  return language.startsWith('gb-') ? 'gb' : language;
}
