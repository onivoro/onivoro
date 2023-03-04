import { writeFile } from 'fs/promises';

export async function saveFileAsJson(path: string, contents: any) {
  await writeFile(
    `${path}.json`.replace('.json.json', ''),
    JSON.stringify(contents, null, 2)
  );
}
