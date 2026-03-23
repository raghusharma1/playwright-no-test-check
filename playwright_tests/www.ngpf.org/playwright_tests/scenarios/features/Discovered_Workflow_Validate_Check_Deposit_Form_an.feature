Feature: Check Deposit Form Validation and Error Handling in NGPF Bank Simulator
  As a financial literacy simulation user,
  I want the check deposit form to prevent incomplete submissions by disabling the 'Submit' button
  And provide clear visual error handling,
  So that financial data integrity and user trust are maintained.

  @smoke @validation @bank-sim @check-deposit
  Scenario: Prevent submission of check deposit with all required fields left empty and verify lack of inline errors
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to be loaded
    Then the page should display the 'GET STARTED NOW' button

    When I click the 'GET STARTED NOW' button in the main content area
    Then I should be on the Welcome modal
    And the Welcome modal should display the 'Ok' button

    When I click the 'Ok' button on the Welcome modal
    Then I should be on the Bank Simulator dashboard at URL 'https://www.ngpf.org/bank-sim/'
    And the dashboard sidebar navigation should be visible

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then I should be on the 'Deposit Checks' page at URL 'https://www.ngpf.org/bank-sim/deposit-check'
    And the check deposit form should be visible
    And the form should display the 'Submit' button

    # Do not fill in any form fields (leave all required fields empty)

    When I focus on the 'Submit' button in the check deposit form
    Then the 'Submit' button should be disabled

    When I attempt to click the disabled 'Submit' button
    Then the 'Submit' button should remain disabled
    And no inline error messages should be displayed in or beneath the check deposit form
    And I should remain on the 'Deposit Checks' page at URL 'https://www.ngpf.org/bank-sim/deposit-check'

  @edgecase @validation
  Scenario: Attempt partial input on check deposit form and verify submission is still prevented
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to be loaded
    Then the page should display the 'GET STARTED NOW' button

    When I click the 'GET STARTED NOW' button in the main content area
    Then I should be on the Welcome modal
    And the Welcome modal should display the 'Ok' button

    When I click the 'Ok' button on the Welcome modal
    Then I should be on the Bank Simulator dashboard at URL 'https://www.ngpf.org/bank-sim/'
    And the dashboard sidebar navigation should be visible

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then I should be on the 'Deposit Checks' page at URL 'https://www.ngpf.org/bank-sim/deposit-check'
    And the check deposit form should be visible

    When I fill in the 'Check Amount' field with '150'
    # Leave all other required fields empty

    Then the 'Submit' button should be disabled
    And no inline error messages should be displayed in or beneath the check deposit form
    And I should remain on the 'Deposit Checks' page at URL 'https://www.ngpf.org/bank-sim/deposit-check'