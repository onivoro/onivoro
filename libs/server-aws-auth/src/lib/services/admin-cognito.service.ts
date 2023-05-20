import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { UsersListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AuthConfig } from '../classes/auth-config.class';

@Injectable()
export class AdminCognitoService {

  constructor(public config: AuthConfig,
    private cognitoIdentityService: CognitoIdentityServiceProvider) {}

  deleteAdminUser(Username: string) {
    const { AWS_COGNITO_USER_POOL_ID } = this.config;
    return new Promise((resolve, reject) => {
      this.cognitoIdentityService.adminDeleteUser(
        { UserPoolId: AWS_COGNITO_USER_POOL_ID, Username },
        (error, result) => {
          if (error) {
            console.error({
              msg: `failed to delete ${Username}`,
              context: AdminCognitoService.prototype.deleteAdminUser.name,
              error,
            });
            if (error?.code === 'UserNotFoundException') {
              resolve({});
            } else {
              reject(error);
            }
          } else {
            console.log({
              msg: `deleted ${Username}`,
              context: AdminCognitoService.prototype.deleteAdminUser.name,
              error,
            });
            resolve(result);
          }
        }
      );
    });
  }

  async getCognitoUser(Username: string) {
    try {
      const { AWS_COGNITO_USER_POOL_ID } = this.config;
      return await this.cognitoIdentityService
        .adminGetUser({
          Username,
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
        })
        .promise();
    } catch (e) {}
  }

  async createAdminUserFromInvitation({
    email,
    phone,
    password,
  }: {
    email: string;
    phone: string;
    password: string;
  }) {
    return await this.adminCreateUser(email, phone, password);
  }

  async adminCreateUser(email: string, phone: string, password: string) {
    const plusOne = '+1';
    const {AWS_COGNITO_USER_POOL_ID: UserPoolId} = this.config;
    const mobile = `${plusOne}${phone.replace(/-/g, '')}`.replace(
      `${plusOne}${plusOne}`,
      plusOne
    );
    const params: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
      ForceAliasCreation: false,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        {
          Name: 'phone_number',
          Value: mobile,
        },
        {
          Name: 'phone_number_verified',
          Value: 'true',
        },
        {
          Name: 'given_name',
          Value: '',
        },
        {
          Name: 'family_name',
          Value: '',
        },
        {
          Name: 'address',
          Value: '',
        },
      ],
      Username: email,
      UserPoolId,
    };

    const data = await this.cognitoIdentityService
      .adminCreateUser(params)
      .promise();

    const { Username } = data.User;

    const passwordParams: CognitoIdentityServiceProvider.Types.AdminSetUserPasswordRequest =
      {
        Permanent: true,
        UserPoolId,
        Username,
        Password: password,
      };

    await this.cognitoIdentityService
      .adminSetUserPassword(passwordParams)
      .promise();

    return Username;
  }

  async setUserPassword(UserPoolId: string, email: string, Password: string) {
    const passwordParams: CognitoIdentityServiceProvider.Types.AdminSetUserPasswordRequest =
      {
        Permanent: true,
        UserPoolId,
        Username: email,
        Password,
      };

    await this.cognitoIdentityService
      .adminSetUserPassword(passwordParams)
      .promise();
  }

  async getUsers() {
    const users: UsersListType = [];
    let res: CognitoIdentityServiceProvider.Types.ListUsersResponse =
      await this.getPagedUsers();
    users.push(...res.Users);
    let { PaginationToken } = res;
    while (PaginationToken) {
      res = await this.getPagedUsers(PaginationToken);
      users.push(...res.Users);
      PaginationToken = res.PaginationToken;
    }

    return users;
  }

  private getPagedUsers(PaginationToken?: string) {
    return this.cognitoIdentityService
      .listUsers({
        UserPoolId: this.config.AWS_COGNITO_USER_POOL_ID,
        PaginationToken,
      })
      .promise();
  }

  async listGroups() {
    return (
      await this.cognitoIdentityService
        .listGroups({ UserPoolId: this.config.AWS_COGNITO_USER_POOL_ID })
        .promise()
    ).Groups;
  }

  async adminListGroupsForUser(Username: string) {
    const params: CognitoIdentityServiceProvider.Types.AdminListGroupsForUserRequest =
      {
        Username,
        UserPoolId: this.config.AWS_COGNITO_USER_POOL_ID,
      };
    return (
      await this.cognitoIdentityService.adminListGroupsForUser(params).promise()
    ).Groups;
  }

  async addGroupsForApps(apps: string[], email: string) {
    const { AWS_COGNITO_USER_POOL_ID: UserPoolId } = this.config;

    await Promise.all(
      apps.map((GroupName) => {
        const groupParams: CognitoIdentityServiceProvider.Types.AdminAddUserToGroupRequest =
          {
            UserPoolId,
            Username: email,
            GroupName,
          };

        return this.cognitoIdentityService
          .adminAddUserToGroup(groupParams)
          .promise();
      })
    );
  }
}
