Feature: Simulated Check Deposit Workflow - NGPF Bank Simulator
  This feature verifies the precise end-to-end experience for a student user simulating a check deposit. It covers atomic actions from initial navigation, entering the simulation, stepwise deposit, mandatory image handling, through success confirmation and account activity verification. Ensures the simulator is reliably usable for financial literacy practice.

  @critical @e2e @bank_sim @deposit_workflow
  Scenario: Complete Check Deposit Simulation - Primary Business Workflow
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'

    When I click the 'GET STARTED NOW' button in the Welcome Menu section
    Then the simulator welcome modal should be displayed
    And I should be on the homepage with URL 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    When I click the 'Ok' button in the Welcome Modal dialog
    Then I should see the dashboard and sidebar navigation elements
    And I should be on the main simulator page with URL 'https://www.ngpf.org/bank-sim/'

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation menu
    Then the 'Deposit Checks' form should be displayed
    And I should be on the deposit check page with URL 'https://www.ngpf.org/bank-sim/deposit-check'

    When I open the 'To' account dropdown in the Deposit Checks form
    Then the account dropdown menu should be expanded with available account options

    When I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    Then the deposit form should display the selected account details

    When I fill in the 'Amount' field with '100.00'
    Then the 'Amount' field should contain the value '100.00'

    When I click the 'Front' button to upload the check front image in the check image upload section
    Then the modal for uploading or displaying the check's front image should be visible

    When I click the 'close' icon in the front image modal dialog
    Then the deposit form should be visible and ready for the next step

    When I click the 'Back' button to upload the check back image in the check image upload section
    Then the modal for uploading or displaying the check's back image should be visible

    When I click the 'close' icon in the back image modal dialog
    Then the deposit form should be visible and ready for submission

    When I click the 'Submit' button in the Check Deposit Submit section
    Then a confirmation banner with the text 'You have successfully deposited your check.' should be displayed
    And I should be on the account activity page with URL 'https://www.ngpf.org/bank-sim/account'

    Then the Account Activity section should display a new record for a deposit of $100.00 to the CHECKING account

  # Edge cases to consider for robustness, included as scenario outlines for automation completeness

  @edge_case @bank_sim @deposit_workflow
  Scenario Outline: Attempt Deposit With Missing Check Image - Should Error
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the Welcome Menu section
    And I click the 'Ok' button in the Welcome Modal dialog
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation menu
    And I open the 'To' account dropdown in the Deposit Checks form
    And I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    And I fill in the 'Amount' field with '<amount>'
    When I click the 'Submit' button in the Check Deposit Submit section
    Then an error message should be displayed indicating that '<missing_image_side>' image upload is required
    Examples:
      | amount   | missing_image_side |
      | 100.00   | Front             |
      | 100.00   | Back              |

  @edge_case @bank_sim @deposit_workflow
  Scenario Outline: Attempt Deposit With Invalid Amount - Should Error
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the Welcome Menu section
    And I click the 'Ok' button in the Welcome Modal dialog
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation menu
    And I open the 'To' account dropdown in the Deposit Checks form
    And I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    And I fill in the 'Amount' field with '<invalid_amount>'
    And I click the 'Front' button to upload the check front image in the check image upload section
    And I click the 'close' icon in the front image modal dialog
    And I click the 'Back' button to upload the check back image in the check image upload section
    And I click the 'close' icon in the back image modal dialog
    When I click the 'Submit' button in the Check Deposit Submit section
    Then an error message should be displayed indicating the amount '<invalid_amount>' is invalid
    Examples:
      | invalid_amount |
      | -50.00        |
      |               |
      | ABCDE         |

  @robustness @bank_sim @deposit_workflow
  Scenario: Interrupt Deposit Workflow Before Submission
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the Welcome Menu section
    And I click the 'Ok' button in the Welcome Modal dialog
    And I click the 'DEPOSIT CHECKS' link in the sidebar navigation menu
    And I open the 'To' account dropdown in the Deposit Checks form
    And I select the 'CHECKING (Available Balance is $216.04)' option from the account dropdown
    And I fill in the 'Amount' field with '100.00'
    And I click the 'Front' button to upload the check front image in the check image upload section
    And I click the 'close' icon in the front image modal dialog
    And I click the 'Back' button to upload the check back image in the check image upload section
    And I click the 'close' icon in the back image modal dialog
    When I navigate away to the homepage 'https://www.ngpf.org/bank-sim'
    Then the deposit form should not be submitted
    And no new deposit record should appear in the Account Activity section

  # Prerequisites
  # - Site must be accessible at https://www.ngpf.org/bank-sim
  # - Simulator account and required UI must be functional