import { IFieldConfig } from '../interfaces/field-config.interface';
import { randomWord } from '../functions/random-word.function';
import { LabelForPipe } from './label-for.pipe';

describe(LabelForPipe.name, () => {
  let pipe: LabelForPipe;
  let fieldConfig: IFieldConfig;
  let definedKey: string;

  beforeAll(() => {
    pipe = new LabelForPipe();
    definedKey = randomWord();
    fieldConfig = { fieldOptions: { [definedKey]: { label: randomWord() } } } as any;
  });

  describe(LabelForPipe.prototype.transform.name, () => {
    describe('a successful transformation', () => {
      describe('given field config has a member matching the provided field name', () => {
        it("returns matching member's label", () => {
          const actual = pipe.transform(fieldConfig, definedKey);
          expect(actual).toEqual(fieldConfig.fieldOptions[definedKey].label);
        });
      });
    });

    describe('edge cases', () => {
      describe('given field config does not have a member matching the provided field name', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(fieldConfig, randomWord());
          expect(actual).toBeUndefined();
        });
      });

      describe('given the provided field name is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(fieldConfig, null as any);
          expect(actual).toBeUndefined();
        });
      });

      describe('given field config is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(null as any, definedKey);
          expect(actual).toBeUndefined();
        });
      });
    });
  });
});
