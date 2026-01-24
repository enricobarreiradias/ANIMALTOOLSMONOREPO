import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../../../../libs/data/src/entities/user.entity'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Injeta o teu repositório de usuários
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // Implementar se fores criar usuários via API (hash da senha aqui)
    return;
  }

  // --- A FUNÇÃO QUE A LIDIANE FALOU PARA MEXER ---
  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string | null> {
    const { email, password } = authCredentialsDto;
    
    // Mudamos o alias de "user" para "u" para evitar erros de SQL
    const user = await this.userRepository.createQueryBuilder("u")
        .addSelect("u.password") 
        .where("u.email = :email", { email })
        .getOne();

    console.log('--- DEBUG LOGIN ---');
    console.log('Email recebido:', email);
    console.log('Usuário encontrado:', user ? 'SIM' : 'NÃO');
    
    if (user) {
        console.log('Senha do Banco:', `"${user.password}"`); // Aspas ajudam a ver espaços em branco
        console.log('Senha Recebida:', `"${password}"`);
    }

    if (user && user.password === password) {
      console.log('✅ SUCESSO! Senhas batem.');
      return user.email;
    } else {
      console.log('❌ FALHA! Senhas não conferem ou usuário null.');
      return null;
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
  // Nota que agora o validateUserPassword devolve o email, não username
  const email = await this.validateUserPassword(authCredentialsDto); 

  if (!email) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  // AQUI estava o erro do "username não existe em JwtPayload"
  // Mudamos para usar a propriedade 'email' que definimos na interface
  const payload: JwtPayload = { email }; 
  
  const accessToken = await this.jwtService.sign(payload);

  return { accessToken };
  }
}