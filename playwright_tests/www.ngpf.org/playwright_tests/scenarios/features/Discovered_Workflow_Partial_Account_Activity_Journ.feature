Feature: NGFP BankSim - Account Activity Navigation Workflow
  As a student user,
  I want to successfully navigate from the NGFP BankSim homepage through onboarding dialogs and account navigation,
  So that I can access my savings account activity and learn to use online banking tools.

  @critical
  Scenario: Partial Account Activity Journey - Onboarding to Savings Account Table (Steps 1-7, Atomic)
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to be fully loaded
    Then the page should display the heading 'BankSim: Online Banking Simulation'
    And the 'GET STARTED NOW' button should be visible

    When I click the 'GET STARTED NOW' button in the welcome landing section
    Then the 'GET STARTED NOW' button should disappear
    And the welcome dialog with the 'CONTINUE SESSION' button should be visible

    When I click the 'CONTINUE SESSION' button in the welcome dialog/modal
    Then the welcome dialog should close
    And the second onboarding dialog with the 'Ok' button should appear

    When I click the 'Ok' button in the onboarding dialog
    Then the onboarding dialog should close
    And the sidebar menu titled 'ACCOUNTS expand_more' should be visible

    When I click the 'ACCOUNTS expand_more' link in the sidebar menu
    Then the 'ACCOUNTS' submenu should expand
    And the 'ACCOUNT ACTIVITY' menu option should be displayed within the expanded submenu

    When I click the 'ACCOUNT ACTIVITY' link in the expanded accounts submenu
    Then the account activity view should load
    And the savings account 'VIEW ACCOUNT' bar should be visible

    When I click the 'VIEW ACCOUNT' button in the savings bar section
    Then the savings account view page should load at 'https://www.ngpf.org/bank-sim/account'
    And the savings account transaction table should be visible

  @edge @negative
  Scenario: Edge Case - Slow Network Delayed Modal Load
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I artificially slow network speed to simulate latency
    And I click the 'GET STARTED NOW' button in the welcome landing section
    Then the welcome dialog should take longer than usual to appear
    And the 'CONTINUE SESSION' button should eventually be visible

  @edge @negative
  Scenario: Edge Case - Sidebar Fails to Expand
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the welcome landing section
    And I click the 'CONTINUE SESSION' button in the welcome dialog/modal
    And I click the 'Ok' button in the onboarding dialog
    And I click the 'ACCOUNTS expand_more' link in the sidebar menu
    Then the 'ACCOUNTS' submenu should expand
    But if the submenu does NOT expand
    Then an error message or UI alert should be displayed
    And the 'ACCOUNT ACTIVITY' option should not be visible

  @edge @negative
  Scenario: Edge Case - Account Activity Option Missing
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the welcome landing section
    And I click the 'CONTINUE SESSION' button in the welcome dialog/modal
    And I click the 'Ok' button in the onboarding dialog
    And I click the 'ACCOUNTS expand_more' link in the sidebar menu
    Then the 'ACCOUNTS' submenu should expand
    But if the 'ACCOUNT ACTIVITY' menu option is not present
    Then a warning should be displayed to the user
    And the user should not be able to proceed to savings account activity

  @edge @negative
  Scenario: Edge Case - Unexpected Modal Overlay
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I click the 'GET STARTED NOW' button in the welcome landing section
    And an unexpected modal overlay appears blocking further interaction
    Then no UI elements should be interactable except closing the overlay
    When I close the unexpected modal overlay
    Then normal navigation should resume
    And the 'CONTINUE SESSION' button in the welcome dialog should be visible

  @prerequisite
  Scenario: Prerequisite Validation - Test Account Session
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I initiate a simulation session
    Then the session should be valid and active
    And no expired token or session error messages should be displayed
    And all UI features should be enabled for test accounts

  @verifications
  Scenario: Verification - UI Components Display and No Errors
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I proceed through the onboarding dialogs
    And I access the 'ACCOUNT ACTIVITY' view for Savings
    Then all expected UI components (sidebars, account bars, and tables) should be visible
    And no UI errors, warnings, or missing elements should be present