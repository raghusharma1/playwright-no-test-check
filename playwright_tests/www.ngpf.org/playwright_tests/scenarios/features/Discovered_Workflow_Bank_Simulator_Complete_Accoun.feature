@e2e
Feature: Bank Simulator - Complete Account Exploration User Journey
  As a finance learner
  I want to explore my account activities in the bank simulator
  So that I can better understand digital banking workflows and transaction details

  Background:
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    And the page URL should be 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'
    And the 'GET STARTED NOW' button should be visible on the homepage

  @critical @navigation @account @transaction
  Scenario: User navigates through bank simulator to view Saving account transaction ID '1100001'
    When I click the 'GET STARTED NOW' button in the main content area
    Then the welcome dialog with title 'Welcome!' should be visible
    And the page URL should be 'https://www.ngpf.org/bank-sim/'
    When I click the 'Ok' button in the welcome dialog
    Then the welcome dialog should close
    And the main application interface should be visible
    When I expand the 'ACCOUNTS' section in the sidebar navigation by clicking the 'ACCOUNTS expand_more' menu item
    Then the 'ACCOUNT ACTIVITY' menu item should be visible under the 'ACCOUNTS' section
    When I click the 'ACCOUNT ACTIVITY' menu item in the sidebar navigation
    Then I should be on the 'Account Activity' page with URL 'https://www.ngpf.org/bank-sim/account'
    And the 'Saving' account bar should be visible
    When I click the 'Saving' bar on the account selection section
    Then the transaction table for the 'Saving' account should be displayed
    And the transaction table should contain a cell with transaction ID '1100001'
    And the cell with transaction ID '1100001' should be visible to the user

  # Edge Cases:
  # - Simulate slow network or delayed UI components and verify step-by-step appearance
  # - All selectors are to be resolved with explicit waits in automation code