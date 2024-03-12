import { Card } from '@prisma/client';
export interface Wishlist {
  id: number;
  name: string;
  cards: Card[];
  lastUpdated: string;
}
