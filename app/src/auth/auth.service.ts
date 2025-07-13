import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('ValidateUSer 1 de');
    const user = await this.userService.findByMail(email);
    if (!user) throw new UnauthorizedException('User Not Found');
    const isMatchPassword = await compare(password, user.password);
    if (!isMatchPassword) throw new UnauthorizedException('Invalid creditanls');
    console.log('ValidateUSer 2 de');
    return { id: user.id };
  }

  async login(userId: number) {
    console.log('login');
    const { accesToken, refreshToken } = await this.generateToken(userId);
    const hashedRefreshedToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(
      userId,
      hashedRefreshedToken,
    );
    return { id: userId, accesToken, refreshToken };
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, this.refreshTokenConfig),
    ]);
    return { accesToken, refreshToken };
  }

  async refresh(userId: number) {
    const { accesToken, refreshToken } = await this.generateToken(userId);
    const hashedRefreshedToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(
      userId,
      hashedRefreshedToken,
    );
    return { id: userId, accesToken, refreshToken };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshedToken)
      throw new UnauthorizedException('Ivalid refresh token');
    const matchedToken = argon2.verify(user.hashedRefreshedToken, refreshToken);
    if (!matchedToken) throw new UnauthorizedException('Ivalid refresh token');
    return { id: userId };
  }
  
  async validateJwtUser(userId: number){
    const user = await this.userService.findOne(userId);
    if(!user) throw new UnauthorizedException("User not found");
    const currentUser : CurrentUser = {id: userId, role: user.role};
    return currentUser ;
  }

  async signOut(userId: number) {
    return this.userService.updateHashedRefreshToken(userId, '');
  }
}
