import { Injectable, InternalServerErrorException, OnModuleInit, BadRequestException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { getPublicKeys } from '../functions/get-public-keys.function';
import { validateToken } from '../functions/validate-token.function';
import * as jsonwebtoken from 'jsonwebtoken';
import { IAuthCredentialsDto, IMapOfKidToPublicKey } from '../interfaces/auth.interface';
import { AuthConfig } from '../classes/auth-config.class';
import { AuthService } from './auth.service';
import { AuthTokensDto } from '../dtos/auth-tokens.dto';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

@Injectable()
export class MfaAuthService implements OnModuleInit {
  mfaMap = new Map();
  private authConfig: {
    UserPoolId: string;
    ClientId: string;
    region: string;
  };

  private keys: IMapOfKidToPublicKey;

  constructor(private config: AuthConfig, private authService: AuthService) {

    this.authConfig = {
      UserPoolId: this.config.AWS_COGNITO_USER_POOL_ID,
      ClientId: this.config.AWS_COGNITO_CLIENT_ID,
      region: this.config.AWS_REGION,
    };
  }

  async onModuleInit() {
    const { AWS_REGION, AWS_COGNITO_USER_POOL_ID } = this.config;
    const cognitoIssuer = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`;

    this.keys = await getPublicKeys(cognitoIssuer);
  }

  get poolData() {
    return {
      UserPoolId: this.authConfig.UserPoolId,
      ClientId: this.authConfig.ClientId,
    };
  }

  get userPool() {
    return new CognitoUserPool({
      UserPoolId: this.authConfig.UserPoolId,
      ClientId: this.authConfig.ClientId,
    });
  }

  async login(authenticateRequest: AuthCredentialsDto) {
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

  async authenticate(authenticateRequest: AuthCredentialsDto) {
    try {
        return await this.authService.authenticateUser(
          authenticateRequest,
          (userData, newUser) => {
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

  async logout(accessToken: any) {
    try {
        this.authService.logout({ name: accessToken.sub });
      } catch (e) {
        throw new BadRequestException(e.message);
      }
  }

  async validateMfa(username: string, mfa: string, isTotp?: boolean) {
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
        }, isTotp ? 'SOFTWARE_TOKEN_MFA' : '');
      });
  }
}
