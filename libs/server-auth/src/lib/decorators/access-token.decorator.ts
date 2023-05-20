import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAccessToken } from '@evo/iso/common';
import { accessTokenKey } from '@evo/iso/common';

export const AccessToken = createParamDecorator(function (
  _data: any,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest();

  return request[accessTokenKey]
    ? (request[accessTokenKey] as IAccessToken)
    : {};
});
