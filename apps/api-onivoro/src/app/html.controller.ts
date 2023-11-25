import { Controller, Get } from '@nestjs/common';
import { emailBody, div } from "@onivoro/server-html";

@Controller()
export class HtmlController {
  @Get()
  get() {
    return emailBody(
      '',
      '',
      [
        div(['This is a div'])
      ],
      'https://s3.us-east-2.amazonaws.com/rolf.public/rolf-logo.png', {color: 'rgba(255, 255, 255, 0.8)', border: 'solid 1px dashed', 'background-color': 'navy', padding: '4rem'}
    );
  }
}
