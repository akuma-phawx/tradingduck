import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTradeRequestMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  public message: string | undefined;
}
