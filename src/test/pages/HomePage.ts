import { expect, Page } from "@playwright/test";

export default class HomePage {

    constructor(private page: Page) {}

    private homePageHeading = "//h1[text()='Welcome to the Cognitive Assessment']";
    private exploreAssessmentBtn = "//button[text()='Explore Assessment']";
    private selectAssessmentText = "//*[text()='Select Assessment']";
    private searchInput = "//input[@placeholder='Search assessments...']";
    private searchResult = "//h2[text()='MSA Contract Compliance Validation']";

    async validateHomePage() {
        await expect(
            this.page.locator(this.homePageHeading)
        ).toBeVisible({ timeout: 60000 });
    }

    async openAssessmentSelection() {
        await this.page.locator(this.exploreAssessmentBtn).click();
    }

    async validateAssessmentSelectionPage() {
        await expect(
            this.page.locator(this.selectAssessmentText)
        ).toBeVisible();
    }

    async searchAssessment(assessmentName: string) {
        await this.page.locator(this.searchInput).fill(assessmentName);
    }

    async validateSearchResult(assessmentName: string) {
        await expect(
            this.page.locator(`//h2[text()='${assessmentName}']`)
        ).toBeVisible();
    }
}