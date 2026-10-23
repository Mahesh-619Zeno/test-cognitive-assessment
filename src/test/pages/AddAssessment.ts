
import { expect, Locator, Page } from "@playwright/test";

export default class AddAssessment {
    private readonly page: Page;

    private readonly selectAssessmentButton: Locator;
    private readonly addAssessmentButton: Locator;
    private readonly assessmentNameInput: Locator;

    constructor(page: Page) {
        this.page = page;

       // Select the second Select button in Enterprise Automation Composer
    this.selectAssessmentButton = page
    .locator('button[class*="WelcomeScreen-module_selectButtonOutlined"]')
    .nth(1);

        // Add Assessment button on the Assessment selection screen
        this.addAssessmentButton = page.locator(
            'button[class*="SelectAssessmentScreen-module_addAssessmentBtn"]'
        );

        // Assessment name input field
        this.assessmentNameInput = page.getByRole("textbox", {
            name: "Assessment Name*",
        });
        
    }

    async validateEnterpriseAutomationComposerPage(): Promise<void> {
        await expect(this.selectAssessmentButton).toBeVisible({
            timeout: 60000,
        });
    }

    async clickSelectAssessment(): Promise<void> {
        await expect(this.selectAssessmentButton).toBeVisible({
            timeout: 30000,
        });

        await this.selectAssessmentButton.click();

        // Verify that the Assessment selection screen is displayed
        await expect(this.addAssessmentButton).toBeVisible({
            timeout: 30000,
        });
    }

    async clickAddAssessment(): Promise<void> {
        await expect(this.addAssessmentButton).toBeVisible({
            timeout: 30000,
        });

        await this.addAssessmentButton.click();
    }

    async enterAssessmentName(name: string): Promise<void> {
        await expect(this.assessmentNameInput).toBeVisible({
            timeout: 30000,
        });

        await this.assessmentNameInput.fill(name);
    }
    
}
