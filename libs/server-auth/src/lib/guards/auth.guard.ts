import { accessTokenKey } from '@evo/iso/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const hasToken = !!(request[accessTokenKey]);
    if(!hasToken) {
      console.warn(`${AuthGuard.name}: token missing`);
    }
    return hasToken;
  }
}
