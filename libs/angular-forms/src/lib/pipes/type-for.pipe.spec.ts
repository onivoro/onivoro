import { randomWord } from '../functions/random-word.function';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { TypeForPipe } from './type-for.pipe';

describe(TypeForPipe.name, () => {
  let pipe: TypeForPipe;
  let fieldConfig: IFieldConfig;
  let definedKey: string;

  beforeAll(() => {
    pipe = new TypeForPipe();
    definedKey = randomWord();
    fieldConfig = { fieldOptions: { [definedKey]: { type: randomWord() } } } as any;
  });

  describe(TypeForPipe.prototype.transform.name, () => {
    describe('a successful transformation', () => {
      describe('given field config has a member matching the provided field name', () => {
        it("returns matching member's type", () => {
          const actual = pipe.transform(fieldConfig, definedKey);
          expect(actual).toEqual(fieldConfig.fieldOptions[definedKey].type);
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
