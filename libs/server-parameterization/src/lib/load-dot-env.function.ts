import { resolve } from "path";

const DEFAULT_ENV_FILE = '.env';

export function loadDotEnv(envFile = DEFAULT_ENV_FILE) {

  const nodeEnv = process.env.NODE_ENV;

  const isCustomEnvFile = envFile !== DEFAULT_ENV_FILE;

  if (nodeEnv !== 'production' || isCustomEnvFile) {
    const path = isCustomEnvFile ? envFile : resolve(process.cwd(), DEFAULT_ENV_FILE)
    const dotenv = require('dotenv');
    dotenv.config({ path });

    const dotenvFlow = require('dotenv-flow'); // eslint-disable-line  @typescript-eslint/no-var-requires

    dotenvFlow.config({
      default_node_env: 'development',
      node_env: nodeEnv,
      purge_dotenv: true,
      silent: true,
    });
  }
}
