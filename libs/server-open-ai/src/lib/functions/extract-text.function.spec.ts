import { join } from "node:path";
import { extractText } from "./extract-text.function";

describe('extractText', () => {
  describe('parsing non-pdf files', () => {
    it('extracts the text (duh)', async () => {
      const contents = await extractText(join(process.cwd(), 'libs/server-open-ai/src/lib/assets/test.txt'));

      expect(contents).toMatchSnapshot();
    });
  });

  describe('parsing non-pdf files', () => {
    it('extracts the text (duh)', async () => {
      const contents = await extractText(join(process.cwd(), 'libs/server-open-ai/src/lib/assets/instant-pot-manual.pdf'));

      expect(contents).toMatchSnapshot();
    });
  });
});