import { chromium, Browser } from "@playwright/test";

export async function invokeBrowser(): Promise<Browser> {

    const browser = await chromium.launch({
        headless: true,
    });

    return browser;
}
