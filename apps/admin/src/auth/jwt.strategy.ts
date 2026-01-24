import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// CORREÇÃO: Aponta para a tua entidade local
import { User } from '../../../../libs/data/src/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // CORREÇÃO: A chave deve ser IGUAL à que definimos no AuthModule acima
      secretOrKey: process.env.JWT_SECRET || 'chave-secreta-temporaria-123',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // O payload agora traz o email (definimos isso no passo anterior)
    const { email } = payload;
    
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}