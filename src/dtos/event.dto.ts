import { IsString, IsNotEmpty, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description: string;

  @IsDateString()
  @IsNotEmpty()
  @MaxLength(200)
  public date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public countryId: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public image: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public eventType: string;
}
