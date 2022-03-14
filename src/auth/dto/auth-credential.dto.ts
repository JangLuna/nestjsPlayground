import { IsAlphanumeric, IsByteLength, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  @IsAlphanumeric()
  password: string;
}
