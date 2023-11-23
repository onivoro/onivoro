import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import { INestApplication } from '@nestjs/common';
import { generateAppMetadata } from './generate-app-metadata.function';

export async function initOpenapi(app: INestApplication, moduleName: string, projectName: string, appRoot: string) {
  const { swaggerJsonPath } = generateAppMetadata(projectName, appRoot);

  const options = new DocumentBuilder()
    .setTitle(moduleName)
    .setDescription('')
    // .setVersion(JSON.parse(await readFile('./package.json', 'utf-8')).version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`writing swagger JSON file to ${swaggerJsonPath}`)
    await writeFile(resolve(swaggerJsonPath), JSON.stringify(document, null, 2));
  }

  SwaggerModule.setup('dox', app, document);

  return swaggerJsonPath;
}
