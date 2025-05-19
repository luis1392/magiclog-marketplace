import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { EXEC_ROLES } from 'src/common/decorators/role-protected/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  //reflector is used to get metadata from the route handler
  //in this case, we are using it to get the roles metadata and if the user has the required roles to access the route

  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles: string[] = this.reflector.get<string[]>(
      EXEC_ROLES,
      context.getHandler(),
    );

    if (!requiredRoles) return true;
    if (requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    //console.log('user', user);
    //console.log('requiredRoles', requiredRoles);
    if (!user) {
      throw new InternalServerErrorException('User not found in request');
    }

    for (const role of user.roles) {
      if (requiredRoles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException('User does not have the required roles');
  }
}
