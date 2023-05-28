import { tokenizeText } from './tokenize-text.function';
import {extractText} from './extract-text.function';
import { join } from 'node:path';

const GPT_MODEL = 'gpt-3.5-turbo';

describe('tokenizeText', () => {
    xit.each(['', null, undefined])('returns empty array for falsey values', (contents: string) => {
        expect(tokenizeText(contents, GPT_MODEL)).toEqual([]);
    });

    xit.each([`{{Jesus and the Woman Caught in Adultery}}
    At dawn he appeared again in the temple courts, where all the people gathered around him, and he sat down to teach them. 3 The teachers of the law and the Pharisees brought in a woman caught in adultery. They made her stand before the group 4 and said to Jesus, “Teacher, this woman was caught in the act of adultery. 5 In the Law Moses commanded us to stone such women. Now what do you say?” 6 They were using this question as a trap, in order to have a basis for accusing him.

    But Jesus bent down and started to write on the ground with his finger. 7 When they kept on questioning him, he straightened up and said to them, “Let any one of you who is without sin be the first to throw a stone at her.” 8 Again he stooped down and wrote on the ground.

    9 At this, those who heard began to go away one at a time, the older ones first, until only Jesus was left, with the woman still standing there. 10 Jesus straightened up and asked her, “Woman, where are they? Has no one condemned you?”

    11 “No one, sir,” she said.

    “Then neither do I condemn you,” Jesus declared. “Go now and leave your life of sin.”`])('worx', (contents: string) => {
        expect(tokenizeText(contents, GPT_MODEL)).toMatchSnapshot();
    });

    it('worx for sample doc', async () => {
        const contents = await extractText(join(process.cwd(), 'libs/server-open-ai/src/lib/functions/lee_has_superhuman_will_power.pdf'));

        // console.log(contents);

        expect(tokenizeText(contents, GPT_MODEL)).toMatchSnapshot();
    });
});
