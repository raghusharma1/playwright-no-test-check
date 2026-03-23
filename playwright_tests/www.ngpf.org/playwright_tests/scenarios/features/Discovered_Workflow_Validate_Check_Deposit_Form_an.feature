Feature: Check Deposit Validation & Error Handling in NGPF Bank Simulator
  This feature ensures that users cannot submit an incomplete check deposit form and that the interface appropriately prevents erroneous transactions. This is crucial for financial accuracy and user trust.

  @high @validation @partial_flow
  Scenario: Prevent submission of incomplete check deposit form and validate absence of inline error messages
    # --- HOMEPAGE INITIALIZATION ---
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should load and display the title containing "Bank Sim" 
    And the 'GET STARTED NOW' button should be visible in the welcome overlay

    # --- ENTERING THE APPLICATION ---
    When I click the 'GET STARTED NOW' button in the welcome overlay
    Then I should be on the home page 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'
    And the welcome modal with the 'Ok' button should be visible

    When I click the 'Ok' button in the welcome modal
    Then I should be on the main dashboard page 'https://www.ngpf.org/bank-sim/'
    And the sidebar navigation should be visible

    # --- NAVIGATE TO DEPOSIT CHECKS WORKFLOW ---
    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then I should be on the check deposit page 'https://www.ngpf.org/bank-sim/deposit-check'
    And the check deposit form should be visible

    # --- FORM FIELD VALIDATION: DO NOT ENTER DATA ---
    Then the following required fields should be present in the check deposit form:
      | Field Label          |
      | "Check Amount"       |
      | "Check Number"       |
      | "Date"               |
      | "Front of Check"     |
      | "Back of Check"      |

    # Do not interact with any of the required fields to simulate missing input

    # --- SUBMIT BUTTON STATE ---
    Then the 'Submit' button should be visible and disabled

    # --- ATTEMPT (INVALID) SUBMISSION ---
    When I attempt to click the disabled 'Submit' button in the check deposit form
    Then the URL should remain 'https://www.ngpf.org/bank-sim/deposit-check'
    And the check deposit form should still be visible

    # --- VERIFICATION: ERROR MESSAGES & VISUAL FEEDBACK ---
    Then no inline error messages should be displayed beneath or near any required check deposit form fields
    And no banners, alerts, or error notifications should be displayed on the page

    # --- FINAL STATE ---
    And the 'Submit' button should remain disabled
    And no check deposit should be created or displayed in the transaction history table