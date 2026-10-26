@sanity
Feature: Search

  @test
  Scenario Outline: Search <componentType> successfully
    Given User is on home page
    Given User sets component type to "<componentType>"
    When User navigates to the "<componentType>" dashboard page
    When User searches for "<componentType>" "<searchTerm>"
    Then Search result "<expectedResult>" should be displayed

    Examples:
      | componentType | searchTerm                              | expectedResult                          |
      | Assessment    | MSA Contract Compliance Validation      | MSA Contract Compliance Validation      |
      | Workflow      | AP-Gut Reason to Believe (RTB) Workflow | AP-Gut Reason to Believe (RTB) Workflow |
