Feature: Check Deposit Form Validation and Error Handling in NGPF Bank Simulator
  The check deposit workflow must not allow incomplete deposits.
  Ensures that users cannot submit a check deposit when required fields are empty, preventing erroneous transactions and ensuring financial data integrity and user trust.

  @deposit @validation @high-priority @negative-case
  Scenario: Prevent submission of incomplete check deposit form and verify error handling
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to finish loading
    Then the page should display the "GET STARTED NOW" button
    And the URL should be 'https://www.ngpf.org/bank-sim'

    When I click the "GET STARTED NOW" button within the welcome overlay
    Then the page should navigate to 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'
    And the welcome modal with the "Ok" button should be visible

    When I click the "Ok" button on the welcome modal
    Then the welcome modal should be dismissed
    And I should be on the bank simulator dashboard page at 'https://www.ngpf.org/bank-sim/'

    When I locate the sidebar navigation menu
    Then the "DEPOSIT CHECKS" link should be visible in the sidebar

    When I click the "DEPOSIT CHECKS" link in the sidebar
    Then the page should navigate to the check deposit page at 'https://www.ngpf.org/bank-sim/deposit-check'
    And the check deposit form should be displayed

    # Atomic check: Do NOT fill any fields
    Then all required fields on the check deposit form should be empty

    When I locate the "Submit" button on the check deposit form
    Then the "Submit" button should be present
    And the "Submit" button should be disabled

    When I attempt to click the disabled "Submit" button
    Then no submission should occur
    And the page URL should remain 'https://www.ngpf.org/bank-sim/deposit-check'

    Then no inline error messages related to form validation should be visible on the check deposit form

    And the "Submit" button should remain disabled

    # Coverage for expected and partially observed validation
    # Edge case coverage not performed in this exact scenario (see further tests)