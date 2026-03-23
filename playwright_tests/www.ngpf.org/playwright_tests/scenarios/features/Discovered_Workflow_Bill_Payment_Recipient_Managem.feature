Feature: Bill Payment Recipient Management Workflow
  As a simulated banking user practicing online banking with NGPF Bank Simulator,
  I want to add, edit, and delete bill payment recipients
  so that I can manage my payees securely and see unambiguous confirmation for every action,
  ensuring recipients are reflected accurately in the user interface at each phase.

  Background:
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    When I see the 'GET STARTED NOW' button in the landing page content area
    Then the 'GET STARTED NOW' button should be visible

  @e2e @billpay @recipient-management @critical-path
  Scenario: Complete Bill Payment Recipient Add/Edit/Delete Workflow with Banner Confirmations and State Checks

    # Step 1: Begin onboarding
    When I click the 'GET STARTED NOW' button
    Then the onboarding welcome modal dialog with the 'Ok' button should be visible
    And I should be on the URL 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    # Step 2: Dismiss onboarding modal
    When I click the 'Ok' button inside the onboarding modal
    Then I should be on the dashboard page at the URL 'https://www.ngpf.org/bank-sim/'
    And the sidebar navigation should be visible

    # Step 3: Open Bills navigation
    When I click the 'BILLS' navigation item in the sidebar
    Then the 'MANAGE RECIPIENT' link should be visible in the expanded sidebar

    # Step 4: Navigate to Manage Recipient section
    When I click the 'MANAGE RECIPIENT' link in the sidebar navigation
    Then I should be on the 'Manage Recipient' page at the URL 'https://www.ngpf.org/bank-sim/pay-bill/manage-recipient'
    And the '+ ADD RECIPIENT' button should be visible in the page content area
    And the recipients list should be empty

    # Step 5: Open Add Recipient dialog
    When I click the '+ ADD RECIPIENT' button (with visible text 'add')
    Then the 'Add Recipient' dialog modal should be displayed
    And the 'RECIPIENT NAME' input field should be visible and empty

    # Step 6: Fill Add Recipient form (atomic field entry and verification)
    When I fill in the 'RECIPIENT NAME' field with 'John Doe'
    Then the 'RECIPIENT NAME' field should contain 'John Doe'

    # Step 7: Submit Add Recipient form
    When I click the 'SUBMIT' button in the Add Recipient dialog
    Then the banner notification 'Payee updated successfully.' should be visible
    And the 'Add Recipient' dialog should close
    And I should be on the 'Manage Recipient' page at the URL 'https://www.ngpf.org/bank-sim/pay-bill/manage-recipient'
    And the recipients table should contain a recipient with name 'John Doe'
    And the recipients table should show exactly one entry

    # Step 8: Initiate Edit for the recipient
    When I click the 'Edit' link corresponding to the recipient named 'John Doe'
    Then the 'Edit Recipient' dialog modal should be visible
    And the 'RECIPIENT NAME' input should contain 'John Doe'

    # Step 9: Change recipient name in Edit dialog (atomic field update)
    When I clear the 'RECIPIENT NAME' field
    And I fill in the 'RECIPIENT NAME' field with 'Jane Smith'
    Then the 'RECIPIENT NAME' field should contain 'Jane Smith'

    # Step 10: Submit Edit Recipient dialog
    When I click the 'SUBMIT' button in the Edit Recipient dialog
    Then the banner notification 'Payee updated successfully.' should be visible
    And the 'Edit Recipient' dialog should close
    And the recipients table should contain a recipient with name 'Jane Smith'
    And the recipients table should not contain 'John Doe'

    # Step 11: Delete the recipient
    When I click the 'Delete' link corresponding to the recipient named 'Jane Smith'
    Then the banner notification 'Payee deleted successfully.' should be visible
    And the recipients table should show no entries
    And there should be no recipient named 'Jane Smith' present in the table

    # Final verification
    Then the '+ ADD RECIPIENT' button should still be visible and enabled
    And the recipients table should be empty