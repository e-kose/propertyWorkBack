import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decerator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    console.log('login1');
    return this.authService.login(req.user.id);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  refresh(@Req() req) {
    return this.authService.refresh(req.user.id);
  }

  @Post('signOut')
  @UseGuards(JwtAuthGuard)
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }
}
