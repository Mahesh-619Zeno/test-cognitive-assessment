
import {
    BeforeAll,
    AfterAll,
    Before,
    After,
    Status,
    setDefaultTimeout
} from "@cucumber/cucumber";

import {
    chromium,
    Browser,
    BrowserContext
} from "@playwright/test";

import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browser/browserManager";
import dotenv from "dotenv";

setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    dotenv.config({
        path: process.cwd() + "/.env"
    });

    browser = await invokeBrowser();
});

Before(async function () {
    try {
        context = await browser.newContext({
            permissions: ["microphone"],
            storageState: "./storage/dev.appmod.cookies.json"
        });

        pageFixture.page = await context.newPage();

        await pageFixture.page.goto(process.env.BASEURL!);

    } catch (error) {
        console.error("BEFORE HOOK ERROR:", error);
        throw error;
    }
});

After(async function ({ pickle, result }) {
    try {
        if (
            result?.status === Status.FAILED &&
            pageFixture.page
        ) {
            const screenshot = await pageFixture.page.screenshot({
                path: `./test-results/screenshots/${pickle.name}.png`,
                fullPage: true
            });

            await this.attach(screenshot, "image/png");
        }

        if (pageFixture.page) {
            await pageFixture.page.close();
        }

        if (context) {
            await context.close();
        }

    } catch (error) {
        console.error("AFTER HOOK ERROR:", error);
    }
});

AfterAll(async function () {
    try {
        if (browser) {
            await browser.close();
        }

        console.log("Browser closed");

    } catch (error) {
        console.error("AFTER ALL ERROR:", error);
    }
});
