import { Module } from "@nestjs/common";
// import { ServerAwsS3Module } from "@onivoro/server-aws-s3";
import { moduleFactory } from "@onivoro/server-common";
import { Configuration, OpenAIApi } from "openai";
import { ServerOpenAiConfig } from "./classes/server-open-ai-config.class";
import { OpenAiService } from "./services/open-ai.service";

@Module({})
export class ServerOpenAiModule {
  static configure(config: ServerOpenAiConfig) {
    const {apiKey} = config;
    return moduleFactory({
      module: ServerOpenAiModule,
      providers: [
        OpenAiService,
        {
          provide: ServerOpenAiConfig,
          useValue: config
        },
        {
          provide: OpenAIApi,
          useFactory: () => new OpenAIApi(new Configuration({apiKey})),
        },
        // {
        //   provide: OpenAiService,
        //   useFactory: () => new OpenAiService(new OpenAIApi(new Configuration({apiKey})), )
        // }
      ],
      imports: [],
    });
  }
}
