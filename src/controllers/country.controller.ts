import { CountryService } from './../services/country.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CountryController {
  public country = Container.get(CountryService);

  public getCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCountriesData = await this.country.findAllCountries();

      res.status(200).json({ data: findAllCountriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
