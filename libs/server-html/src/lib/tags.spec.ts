import {
  p,
  td,
  h1,
  h2,
  h3,
  tr,
  th,
  thead,
  tbody,
  tab,
  htm,
  head,
  header,
  main,
  body,
} from './tags';

describe('tags', () => {
  it.each([
    [p],
    [td],
    [h1],
    [h2],
    [h3],
    [tr],
    [th],
    [thead],
    [tbody],
    [tab],
    [htm],
    [head],
    [header],
    [main],
    [body],
  ])('renders and HTML string', (tag) => {
    expect(tag(['content goes here'], 'css-class-goes-here')).toMatchSnapshot();
    expect(tag(['content goes here'])).toMatchSnapshot();
  });
});
