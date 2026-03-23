Feature: Check Deposit Simulation - End-to-End Workflow
  Ensures users can fully simulate depositing a check, including all UI interactions, data processing, and successful posting confirmation, reinforcing financial literacy objectives.

  @e2e_business_workflow @high_priority
  Scenario: Complete Check Deposit Simulation with Account Activity Verification
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the homepage to load fully
    Then the homepage should display the 'GET STARTED NOW' button

    When I click the 'GET STARTED NOW' button in the welcome section
    Then a simulator welcome modal should appear

    When I click the 'Ok' button on the simulator welcome modal
    Then the dashboard and sidebar should be fully visible
    And I should be on the dashboard page at 'https://www.ngpf.org/bank-sim/'

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then the 'Deposit Checks' form should be displayed
    And I should be on the deposit check page 'https://www.ngpf.org/bank-sim/deposit-check'

    When I click the 'To' account dropdown in the deposit form
    Then the account selection dropdown menu should expand
    And the account option 'CHECKING (Available Balance is $216.04)' should be visible

    When I select the 'CHECKING (Available Balance is $216.04)' option from the dropdown
    Then the deposit form should display 'Amount' field and image upload buttons

    When I fill in the 'Amount' field with '100.00'
    Then the 'Amount' field should display the value '100.00'

    When I click the 'Front' button to open the front check image modal
    Then a modal for uploading or displaying the front check image should appear

    When I click the 'close' icon on the front check image modal
    Then the modal should close
    And I should return to the deposit form

    When I click the 'Back' button to open the back check image modal
    Then a modal for uploading or displaying the back check image should appear

    When I click the 'close' icon on the back check image modal
    Then the modal should close
    And I should return to the deposit form

    When I click the 'Submit' button on the deposit form
    Then a confirmation banner with text 'You have successfully deposited your check.' should be displayed
    And I should be on the account activity page 'https://www.ngpf.org/bank-sim/account'
    And the account activity table should display a new record for a deposit of '$100.00'
    And there should be no errors, warnings, or failed modal transitions at any step

  @business_edge_cases
  Scenario Outline: Edge Case Handling for Deposit Workflow Validations
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the homepage to load fully
    And I click the 'GET STARTED NOW' button in the welcome section
    And I click the 'Ok' button on the simulator welcome modal
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    And I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    And I fill in the 'Amount' field with '<amount>'
    And <front_upload_step>
    And <back_upload_step>
    And I click the 'Submit' button on the deposit form
    Then <expected_result>

    Examples:
      | amount    | front_upload_step                                      | back_upload_step                                      | expected_result                                                                                             |
      | -50.00    | I do not upload a front check image                    | I do not upload a back check image                    | an error message stating 'Amount must be positive' should be displayed                                      |
      |           | I upload a front check image and close the modal       | I upload a back check image and close the modal       | an error message stating 'Amount is required' should be displayed                                           |
      | 100.00    | I do not upload a front check image                    | I upload a back check image and close the modal       | an error message stating 'Both front and back check images must be uploaded' should be displayed            |
      | 100.00    | I upload a front check image and close the modal       | I do not upload a back check image                    | an error message stating 'Both front and back check images must be uploaded' should be displayed            |
      | abc       | I upload a front check image and close the modal       | I upload a back check image and close the modal       | an error message stating 'Amount must be numeric' should be displayed                                       |
      | 100.00    | I upload a front check image and close the modal       | I upload a back check image and close the modal       | a confirmation banner with text 'You have successfully deposited your check.' should be displayed           |

  @ui_validation
  Scenario: Ensure All Navigation and Modal Dialogs Are Responsive to User Actions
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the welcome section
    And the simulator welcome modal should appear within 5 seconds
    When I click the 'Ok' button on the simulator welcome modal
    And the dashboard and sidebar should be visible within 3 seconds
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    When I click the 'Front' button on the deposit form
    Then the front image modal should appear without delay
    When I click the 'close' icon on the front image modal
    Then the deposit form should be displayed immediately
    When I click the 'Back' button on the deposit form
    Then the back image modal should appear without delay
    When I click the 'close' icon on the back image modal
    Then the deposit form should be displayed immediately

  @data_validation
  Scenario Outline: Amount Field Input Validation During Check Deposit
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the welcome section
    And I click the 'Ok' button on the simulator welcome modal
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    And I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    When I fill in the 'Amount' field with '<input_value>'
    Then the deposit form should display '<input_value>' in the 'Amount' field
    And the 'Submit' button should be <submit_enabled>
    And if <input_error_message> is expected, the error message should be displayed

    Examples:
      | input_value | submit_enabled | input_error_message                 |
      | 100.00      | enabled        |                                    |
      | -12.50      | disabled       | Amount must be positive             |
      | abc         | disabled       | Amount must be numeric              |
      |             | disabled       | Amount is required                  |