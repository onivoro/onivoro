import { Injectable } from "@nestjs/common";
import { Browser } from 'puppeteer-core';

@Injectable()
export class PuppeteerService {
    constructor(public browser: Browser) { }
}
