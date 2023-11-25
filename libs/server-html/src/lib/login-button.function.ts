import { anchor } from './elements';

export function loginButton(text: string, href: string, extraStyles?: Record<string, string>) {
  return anchor([text], {
    href,
    style: {
      padding: '1rem 1.5rem',
      border: 'solid 1px',
      'border-radius': '4px',
      display: 'inline-block',
      'text-align': 'center',
      'text-decoration': 'none',
      ...(extraStyles || {})
    }
  });
}
