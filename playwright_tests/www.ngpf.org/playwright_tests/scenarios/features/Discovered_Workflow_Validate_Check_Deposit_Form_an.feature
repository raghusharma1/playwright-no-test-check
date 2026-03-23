Feature: Check Deposit Validation and Error Handling in Bank Simulator
  Ensures that incomplete check deposit attempts are blocked in the NGPF Bank Simulator, maintaining financial data integrity by preventing erroneous transactions. Verifies that form validation disables submission if required fields are empty, and observes current inline error handling.

  @SmokeTest @Validation @DepositChecks @Critical
  Scenario: Prevent incomplete check deposit: all required fields left empty disables Submit button
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to load completely
    Then the page URL should be 'https://www.ngpf.org/bank-sim'

    When I see a button with text 'GET STARTED NOW'
    And I click the 'GET STARTED NOW' button within the main content
    Then I should be on the Welcome modal
    And a dialog with a button labeled 'Ok' should be visible

    When I click the 'Ok' button in the Welcome modal
    Then the Welcome modal should be dismissed
    And the page URL should be 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F' or 'https://www.ngpf.org/bank-sim/'
    And the 'DEPOSIT CHECKS' link should be visible in the sidebar navigation

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then the check deposit form should be displayed
    And the page URL should be 'https://www.ngpf.org/bank-sim/deposit-check'
    And the form titled 'Deposit Check' should be visible

    Then the following required fields should be present and empty:
      | Field Label              |
      | 'Date'                  |
      | 'Amount'                |
      | 'Check Number'          |
      | 'Sender/Issuer'         |
      | 'Memo/Notes'            |

    # Do not fill in any fields; all inputs remain empty by default

    Then the 'Submit' button should be visible on the check deposit form
    And the 'Submit' button should be disabled

    # Attempt to interact with a disabled button; should have no effect
    When I attempt to click the disabled 'Submit' button
    Then no action should occur and the page URL should remain 'https://www.ngpf.org/bank-sim/deposit-check'

    # Verify presence/absence of validation feedback
    Then no inline error messages should be displayed near any required field
    And no elements containing the text 'error', 'required', or 'please enter' should be visible on the check deposit form
    And the check deposit form should remain visible
    And the form fields should remain empty

    # Final state
    Then the user should be blocked from submitting an incomplete check deposit due to the disabled state of the 'Submit' button