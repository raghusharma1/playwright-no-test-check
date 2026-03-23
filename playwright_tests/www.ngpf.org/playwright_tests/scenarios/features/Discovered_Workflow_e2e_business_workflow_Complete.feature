Feature: End-to-End Check Deposit Simulation at NGPF Bank Simulator
  Business Value:
    Enables students to accurately experience and validate the process of depositing checks in a simulated banking environment.
    Ensures the platform successfully tracks, posts, and confirms check deposit transactions step-by-step, reinforcing real-world financial literacy principles.

  @e2e_business_workflow @priority_high
  Scenario: Complete user journey - Deposit a check and verify posting in Account Activity
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the homepage should be fully loaded

    When I click the 'GET STARTED NOW' button in the welcome section
    Then the simulator welcome modal should be displayed

    When I click the 'Ok' button in the simulator welcome modal
    Then the dashboard and sidebar should be visible
    And I should be on the main simulator page at 'https://www.ngpf.org/bank-sim/'

    When I click the 'DEPOSIT CHECKS' menu item in the sidebar navigation
    Then the 'Deposit Checks' form should be displayed
    And I should be on the deposit check page at 'https://www.ngpf.org/bank-sim/deposit-check'

    When I open the 'To' account dropdown in the deposit check form
    Then the account selection dropdown should be expanded showing available account options

    When I select the 'CHECKING (Available Balance is $216.04)' account option
    Then the 'CHECKING' account should be selected in the form

    When I fill in the 'Amount' field with '100.00'
    Then the 'Amount' field should display the entered value '100.00'

    When I click the 'Front' button to start the check front image upload in the deposit form
    Then the modal for uploading the front of the check should be displayed

    When I click the 'close' icon in the front image modal
    Then I should return to the deposit check form and the front image requirement should be marked complete

    When I click the 'Back' button to start the check back image upload in the deposit form
    Then the modal for uploading the back of the check should be displayed

    When I click the 'close' icon in the back image modal
    Then I should return to the deposit check form and the back image requirement should be marked complete

    When I click the 'Submit' button in the deposit check form
    Then the confirmation banner 'You have successfully deposited your check.' should be visible
    And I should be on the account page at 'https://www.ngpf.org/bank-sim/account'

    Then a new record for a $100.00 deposit should appear in the Account Activity table for the 'CHECKING' account

    # Edge cases covered by additional automation scenarios:
    # - Slow modal dialogs or network latency
    # - Submission with missing image uploads (should error)
    # - Invalid or blank amount field submission (should error)
    # - User interruption prior to submission