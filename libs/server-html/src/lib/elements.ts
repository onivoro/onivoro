import { TElementRenderer } from "./element-renderer.type";
import { element } from "./element.function";
import { TSelfClosingElementRenderer } from "./self-closing-element-renderer.type";
import { selfClosingElement } from "./self-closing-element.function";

export const anchor: TElementRenderer = element.bind(null, 'a');
export const body: TElementRenderer = element.bind(null, 'body');
export const div: TElementRenderer = element.bind(null, 'div');
export const h1: TElementRenderer = element.bind(null, 'h1');
export const h2: TElementRenderer = element.bind(null, 'h2');
export const h3: TElementRenderer = element.bind(null, 'h3');
export const h4: TElementRenderer = element.bind(null, 'h4');
export const h5: TElementRenderer = element.bind(null, 'h5');
export const h6: TElementRenderer = element.bind(null, 'h6');
export const head: TElementRenderer = element.bind(null, 'head');
export const header: TElementRenderer = element.bind(null, 'header');
export const htm: TElementRenderer = element.bind(null, 'html');
export const img: TSelfClosingElementRenderer = selfClosingElement.bind(null, 'img');
export const main: TElementRenderer = element.bind(null, 'main');
export const p: TElementRenderer = element.bind(null, 'p');
export const pre: TElementRenderer = element.bind(null, 'pre');
export const tab: TElementRenderer = element.bind(null, 'table');
export const tbody: TElementRenderer = element.bind(null, 'tbody');
export const td: TElementRenderer = element.bind(null, 'td');
export const th: TElementRenderer = element.bind(null, 'th');
export const thead: TElementRenderer = element.bind(null, 'thead');
export const tr: TElementRenderer = element.bind(null, 'tr');

export const style = element.bind(null, 'style');
