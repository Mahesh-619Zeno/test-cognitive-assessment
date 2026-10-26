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

import * as fs from "fs";
import { pageFixture } from "./pageFixture";

setDefaultTimeout(60 * 10000);

let browser: Browser;
let context: BrowserContext;

interface Cookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None" | string;
}


import { invokeBrowser } from "../helper/browser/browserManager";
import dotenv from "dotenv";

BeforeAll(async function () {

    dotenv.config({
        path: process.cwd() + "/.env"
    });

    browser = await invokeBrowser();
});

async function loadCookiesFromFile(
    context: BrowserContext,
    filePath: string
): Promise<void> {

    const cookies: Cookie[] = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
    );

    const normalizedCookies = cookies.map((cookie) => {

        const validSameSite = [
            "Strict",
            "Lax",
            "None"
        ];

        return {
            ...cookie,
            sameSite: validSameSite.includes(
                cookie.sameSite || ""
            )
                ? cookie.sameSite
                : "Lax"
        };
    });

    await context.addCookies(
        normalizedCookies as any
    );
}


Before(async function () {

    try {

        context = await browser.newContext({
            permissions: ["microphone"]
        });

        await loadCookiesFromFile(
            context,
            "./cookies.json"
        );

        pageFixture.page =
            await context.newPage();

        await pageFixture.page.goto(process.env.BASEURL!);

    } catch (error) {

        console.error(
            "BEFORE HOOK ERROR:",
            error
        );

        throw error;
    }
});

After(async function ({ pickle, result }) {

    try {

        if (
            result?.status === Status.FAILED &&
            pageFixture.page
        ) {

            const screenshot =
                await pageFixture.page.screenshot({
                    path: `./test-results/screenshots/${pickle.name}.png`,
                    fullPage: true
                });

            await this.attach(
                screenshot,
                "image/png"
            );
        }

        if (pageFixture.page) {
            await pageFixture.page.close();
        }

        if (context) {
            await context.close();
        }

    } catch (error) {

        console.error(
            "AFTER HOOK ERROR:",
            error
        );
    }
});

AfterAll(async function () {

    try {

        if (browser) {
            await browser.close();
        }

        console.log(
            "Browser closed"
        );

    } catch (error) {

        console.error(
            "AFTER ALL ERROR:",
            error
        );
    }
});