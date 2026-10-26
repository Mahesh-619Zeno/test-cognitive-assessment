import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from '../pages/HomePage';
import AssessmentPage from "../pages/AssessmentPage";
import WorkflowPage from "../pages/WorkflowPage";
import { pageFixture } from "../../hooks/pageFixture";

let assessmentPage: AssessmentPage;
let workflowPage: WorkflowPage;

/**
 * Generalized component search steps.
 * The component type ("Assessment" or "Workflow") is stored in pageFixture and
 * each step dispatches to the matching page object.
 */

Given('User is on home page', async function () {
    const homePage = new HomePage(pageFixture.page);
    await homePage.validateHomePage();
});

Given("User sets component type to {string}", async function (componentType: string) {
    pageFixture.setComponentType(componentType);
});

When("User navigates to the {string} dashboard page", async function (componentType: string) {
    assessmentPage = new AssessmentPage(pageFixture.page);
    workflowPage = new WorkflowPage(pageFixture.page);
    if (componentType === "Assessment") {
        await assessmentPage.openAssessmentSelection();
    } else if (componentType === "Workflow") {
        await workflowPage.openWorkflowSelection();
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

When("User searches for {string} {string}", async function (componentType: string, componentName: string) {
    if (componentType === "Assessment") {
        await assessmentPage.searchAssessment(componentName);
    } else if (componentType === "Workflow") {
        await workflowPage.searchWorkflow(componentName);
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

Then("Search result {string} should be displayed", async function (componentName: string) {
    const componentType = pageFixture.getComponentType();

    if (componentType === "Assessment") {
        await assessmentPage.validateSearchResult(componentName);
    } else if (componentType === "Workflow") {
        await workflowPage.validateSearchResult(componentName);
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

