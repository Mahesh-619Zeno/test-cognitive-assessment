@assessment
Feature: Add Assessment

  @addAssessment
  Scenario: Create an assessment with Chat with Artifact action
    Given User is on Enterprise Automation Composer page
    When User clicks on Select in the Assessment card
    And User clicks on Add Assessment
    And User enters assessment name
    And User enters assessment description
