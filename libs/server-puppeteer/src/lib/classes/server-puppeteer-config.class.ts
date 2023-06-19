import { PuppeteerLaunchOptions } from "puppeteer-core";

export class ServerPuppeteerConfig {
    executablePath: PuppeteerLaunchOptions['executablePath'];
    headless?: PuppeteerLaunchOptions['headless'];
    devtools?: PuppeteerLaunchOptions['devtools'];
    defaultViewport?: PuppeteerLaunchOptions['defaultViewport'];
}