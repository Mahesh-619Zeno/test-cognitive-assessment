import { expect, Page } from "@playwright/test";

export default class WorkflowPage {
    constructor(private page: Page) {}

    private exploreWorkflowtBtn = "//h2[text()='Workflow']/../..//button[text()='Select']";
    private myWorkflowText = "//*[text()='My Workflows']";
    private workflowSearchInput = "//input[@placeholder='Search workflows...']";

    async openWorkflowSelection() {
        await this.page.locator(this.exploreWorkflowtBtn).click();
    }

    async validateMyWorkflowsPage() {
        await expect(this.page.locator(this.myWorkflowText)).toBeVisible();
    }

    async searchWorkflow(workflowName: string) {
        await this.page.locator(this.workflowSearchInput).fill(workflowName);
    }

    async validateSearchResult(workflowName: string) {
        await expect(this.page.locator(`//*[text()='${workflowName}']`)).toBeVisible();
    }
}

