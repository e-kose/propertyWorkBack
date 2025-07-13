import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/enums/role.enum';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requieredRols = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requieredRols) return true;
    const user = context.switchToHttp().getRequest().user 
    const hasRequieredRole = requieredRols.some((role)=> role === user.role)
    return hasRequieredRole;
  }
}
