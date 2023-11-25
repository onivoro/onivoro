import { div, h1, h2, main, style } from './tags';

export function emailBody(
  title: string,
  subtitle: string,
  markup: Array<string | number>,
  logoUrl?: string,
  extraStyles: string[] = [],
) {
  const bodyClass = 'onivoro-email-body';
  return div([
    div([
      style([
        `.${bodyClass} {`,
        `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;`,
        `font-size: 1rem;`,
        `-webkit-font-smoothing: antialiased;`,
        `-moz-osx-font-smoothing: grayscale;`,
        'color: rgba(0, 0, 0, 0.6) !important;',
        ...extraStyles,
        '}',
      ]),
    ]),
    div([
      div([
        div(
          [
            logoUrl
              ? `<img height="64" width="auto" src="${logoUrl}" />`
              : undefined,
            title ? h1([title]) : undefined,
            subtitle ? h2([subtitle]) : undefined,
          ].filter(Boolean)
        ),
        main(markup),
      ], bodyClass),
    ]),
  ]);
}
