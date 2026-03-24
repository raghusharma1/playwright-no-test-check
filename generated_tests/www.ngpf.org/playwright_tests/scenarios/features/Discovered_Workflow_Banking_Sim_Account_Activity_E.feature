Feature: Bank Sim Onboarding and Account Activity End-to-End Workflow
  As a student user of NGPF Bank Sim,
  I want to complete onboarding and review my Saving account activity,
  So that I can learn critical banking features and track my financial transactions.

  Background:
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the homepage should be loaded and visible
    And the page URL should be 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

  @critical @onboarding @e2e @account-activity
  Scenario: Complete onboarding and access Saving account activity details

    # Step 1: Start onboarding by clicking "GET STARTED NOW"
    When I click the 'GET STARTED NOW' button in the Welcome Screen
    Then the Welcome dialog should appear
    And the page URL should remain 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    # Step 2: Dismiss the Welcome dialog by clicking "Ok"
    When I click the 'Ok' button in the Welcome dialog
    Then the Welcome dialog should close
    And the main menu should be accessible
    And the page URL should be 'https://www.ngpf.org/bank-sim/'

    # Step 3: Expand the Accounts menu
    When I click the 'ACCOUNTS expand_more' menu item in the Navigation Menu
    Then the 'ACCOUNT ACTIVITY' menu item should be revealed
    And the page URL should still be 'https://www.ngpf.org/bank-sim/'

    # Step 4: Navigate to Account Activity
    When I click the 'ACCOUNT ACTIVITY' menu item in the Navigation Menu
    Then the Account Activity section should load and be visible
    And the page URL should remain 'https://www.ngpf.org/bank-sim/'

    # Step 5: Select the Saving account
    When I click the 'Saving' button in the Account Activity Bar
    Then the account activity table for Saving accounts should be displayed
    And the page URL should be 'https://www.ngpf.org/bank-sim/account'

    # Step 6: Verify and select Saving account cell
    Then the table should contain a cell with Account ID '1100001'
    When I click the account cell with Account ID '1100001' in the account activity table
    Then the account details for Account ID '1100001' should be visible
    And the page URL should remain 'https://www.ngpf.org/bank-sim/account'

  # Edge Cases:
  #
  # - Simulate slow network conditions and verify all dialogs and menu items load as expected
  # - Ensure overlays or popups do not obscure critical buttons (such as GET STARTED NOW, Ok, or menu items)
  
  # Data Requirements:
  # - Test uses valid demo student account and standard onboarding dialogs
  #
  # Prerequisites:
  # - The Bank Sim site is publicly accessible at 'https://www.ngpf.org/bank-sim'