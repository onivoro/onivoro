import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthMfaDto } from '../dtos/auth-mfa.dto';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { AuthTokensDto } from '../dtos/auth-tokens.dto';
import { AccessToken } from '../decorators/access-token.decorator';

@Controller('auth')
export class AuthController {
  mfaMap = new Map();
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({type: AuthCredentialsDto})
  @ApiResponse({ type: AuthTokensDto })
  async login(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      const {result}: any = await this.authService.authenticateUser(
        authenticateRequest
      );

      const response: AuthTokensDto = {
        token: result?.accessToken?.jwtToken,
        idToken: result?.idToken?.jwtToken
      };

      return response;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('authenticate')
  @ApiBody({ type: AuthCredentialsDto })
  async authenticate(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      return await this.authService.authenticateUser(
        authenticateRequest,
        (userData, newUser) => {
          console.log(AuthController.name, 'validating mfa')
          this.mfaMap.set(userData.Username, newUser);
        }
      );
    } catch (e) {
      const cachedUser = this.mfaMap.get(authenticateRequest.name);
      if (cachedUser) {
        this.mfaMap.delete(authenticateRequest.name);
      }
      throw new BadRequestException(e.message);
    }
  }

  @Post('logout')
  async logout(@AccessToken() accessToken: any) {
    try {
      this.authService.logout({ name: accessToken.sub });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('validate-mfa')
  @ApiBody({ type: AuthMfaDto })
  @ApiResponse({ type: AuthTokensDto })
  async validateMfaCode(@Body() { mfa, username }: AuthMfaDto) {
    return new Promise((res, rej) => {
      this.mfaMap.get(username).sendMFACode(mfa, {
        onSuccess: (token) => {
          const payload = {
            username,
            token: token.getAccessToken().getJwtToken(),
            idToken: token.getIdToken().getJwtToken(),
          };
          this.mfaMap.delete(username);
          res(payload);
        },
        onFailure: (err) => {
          rej(err);
        },
      });
    });
  }
}
