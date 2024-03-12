import { IsString, IsNotEmpty, MaxLength, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateTradeRequestDto {
  @IsNotEmpty()
  @IsNumber()
  public toUserId: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  public message: string | undefined;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { each: true })
  @IsNotEmpty()
  @IsArray()
  public wantCards: number[];

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { each: true })
  @IsNotEmpty()
  @IsArray()
  public giveCards: number[];
}
