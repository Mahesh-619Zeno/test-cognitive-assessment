import { Page } from "@playwright/test";

class PageFixture {
    page!: Page;
}

export const pageFixture = new PageFixture();