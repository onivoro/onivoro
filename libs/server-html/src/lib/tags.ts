export function tagOld(
  tag: string,
  content: any,
  attributes?: Record<string, any>
) {
  return `<${tag} ${
    attributes ? formatAttributes(attributes) : ''
  }>${content}</${tag}>`;
}
export function tag(
  tag: string,
  content: Array<string | number>,
  cssClass?: string
) {
  const classExp = cssClass ? `class="${cssClass}"` : '';
  return `<${tag} ${classExp}>${content.join?.('')}</${tag}>`;
}

function formatAttributes(attributes: Record<string, any>) {
  return Object.entries(attributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
}

export type THtmlElementRenderer = (
  content: Array<string | number>,
  cssClass?: string
) => string;
export const p: THtmlElementRenderer = tag.bind(null, 'p');
export const div: THtmlElementRenderer = tag.bind(null, 'div');
export const pre: THtmlElementRenderer = tag.bind(null, 'pre');
export const td: THtmlElementRenderer = tag.bind(null, 'td');
export const h1: THtmlElementRenderer = tag.bind(null, 'h1');
export const h2: THtmlElementRenderer = tag.bind(null, 'h2');
export const h3: THtmlElementRenderer = tag.bind(null, 'h3');
export const tr: THtmlElementRenderer = tag.bind(null, 'tr');
export const th: THtmlElementRenderer = tag.bind(null, 'th');
export const thead: THtmlElementRenderer = tag.bind(null, 'thead');
export const tbody: THtmlElementRenderer = tag.bind(null, 'tbody');
export const tab: THtmlElementRenderer = tag.bind(null, 'table');
export const htm: THtmlElementRenderer = tag.bind(null, 'html');
export const head: THtmlElementRenderer = tag.bind(null, 'head');
export const header: THtmlElementRenderer = tag.bind(null, 'header');
export const main: THtmlElementRenderer = tag.bind(null, 'main');
export const body: THtmlElementRenderer = tag.bind(null, 'body');
export const style = tag.bind(null, 'style');
