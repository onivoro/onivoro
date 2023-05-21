import { Injectable } from "@nestjs/common";
import { Lambda } from "aws-sdk";

@Injectable()
export class LambdaService {
  constructor(private lambda: Lambda) {}

  async invoke<TEvent> (
    event: TEvent,
    lambdaName: string,
    invocationType = 'RequestResponse'
  ) {

    const data = await this.lambda
      .invoke({
        FunctionName: lambdaName,
        InvocationType: invocationType,
        Payload: JSON.stringify(event, null, 2),
      })
      .promise();

    try {
      console.log(LambdaService.name, {data});
      return JSON.parse(JSON.parse(data?.Payload?.toString() || '{}').body);
    } catch (e) {
      return null;
    }
  }
}