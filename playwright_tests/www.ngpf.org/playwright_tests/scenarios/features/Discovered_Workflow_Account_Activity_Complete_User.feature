Feature: Bank Sim Account Activity Workflow
  As a student user of the NGPF Bank Sim,
  I want to start the simulator, complete onboarding dialogs,
  navigate to my account activity, and verify my transactions exist,
  so I gain confidence that the platform accurately tracks my finances.

  @critical @business_workflow @account_activity @ngpf_banksim
  Scenario: Complete User Workflow from Homepage to Savings Account Transaction Verification
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the 'GET STARTED NOW' button should be visible

    When I click the 'GET STARTED NOW' button in the main welcome card
    Then the 'GET STARTED NOW' button should disappear
    And the 'CONTINUE SESSION' dialog should be visible

    When I click the 'CONTINUE SESSION' button in the onboarding dialog
    Then the onboarding dialog should close
    And the 'Ok' button in the welcome modal should be visible

    When I click the 'Ok' button in the welcome modal dialog
    Then the welcome modal should close
    And the dashboard should be visible
    And I should be on the homepage 'https://www.ngpf.org/bank-sim/'

    When I click the 'ACCOUNTS expand_more' menu button in the dashboard side navigation
    Then the 'ACCOUNTS' section should expand
    And the 'ACCOUNT ACTIVITY' menu item should be visible

    When I click the 'ACCOUNT ACTIVITY' menu item in the expanded accounts section
    Then the 'ACCOUNT ACTIVITY' page or section should be displayed
    And the 'VIEW ACCOUNT' button in the Saving Account Bar should be visible

    When I click the 'VIEW ACCOUNT' button in the Saving Account Bar
    Then the Savings Account activity table should load
    And I should be on the account activity page 'https://www.ngpf.org/bank-sim/account'

    Then the transaction cell with ID '1200001' should be present and visible in the Savings Account activity table