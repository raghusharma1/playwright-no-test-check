Feature: Bill Payment Recipient Management Workflow in NGPF Bank Simulator

  Ensures users can successfully add, edit, and delete bill payment recipients using the NGPF Bank Simulator.
  This covers every step in the business-critical recipient management flow with explicit verification of each UI change,
  confirmation banner, navigation, and visible state.
  Business Value: Guarantees that users can reliably manage bill payment recipients, supporting accurate financial simulation and UI feedback.

  @e2e
  @daily
  @recipient-management
  Scenario: Add, Edit, and Delete a Bill Payment Recipient (Complete User Journey)
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait for the page to load
    Then the page URL should be 'https://www.ngpf.org/bank-sim'
    And the 'GET STARTED NOW' button should be visible in the landing section

    When I click the 'GET STARTED NOW' button inside the landing card
    Then the welcome dialog with 'Ok' button should be displayed
    And I should be on the onboarding home page at 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    When I click the 'Ok' button in the onboarding welcome modal
    Then I should be on the main dashboard page at 'https://www.ngpf.org/bank-sim/'
    And the sidebar navigation should be visible

    When I click the 'BILLS' option in the sidebar navigation
    Then the 'MANAGE RECIPIENT' option should be visible beneath 'BILLS'

    When I click the 'MANAGE RECIPIENT' link in the expanded sidebar menu
    Then I should be on the 'Manage Recipients' page at 'https://www.ngpf.org/bank-sim/pay-bill/manage-recipient'
    And the '+ ADD RECIPIENT' button with the 'add' icon should be visible above the recipients list

    When I click the '+ ADD RECIPIENT' button in the manage recipients panel
    Then the 'Add Recipient' dialog should appear with the 'RECIPIENT NAME' field

    When I fill in the 'RECIPIENT NAME' field with 'John Doe'
    Then the 'RECIPIENT NAME' field should contain the text 'John Doe'

    When I click the 'SUBMIT' button in the add recipient dialog
    Then a confirmation banner with the message 'Payee updated successfully.' should appear
    And the recipients table should display a row with the recipient name 'John Doe'

    When I click the 'Edit' link for the 'John Doe' recipient in the recipients table
    Then the 'Edit Recipient' dialog should open with the 'RECIPIENT NAME' field pre-filled with 'John Doe'

    When I clear and fill in the 'RECIPIENT NAME' field with 'Jane Smith'
    Then the 'RECIPIENT NAME' field should contain the text 'Jane Smith'

    When I click the 'SUBMIT' button in the edit recipient dialog
    Then a confirmation banner with the message 'Payee updated successfully.' should appear
    And the recipients table should display a row with the recipient name 'Jane Smith'
    And the recipients table should not contain the name 'John Doe'

    When I click the 'Delete' link for the 'Jane Smith' recipient in the recipients table
    Then a confirmation banner with the message 'Payee deleted successfully.' should appear
    And the recipients table should not contain any recipients
    And the empty state text or message indicating "no recipients" should be visible

    # Post-condition: Recipients list is empty and all confirmation banners have appeared as expected.