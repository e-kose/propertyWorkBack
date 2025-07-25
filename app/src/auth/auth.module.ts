import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './stratagies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratagies/jwt.strategy';
import refreshJwtConfig from './config/refreshJwt.config';
import { RefreshJwtStrategy } from './stratagies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, RefreshJwtStrategy,
    // {
    //   provide : APP_GUARD,
    //   useClass : JwtAuthGuard
    // },
    // {
    //   provide : APP_GUARD,
    //   useClass:RolesGuard
    // }
  ],
})
export class AuthModule {}
