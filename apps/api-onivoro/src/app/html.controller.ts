import { Controller, Get } from '@nestjs/common';
import { emailBody, div, loginButton } from "@onivoro/server-html";

@Controller()
export class HtmlController {
  @Get()
  get() {
    return emailBody(
      '',
      '',
      [
        div(['This is a div']),
        loginButton('Login to View', 'https://www.google.com', { color: 'white', 'background-color': 'red'})
      ],
      'https://s3.us-east-2.amazonaws.com/rolf.public/rolf-logo.png', {color: 'rgba(255, 255, 255, 0.8)', 'background-color': 'navy', padding: '4rem'}
    );
  }
}
