import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
// CORREÇÃO: Importa a TUA entidade User, e não a da biblioteca externa
import { User } from '../../../../libs/data/src/entities/user.entity';

@Module({
  imports: [
    // CORREÇÃO: Usa a tua tabela de usuários
    TypeOrmModule.forFeature([User]), 
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // CORREÇÃO: Configura o JWT aqui mesmo, sem depender de arquivos externos
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'chave-secreta-temporaria-123', 
      signOptions: {
        expiresIn: '7d', // Token expira em 7 dias
      },
    }),
    
    // REMOVIDO: MainCacheModule (Não tens Redis configurado ainda)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}