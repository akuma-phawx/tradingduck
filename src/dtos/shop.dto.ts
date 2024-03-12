import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public url: string;

  @IsString()
  @IsNotEmpty()
  public logo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  public countryId: string;
}
