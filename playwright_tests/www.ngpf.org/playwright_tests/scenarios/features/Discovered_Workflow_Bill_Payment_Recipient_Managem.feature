Feature: Bill Payment Recipient Management Workflow
  As a simulated banking user on the NGPF Bank Simulator
  I want to add, edit, and delete a bill payment recipient with full UI feedback
  So that I can manage my bill pay recipients securely and see confirmations for every change

  Business Value:
    - Ensures users can successfully manage bill payment recipients: addition, updating, deletion
    - Validates user feedback through confirmation banners and recipient list updates after each operation
    - Guarantees that critical business workflows and UI state transitions function correctly

  @critical @e2e @recipient-management
  Scenario: Add, Edit, and Delete a Bill Payment Recipient with Complete UI Verification
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I wait until the homepage is loaded

    # Onboarding sequence
    When I click the 'GET STARTED NOW' button inside the homepage card
    Then the 'Ok' welcome dialog should appear
    And I should be on the welcome modal

    When I click the 'Ok' button in the onboarding modal
    Then I should be on the main dashboard page at URL 'https://www.ngpf.org/bank-sim/'
    And the sidebar navigation should be visible

    # Navigation to Manage Recipient
    When I click the 'BILLS' sidebar navigation link with expand icon
    Then the 'MANAGE RECIPIENT' link should be visible in the sidebar

    When I click the 'MANAGE RECIPIENT' link in the sidebar
    Then I should be on the 'Manage Recipient' page at URL 'https://www.ngpf.org/bank-sim/pay-bill/manage-recipient'
    And the '+ ADD RECIPIENT' button should be available

    # Add Recipient Flow
    When I click the '+ ADD RECIPIENT' button with 'add' icon
    Then the 'Add Recipient' dialog should appear with the 'RECIPIENT NAME' field

    When I fill in the 'RECIPIENT NAME' field with 'John Doe'
    Then the 'RECIPIENT NAME' field should display 'John Doe'

    When I click the 'SUBMIT' button in the 'Add Recipient' dialog
    Then a confirmation banner with text 'Payee updated successfully.' should be visible
    And the recipients table should contain one entry with name 'John Doe'

    # Edit Recipient Flow
    When I click the 'Edit' link for the recipient named 'John Doe'
    Then the 'Edit Recipient' dialog should appear
    And the 'RECIPIENT NAME' field should be pre-filled with 'John Doe'

    When I clear the 'RECIPIENT NAME' field
    And I fill in the 'RECIPIENT NAME' field with 'Jane Smith'
    Then the 'RECIPIENT NAME' field should display 'Jane Smith'

    When I click the 'SUBMIT' button in the 'Edit Recipient' dialog
    Then a confirmation banner with text 'Payee updated successfully.' should be visible
    And the recipients table should contain one entry with name 'Jane Smith'
    And the recipients table should not contain an entry with name 'John Doe'

    # Delete Recipient Flow
    When I click the 'Delete' link for the recipient named 'Jane Smith'
    Then a confirmation banner with text 'Payee deleted successfully.' should be visible
    And the recipients table should not contain any entries

    # Final system state
    Then the '+ ADD RECIPIENT' button should still be visible on the page

  # Automation-specific IDs/Selectors for implementors (not for Gherkin execution, but for documentation)
  # GET STARTED NOW button:  page.getByRole('button', { name: 'GET STARTED NOW' })
  # Ok button in modal:      page.getByRole('button', { name: 'Ok' })
  # BILLS link (expand):     page.locator('a').filter({ hasText: 'BILLS expand_more' })
  # MANAGE RECIPIENT link:   page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' })
  # + ADD RECIPIENT button:  page.getByText('add', { exact: true })
  # RECIPIENT NAME field:    page.getByRole('textbox', { name: 'RECIPIENT NAME' })
  # SUBMIT button:           page.getByRole('button', { name: 'SUBMIT' })
  # Edit link:               page.getByText('Edit')
  # Delete link:             page.getByText('Delete')