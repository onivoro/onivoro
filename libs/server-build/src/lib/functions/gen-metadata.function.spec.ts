import { genMetadata } from './gen-metadata.function';

describe('genMetadata', () => {
  it.each([
    ['api-account', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', true],
    ['api-compliance', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', true],
    ['cli-evo', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', true],
    ['api-account', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', false],
    ['api-compliance', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', false],
    ['cli-evo', '314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve', false],
  ])('worx', (app, ecr, isProd) => {
    expect(genMetadata(app, ecr, isProd)).toMatchSnapshot();
  });
});