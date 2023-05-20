import { IIdentityToken } from '@evo/iso/common';
import { identityTokenKey } from '@evo/iso/common';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

export const IdentityToken = createParamDecorator(function (
  _data: any,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest();

  return request[identityTokenKey]
    ? (jsonwebtoken.decode(request[identityTokenKey]) as IIdentityToken)
    : {};
});
