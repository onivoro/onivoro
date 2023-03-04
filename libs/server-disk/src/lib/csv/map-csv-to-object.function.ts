export const mapCsvToObject = (line: string, schema: string[], delimiter = '|') => {
  const object: any = {} as any;
  const data = line.split(delimiter);
  schema.forEach((key, index) => {
    object[key ? key.trim() : key] = data[index] ? data[index].trim() : data[index];
  });
  object.line = line;

  return object;
}
