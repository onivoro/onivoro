import { join } from 'node:path';
import { createWriteStream } from 'node:fs';

import { Configuration, OpenAIApi } from 'openai';
import { ServerOpenAiConfig } from '../classes/server-open-ai-config.class';
import { OpenAiService } from './open-ai.service';
import { extractText } from '../functions/extract-text.function';

describe(OpenAiService.name, () => {
  const setup = () => {

    const apiKey = process.env['OPENAPI_KEY'];
    const config = new ServerOpenAiConfig(apiKey);
    const openai = new OpenAIApi(new Configuration({apiKey}));

    const subject = new OpenAiService(config as ServerOpenAiConfig, openai as OpenAIApi);

    return { config, openai, subject }
  };

  describe(OpenAiService.prototype.post.name, () => {
    it('tokenizes text and calls OpenAi to generate embeddings before passing the embedding and text to the persister', async () => {
      const { subject } = setup();
      const contents = await extractText(join(process.cwd(), 'libs/server-open-ai/src/lib/assets/instant-pot-manual.pdf'));

      const persister = jest.fn().mockResolvedValue('jest requires an argument here :(');

      await subject.tokenizeTextAndPersistAsEmbedding(contents, persister);

      expect(persister.mock.calls).toMatchSnapshot();
    }, 60_000);
  });
});
