import { Rarity } from '@prisma/client';

export const getRarities = async (): Promise<Rarity[]> => {
  try {
    const request = await fetch(`/api/rarities`);
    const raritiesJson = await request.json();
    return raritiesJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
