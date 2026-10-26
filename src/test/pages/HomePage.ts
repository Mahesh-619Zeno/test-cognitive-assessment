import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    private homePageHeading = "//h1[text()='Welcome to Enterprise Automation Composer']";

    async validateHomePage() {
        await expect(
            this.page.locator(this.homePageHeading)
        ).toBeVisible({ timeout: 60000 });
    }
}
