import { IAppParams } from './app-params.interface';

export interface IAwsAppParams extends IAppParams {
  profile: string;
  region: string;
}
