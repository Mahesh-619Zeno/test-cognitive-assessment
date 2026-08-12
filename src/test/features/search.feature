Feature: Assessment Search

  Scenario: Search assessment successfully
    Given User is on home page
    When User clicks on Explore Assessment
    Then User should be redirected to Select Assessment page
    When User searches for assessment "MSA Contract Compliance Validation"
    Then Search result "MSA Contract Compliance Validation" should be displayed