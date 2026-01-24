import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common'; // Removi ValidationPipe global para teste
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Controller('auth') // <--- NÃO PODE TER @UseGuards AQUI
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt')) // <--- O Guard fica SÓ AQUI
  test(@Req() req) {
    return { user: req.user };
  }
}