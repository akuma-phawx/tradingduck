import { PokemonCard } from './Card';

export interface Tradebox {
  id: number;
  img?: string;
  title: string;
  description: string;
  cards: PokemonCard[];
  lastUpdated: string;
}
