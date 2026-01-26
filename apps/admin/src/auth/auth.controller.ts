import { Body, Controller, Post, Get, Patch, Delete, UseGuards, Req, ForbiddenException, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/users')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: any) {
    if (req.user.role !== 'admin') {
        throw new ForbiddenException('Apenas administradores podem ver a lista de usuários.');
    }
    return this.authService.findAll();
  }

  // --- ATUALIZAR USUÁRIO ---
  @Patch('/users/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: any,
      @Req() req: any
  ) {
      if (req.user.role !== 'admin') {
          throw new ForbiddenException('Apenas administradores podem editar usuários.');
      }
      return this.authService.update(id, body);
  }

  // --- REMOVER USUÁRIO ---
  @Delete('/users/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(
      @Param('id', ParseIntPipe) id: number,
      @Req() req: any
  ) {
      if (req.user.role !== 'admin') {
          throw new ForbiddenException('Apenas administradores podem remover usuários.');
      }
      return this.authService.remove(id);
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    return { user: req.user };
  }
}