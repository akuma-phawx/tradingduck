import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, Max } from 'class-validator';

export class CreateUserCardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public cardId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public condition: string;

  @IsOptional()
  @IsString()
  public userImage: string;

  @IsOptional()
  @IsNumber()
  @Max(10)
  public grade: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  public note: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  public languageCode: string;
}
