export function loadDotEnv() {

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();

    const dotenvFlow = require('dotenv-flow'); // eslint-disable-line  @typescript-eslint/no-var-requires

    dotenvFlow.config({
      default_node_env: 'development',
      node_env: nodeEnv,
      purge_dotenv: true,
      silent: true,
    });
  }
}
