import { Injectable } from "@nestjs/common";
import { Browser, Page } from 'puppeteer-core';

@Injectable()
export class PuppeteerService {
    constructor(public browser: Browser) { }

    async usePage(fn: (page: Page) => Promise<string>, url?: string) {
        const page = await this.browser.newPage();
        if (url) {
            await page.goto(url);
        }
        const result = await fn(page);
        await page.close();
        return result;
    }
}
