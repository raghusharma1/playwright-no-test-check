Feature: Bank Sim Onboarding and Account Activity Verification
  @e2e @bank-sim @critical @onboarding
  This feature verifies that a new user can navigate through the Bank Sim onboarding flow, access account activity, and confirm the presence of a specific account (ID 1100001). It ensures atomic, automation-ready steps for business-critical site engagement.

  Background:
    Given I am on the homepage "https://www.ngpf.org/bank-sim"
    Then the "GET STARTED NOW" button should be visible on the homepage

  Scenario: Complete Bank Sim Onboarding and Account ID Verification
    When I click the "GET STARTED NOW" button on the homepage
    Then the Welcome dialog with the "Ok" button should appear
    And I should be on the homepage "https://www.ngpf.org/bank-sim/home?returnUrl=%2F"

    When I click the "Ok" button in the Welcome dialog
    Then the Welcome dialog should close
    And the main navigation menu should be visible
    And I should be on the main page "https://www.ngpf.org/bank-sim/"

    When I click the "ACCOUNTS expand_more" section in the left-side navigation menu
    Then the accounts submenu should expand
    And the "ACCOUNT ACTIVITY" link should be visible in the submenu
    And I should be on the main page "https://www.ngpf.org/bank-sim/"

    When I click the "ACCOUNT ACTIVITY" menu item in the accounts submenu
    Then the account activity section should appear
    And the "VIEW ACCOUNT" button in the Savings account activity bar should be visible
    And I should remain on the main page "https://www.ngpf.org/bank-sim/"

    When I click the "VIEW ACCOUNT" button in the Savings account activity bar
    Then the Savings account detail page should load
    And the account details for the Savings account should be visible
    And I should be on the account detail page "https://www.ngpf.org/bank-sim/account"

    Then the text "1100001" should be displayed on the Savings account detail page as the account ID
    And there should be no modal dialogs or overlays blocking the account detail view
    And the user session should remain active and authenticated

  # Edge Case Scenarios

  @edge-case @modal-block
  Scenario: Account ID Not Found After Onboarding Flow
    Given I am on the homepage "https://www.ngpf.org/bank-sim"
    When I click the "GET STARTED NOW" button on the homepage
    And I click the "Ok" button in the Welcome dialog
    And I click the "ACCOUNTS expand_more" section in the navigation menu
    And I click the "ACCOUNT ACTIVITY" menu item in the accounts submenu
    And I click the "VIEW ACCOUNT" button in the Savings account activity bar
    Then the text "1100001" should not be present on the Savings account detail page
    And an error message "Account ID not found" should be visible on the account detail page

  @edge-case @slow-network
  Scenario: Slow Network Delay During Account Activity Navigation
    Given I am on the homepage "https://www.ngpf.org/bank-sim"
    When I click the "GET STARTED NOW" button on the homepage
    Then the Welcome dialog with the "Ok" button should be visible within 10 seconds
    When I click the "Ok" button in the Welcome dialog
    And I wait for the accounts menu to be visible within 15 seconds
    When I click the "ACCOUNTS expand_more" section in the navigation menu
    And I click the "ACCOUNT ACTIVITY" menu item in the accounts submenu
    Then the "VIEW ACCOUNT" button in the Savings account activity bar should appear within 10 seconds
    When I click the "VIEW ACCOUNT" button in the Savings account activity bar
    Then the text "1100001" should be visible on the Savings account detail page within 15 seconds

  # Prerequisites
  # Bank Sim site must be accessible and allow session onboarding
  # Test simulation accounts must be present, with account ID "1100001" visible on Savings account
  # All elements referenced must be visible and interactable by automation tools