import { Given, When, Then } from "@cucumber/cucumber";
import HomePage from "../pages/HomePage";
import { pageFixture } from "../../hooks/pageFixture";

let homePage: HomePage;

Given("User is on home page", async function () {
    homePage = new HomePage(pageFixture.page);

    await homePage.validateHomePage();
});

When("User clicks on Explore Assessment", async function () {
    await homePage.openAssessmentSelection();
});

Then("User should be redirected to Select Assessment page", async function () {
    await homePage.validateAssessmentSelectionPage();
});

When(
    "User searches for assessment {string}",
    async function (assessmentName: string) {
        await homePage.searchAssessment(assessmentName);
    }
);

Then(
    "Search result {string} should be displayed",
    async function (assessmentName: string) {
        await homePage.validateSearchResult(assessmentName);
    }
);