import { join } from 'node:path';
import { createWriteStream } from 'node:fs';

import { Configuration, OpenAIApi } from 'openai';
import { ServerOpenAiConfig } from '../classes/server-open-ai-config.class';
import { OpenAiService } from './open-ai.service';
import { extractText } from '../functions/extract-text.function';

describe(OpenAiService.name, () => {
  const setup = (
    // configOverride?: Partial<ServerOpenAiConfig>,
    // openaiOverride?: Partial<OpenAIApi>
  ) => {

    const apiKey = process.env['OPENAPI_KEY'];
    const config = new ServerOpenAiConfig(apiKey);
    const openai = new OpenAIApi(new Configuration({apiKey}));

    const subject = new OpenAiService(config as ServerOpenAiConfig, openai as OpenAIApi);

    return { config, openai, subject }
  };

  describe(OpenAiService.prototype.postV2.name, () => {
    it('worx', async () => {
      const { subject } = setup();
      const contents = await extractText(join(process.cwd(), 'libs/server-open-ai/src/lib/functions/lee_has_superhuman_will_power.pdf'));
      const writeStream = createWriteStream('libs/server-open-ai/src/lib/functions/lee_has_superhuman_will_power.json');
      writeStream.write(`[\n`);

      const persister = jest.fn().mockImplementation(input => new Promise(res => {
        writeStream.write(`${JSON.stringify(input[0])},`);
        setTimeout(() => res, 1000);
        })
      );

      await subject.tokenizeTextAndPersistAsEmbedding(contents, persister);

      writeStream.write(`\n]`);
      writeStream.close();

      expect(persister.mock.calls.length).toMatchSnapshot();
    }, 600_000);
  });
});
