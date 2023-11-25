import { Controller, Get } from '@nestjs/common';
import { emailBody, div, table, anchor, pre, buttonStyles } from "@onivoro/server-html";

@Controller()
export class HtmlController {
  @Get()
  get() {
    const arr = [];
    let i = 0;
    const limit = Math.random() * 10;
    while (i < limit) {
      arr.push(`${Math.random() * 1000}`)
      i++;
    }
    return emailBody(
      '',
      '',
      [
        div(['This is a div'], { style: { padding: '1rem 0' } }),
        div([
          anchor(['Login to View'], {style: { color: 'crimson', 'background-color': 'black', display: 'block' }, href: 'https://www.google.com', target: '_blank'}),
          anchor(['Login to View'], { href: 'https://www.google.com', target: '_blank',}),
        ], {style: {display: 'flex', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': 'space-between', border: 'solid 1px yellow'}}),
        table(arr, arr.map((_, i) => arr.map((el, ii) => el.padEnd(ii * ii * 2 * i, 'z')))),
        pre([Math.random()], {style: {...buttonStyles, width: '100%', 'border-style': 'dashed'}})
      ],
      'https://s3.us-east-2.amazonaws.com/rolf.public/rolf-logo.png', { color: 'rgba(255, 255, 255, 0.5)', 'background-color': 'crimson', padding: '4rem' }
    );
  }
}
