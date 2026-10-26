import { Given, When, Then } from "@cucumber/cucumber";
import AssessmentPage from "../pages/AssessmentPage";
import WorkflowPage from "../pages/WorkflowPage";
import { pageFixture } from "../../hooks/pageFixture";

let assessmentPage: AssessmentPage;

/**
 * Generalized component search steps.
 * The component type ("Assessment" or "Workflow") is stored in pageFixture and
 * each step dispatches to the matching page object.
 */

Given("User is on home page", async function () {
    assessmentPage = new AssessmentPage(pageFixture.page);

    await assessmentPage.validateHomePage();
});

Given("User sets component type to {string}", async function (componentType: string) {
    pageFixture.setComponentType(componentType);
});

When("User navigates to the {string} dashboard page", async function (componentType: string) {
    if (componentType === "Assessment") {
        await assessmentPage.openAssessmentSelection();
    } else if (componentType === "Workflow") {
        await new WorkflowPage(pageFixture.page).openWorkflowSelection();
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

When("User searches for {string} {string}", async function (componentType: string, componentName: string) {
    if (componentType === "Assessment") {
        await assessmentPage.searchAssessment(componentName);
    } else if (componentType === "Workflow") {
        await new WorkflowPage(pageFixture.page).searchWorkflow(componentName);
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

Then("Search result {string} should be displayed", async function (componentName: string) {
    const componentType = pageFixture.getComponentType();

    if (componentType === "Assessment") {
        await assessmentPage.validateSearchResult(componentName);
    } else if (componentType === "Workflow") {
        await new WorkflowPage(pageFixture.page).validateSearchResult(componentName);
    } else {
        throw new Error(`Unsupported component type: ${componentType}`);
    }
});

