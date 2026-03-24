Feature: BankSim Onboarding and Account Activity Navigation
  As a new user on BankSim
  I want to complete the onboarding flow and navigate to my Account Activity for the 'Saving' account
  So that I can confirm onboarding completion and verify that account data is visible

  @e2e @Critical @Onboarding @AccountActivity @Regression
  Scenario: Complete onboarding and verify viewing Account Activity for Savings account

    # Step 1 – Homepage Initialization (MANDATORY)
    Given I am on the homepage "https://www.ngpf.org/bank-sim"
    Then the "GET STARTED NOW" button should be visible in the main content section

    # Step 2 – Onboarding Entry
    When I click the "GET STARTED NOW" button in the main content section
    Then the "Welcome Dialog" modal should be visible with the "Ok" button

    # Step 3 – Close Welcome Dialog
    When I click the "Ok" button in the "Welcome Dialog" modal
    Then the "Welcome Dialog" modal should no longer be visible
    And the main navigation sidebar should be visible

    # Step 4 – Expand Accounts Menu
    When I click the "ACCOUNTS expand_more" menu item in the main navigation sidebar
    Then the "ACCOUNT ACTIVITY" link should be visible under the expanded Accounts menu

    # Step 5 – Navigate to Account Activity
    When I click the "ACCOUNT ACTIVITY" link under the Accounts menu
    Then I should be on the "Account Activity" page at URL "https://www.ngpf.org/bank-sim/account"
    And the account selector bar with "Saving", "Checking", and other options should be visible

    # Step 6 – Select Savings Account
    When I click the "Saving" button in the account selector bar
    Then the account activity table for the "Saving" account should be visible

    # Step 7 – Verify Account Row Presence
    Then the account activity table should contain a cell with ID "1100001"

    # End state: The user has initiated onboarding and verified the presence of a known account row for "Saving"