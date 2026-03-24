Feature: BankSim Onboarding and Account Activity Workflow
  Business Value: Ensure students can successfully start BankSim, navigate through onboarding dialogs, access account activity, select Saving account, and verify transaction visibility. This guarantees core banking simulation functionality is available and reliable for users.

  @critical @onboarding @account-activity @ui @bank-sim
  Scenario: Complete BankSim onboarding and view Saving account transaction activity
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should have the 'GET STARTED NOW' button visible in the landing area

    When I click the 'GET STARTED NOW' button in the landing card
    Then the 'Welcome Dialog' should appear with the option 'CONTINUE SESSION' displayed
    And the URL should be 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    When I click the 'CONTINUE SESSION' button in the Welcome Dialog
    Then the 'Ok' button should be visible in the Welcome Dialog
    And the URL should remain 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    When I click the 'Ok' button in the Welcome Dialog
    Then the Welcome Dialog should close
    And the main BankSim dashboard should be displayed
    And the URL should be 'https://www.ngpf.org/bank-sim/'

    When I click the 'ACCOUNTS expand_more' menu item in the drawer menu
    Then the Accounts drawer section should expand and show account links

    When I click the 'ACCOUNT ACTIVITY' link in the Accounts drawer
    Then the Account Activity section should load in the main area
    And the URL should be 'https://www.ngpf.org/bank-sim/'

    When I click the 'VIEW ACCOUNT' button for the Saving account entry in the Account Activity list
    Then the Saving account details panel should be displayed
    And the URL should be 'https://www.ngpf.org/bank-sim/account'

    When I click the 'Saving' button in the account bar for account selection
    Then the Saving account should become active and highlighted
    And the Saving account details area should be visible
    And the URL should remain 'https://www.ngpf.org/bank-sim/account'

    Then the account activity table should contain a cell with ID '1100001' visible
    And the transaction row for cell '1100001' should display correct activity details
    And there should be no errors present on the page

  # Edge case tests can be implemented in extension scenarios, e.g. slow network or interruptions