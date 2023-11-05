import { Injectable } from "@nestjs/common";
import { IApiCredentials } from "../api-credentials.interface";
import { LoginWithEmailAndPasswordDto } from "../dtos/login-with-email-and-password.dto";

@Injectable()
export class TokenBuilder<TAccessToken> {
    async byEmailAndPassword(creds: LoginWithEmailAndPasswordDto): Promise<TAccessToken> {
        return {} as TAccessToken;
    }
    async byApiCredentials(creds: IApiCredentials): Promise<TAccessToken> {
        return {} as TAccessToken;
    }
}