import { PrismaClient, Country } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class CountryService {
  public country = new PrismaClient().country;

  public async findAllCountries(): Promise<Country[]> {
    try {
      const allCountries: Country[] = await this.country.findMany();
      return allCountries;
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Internal Error');
    }
  }
}
