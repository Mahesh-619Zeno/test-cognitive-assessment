import { expect, Page } from "@playwright/test";

export default class AssessmentPage {

    constructor(private page: Page) {}

    //private homePageHeading = "//h1[text()='Welcome to Enterprise Automation Composer']";
    private exploreAssessmentBtn = "//h2[text()='Assessment']/../..//button[text()='Select']";
    private selectAssessmentText = "//*[text()='My Assessments']";
    private searchInput = "//input[@placeholder='Search assessments...']";

    // async validateHomePage() {
    //     await expect(
    //         this.page.locator(this.homePageHeading)
    //     ).toBeVisible({ timeout: 60000 });
    // }

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
            this.page.locator(`//*[text()='${assessmentName}']`)
        ).toBeVisible();
    }
}