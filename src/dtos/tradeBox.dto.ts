import { IsString, IsNotEmpty, MaxLength, IsNumber, IsArray } from 'class-validator';

export class CreateTradeBoxDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { each: true })
  @IsNotEmpty()
  @IsArray()
  public cards: number[];
}
