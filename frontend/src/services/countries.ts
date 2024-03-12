import { Country } from '@prisma/client';
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`/api/countries`);
    const countries = await response.json();
    return countries.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
