import { THtmlElementRenderer } from "./html-element-renderer.type";
import { TSelfClosingHtmlElementRenderer } from "./self-closing-html-element-renderer.type";
import { selfClosingTag } from "./self-closing-tag.function";
import { tag } from "./tag.function";

export const body: THtmlElementRenderer = tag.bind(null, 'body');
export const div: THtmlElementRenderer = tag.bind(null, 'div');
export const h1: THtmlElementRenderer = tag.bind(null, 'h1');
export const h2: THtmlElementRenderer = tag.bind(null, 'h2');
export const h3: THtmlElementRenderer = tag.bind(null, 'h3');
export const h4: THtmlElementRenderer = tag.bind(null, 'h4');
export const h5: THtmlElementRenderer = tag.bind(null, 'h5');
export const h6: THtmlElementRenderer = tag.bind(null, 'h6');
export const head: THtmlElementRenderer = tag.bind(null, 'head');
export const header: THtmlElementRenderer = tag.bind(null, 'header');
export const htm: THtmlElementRenderer = tag.bind(null, 'html');
export const img: TSelfClosingHtmlElementRenderer = selfClosingTag.bind(null, 'img');
export const main: THtmlElementRenderer = tag.bind(null, 'main');
export const p: THtmlElementRenderer = tag.bind(null, 'p');
export const pre: THtmlElementRenderer = tag.bind(null, 'pre');
export const tab: THtmlElementRenderer = tag.bind(null, 'table');
export const tbody: THtmlElementRenderer = tag.bind(null, 'tbody');
export const td: THtmlElementRenderer = tag.bind(null, 'td');
export const th: THtmlElementRenderer = tag.bind(null, 'th');
export const thead: THtmlElementRenderer = tag.bind(null, 'thead');
export const tr: THtmlElementRenderer = tag.bind(null, 'tr');

export const style = tag.bind(null, 'style');
