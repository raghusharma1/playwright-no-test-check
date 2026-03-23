Feature: Bill Payment Recipient Management Workflow
  As a consumer using the NGPF Bank Simulator
  I want to add, edit, and delete a bill payment recipient
  So that I can practice bill recipient management and see confirmation of my actions

  Background:
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I verify the page is loaded
    Then the 'GET STARTED NOW' button should be visible

  @critical @e2e @recipients
  Scenario: Complete bill payment recipient management workflow (Add, Edit, Delete with UI verifications)

    # -- Onboarding and initial navigation --
    When I click the 'GET STARTED NOW' button inside the landing card
    Then the 'Ok' button should be visible in the welcome modal
    And I should be on the onboarding welcome modal

    When I click the 'Ok' button in the welcome modal
    Then I should be on the main dashboard page with sidebar navigation
    And the 'BILLS' navigation link should be visible in the sidebar

    When I click the 'BILLS' link in the sidebar to expand bill management options
    Then the 'MANAGE RECIPIENT' link should be visible in the sidebar

    When I click the 'MANAGE RECIPIENT' link in the sidebar navigation
    Then I should be on the manage recipients page at URL 'https://www.ngpf.org/bank-sim/pay-bill/manage-recipient'
    And the '+ ADD RECIPIENT' button with text 'add' should be visible in the manage recipients panel

    # -- Add a new recipient --
    When I click the '+ ADD RECIPIENT' button with text 'add'
    Then the add recipient dialog should appear with the 'RECIPIENT NAME' input field visible

    When I fill in the 'RECIPIENT NAME' field with 'John Doe' in the add recipient dialog
    Then the 'RECIPIENT NAME' field in the add recipient dialog should display 'John Doe'

    When I click the 'SUBMIT' button in the add recipient dialog
    Then a confirmation banner with the text 'Payee updated successfully.' should be displayed
    And the recipients table should contain an entry with recipient name 'John Doe'

    # -- Edit the newly added recipient --
    When I click the 'Edit' link in the row for recipient 'John Doe'
    Then the edit recipient dialog should appear with the 'RECIPIENT NAME' field pre-filled with 'John Doe'

    When I clear the 'RECIPIENT NAME' field in the edit recipient dialog
    And I fill in the 'RECIPIENT NAME' field with 'Jane Smith' in the edit recipient dialog
    Then the 'RECIPIENT NAME' field in the edit recipient dialog should display 'Jane Smith'

    When I click the 'SUBMIT' button in the edit recipient dialog
    Then a confirmation banner with the text 'Payee updated successfully.' should be displayed
    And the recipients table should contain an entry with recipient name 'Jane Smith'
    And the recipients table should not contain an entry with recipient name 'John Doe'

    # -- Delete the recipient --
    When I click the 'Delete' link in the row for recipient 'Jane Smith'
    Then a confirmation banner with the text 'Payee deleted successfully.' should be displayed
    And the recipients table should be empty