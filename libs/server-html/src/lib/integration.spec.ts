import {
    element
  } from './element.function';
  import { TElementRenderer } from './element-renderer.type';

  import {
    selfClosingElement
  } from './self-closing-element.function';
  import { TSelfClosingElementRenderer } from './self-closing-element-renderer.type';

  const div: TElementRenderer = element.bind(null, 'div');
  const img: TSelfClosingElementRenderer = selfClosingElement.bind(null, 'img');

  const logoUrl = 'https://blah.blah.com/blah.jpg';

  describe('elements', () => {
    it.each([

    ])('renders an HTML string', (rendering) => {
      expect(rendering).toMatchSnapshot();
    });
  });
