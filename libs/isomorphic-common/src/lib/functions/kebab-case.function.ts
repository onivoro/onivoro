import { snakeCase } from "./snake-case.function";

export function kebabCase(string) {
  return snakeCase(string).replace(/_/g, '-');
}
