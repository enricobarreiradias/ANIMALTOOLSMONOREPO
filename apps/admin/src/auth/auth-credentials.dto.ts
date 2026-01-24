import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  // Troca de @IsString() username para:
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;
}