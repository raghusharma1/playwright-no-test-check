Feature: Onboarding and Account Activity Verification in NGPF Bank Simulator
  As a new user of the NGPF BankSim site,
  I want to complete onboarding and review my transaction history,
  So that I can verify my banking operations and understand account activity.

  @e2e @critical @onboarding @account_activity
  Scenario: Complete Welcome Dialog and Account Activity Review for Transaction Presence
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the homepage should be loaded successfully
    And the 'GET STARTED NOW' button should be visible

    When I click the 'GET STARTED NOW' button on the homepage
    Then I should be on the BankSim home page at URL 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'
    And the 'Welcome to the NGPF Bank' dialog should be visible

    When I focus the 'Welcome to the NGPF Bank' dialog
    Then the dialog should be active and in focus

    When I click the 'Ok' button in the 'Welcome to the NGPF Bank' dialog
    Then the dialog should be closed
    And I should remain on the BankSim dashboard page at URL 'https://www.ngpf.org/bank-sim/'

    When I click the 'ACCOUNTS expand_more' link in the main menu navigation
    Then the accounts menu options should expand
    And the 'ACCOUNT ACTIVITY' link should be visible

    When I click the 'ACCOUNT ACTIVITY' link in the expanded accounts menu
    Then the account activity section should be loaded
    And I should be on the account activity page at URL 'https://www.ngpf.org/bank-sim/account'
    And the account selection bar should show available account buttons

    When I click the 'Saving' button in the account selection bar
    Then the transaction list for the 'Saving' account should be displayed

    Then the transaction cell with ID '1100001' should be visible in the transaction table
    And no errors or interruptions should occur during this user journey