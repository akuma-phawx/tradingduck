import { IsOptional, IsBase64, MaxLength, IsUrl, IsAlphanumeric } from 'class-validator';

export class UserProfileDto {
  @IsAlphanumeric()
  @MaxLength(50)
  public name: string | undefined;

  @IsOptional()
  public fullName?: string | undefined;

  @IsOptional()
  @IsBase64()
  public image?: string | undefined;

  @IsOptional()
  @IsBase64()
  public banner?: string | undefined;

  @IsOptional()
  @MaxLength(2)
  public location?: string | undefined;

  @IsOptional()
  @MaxLength(200)
  public description?: string | undefined;

  @IsOptional()
  @IsUrl()
  public facebook?: string | undefined;

  @IsOptional()
  @IsUrl()
  public twitter?: string | undefined;

  @IsOptional()
  @IsUrl()
  public instagram?: string | undefined;

  @IsOptional()
  @IsUrl()
  public youtube?: string | undefined;

  @IsOptional()
  @IsUrl()
  public twitch?: string | undefined;
}
