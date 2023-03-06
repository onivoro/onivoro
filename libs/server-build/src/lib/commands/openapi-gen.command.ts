import { Command } from 'nest-commander';
import { shell } from '../functions/shell.function';
import { AbstractAppCommand } from './abstract-app.command';
import { IAppParams } from '../types/app-params.interface';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

@Command({ name: OpenapiGen.name })
export class OpenapiGen extends AbstractAppCommand<IAppParams> {
  constructor() {
    super(OpenapiGen.name);
  }

  async main(_args: string[], { app }: IAppParams): Promise<void> {
    const appRootName = app.replace('api-', '');

    const dir = `libs/generated/${appRootName}/src/lib`;
    shell(
      [
        `rm -rf ${dir}`,
        `mkdir -p ${dir}`,
        `docker run --rm -v ${resolve(process.cwd())}:/local openapitools/openapi-generator-cli:v6.3.0 generate -i local/api-dox/${app}.json -g typescript-axios -o local/${dir}`,
      ].join(' && ')
    );

    const generatedBaseFile = `${dir}/base.ts`;
    const contents = await readFile(generatedBaseFile, 'utf-8');
    const target = 'name: "RequiredError" = "RequiredError";';
    await writeFile(
      generatedBaseFile,
      contents.replace(target, `override ${target}`),
      'utf-8'
    );
  }
}
