
import { Given, When } from "@cucumber/cucumber";
import AddAssessment from "../pages/AddAssessment";
import { pageFixture } from "../../hooks/pageFixture";
import testData from "../data/testdata.json";

let addAssessment: AddAssessment;

Given("User is on Enterprise Automation Composer page", async function () {
    addAssessment = new AddAssessment(pageFixture.page);

    await addAssessment.validateEnterpriseAutomationComposerPage();
});

When("User clicks on Select in the Assessment card", async function () {
    await addAssessment.clickSelectAssessment();
});

When("User clicks on Add Assessment", async function () {
    await addAssessment.clickAddAssessment();
});

When("User enters assessment name", async function () {
    await addAssessment.enterAssessmentName(
        testData.assessment.name
    );
});
