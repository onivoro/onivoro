import { IAwsAppParams } from "./aws-app-params.interface";

export interface IAwsLambdaParams extends IAwsAppParams {
    bucket: string;
    prefix?: string;
    role: string;
};
