Feature: Review Transfer History with No Existing Transfers in NGPF Bank Simulator
  As a student or educator using the NGPF Bank Simulator,
  I want to review my transfer history,
  So that I can verify past and upcoming bank transfers as part of educational financial literacy exercises.
  This feature ensures users are presented with accurate 'empty state' UI when no transfers are present,
  preventing confusion and confirming the workflow is blocked until transfers are scheduled or completed.

  @smoke @navigation @emptyState @bankSim
  Scenario: Navigate to Transfer History and Validate Empty State Due to No Transfers
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'

    # Step 1: Homepage load verification
    Then the page should be loaded with the NGPF Bank Simulator homepage visible
    And the URL should be 'https://www.ngpf.org/bank-sim'
    And the button with text 'GET STARTED NOW' should be visible in the landing card

    # Step 2: Begin simulator workflow
    When I click the 'GET STARTED NOW' button within the homepage landing card
    Then the simulator welcome modal should appear
    And the button with text 'Ok' should be visible within the modal

    # Step 3: Dismiss simulator welcome modal
    When I click the 'Ok' button within the welcome modal overlay
    Then the simulator welcome modal should close
    And the main simulator interface should be displayed
    And the sidebar navigation should be visible

    # Step 4: Expand 'TRANSFERS' section in the sidebar
    When I click the 'TRANSFERS expand_more' sidebar item within the sidebar navigation
    Then the 'TRANSFERS' section in the sidebar should expand
    And the sidebar item with text 'DISPLAY ALL TRANSFERS' should be visible under 'TRANSFERS'

    # Step 5: Open the Transfer History view
    When I click the 'DISPLAY ALL TRANSFERS' item within the expanded 'TRANSFERS' sidebar section
    Then I should be on the Transfer History page
    And the URL should be 'https://www.ngpf.org/bank-sim/transfer/display-transfers'
    And the tables labeled 'Upcoming Transfers' and 'Past Transfers' should be visible on the page

    # Step 6: Validate empty state for transfer tables
    Then the 'Upcoming Transfers' table should have column headers displayed
    And the 'Upcoming Transfers' table should show '0 of 0' records
    And the 'Past Transfers' table should have column headers displayed
    And the 'Past Transfers' table should show '0 of 0' records

    # Step 7: Blocked workflow validation
    Then no transfer record rows should be present in either 'Upcoming Transfers' or 'Past Transfers' table
    And no transfer detail or action buttons should be visible for empty tables
    And an appropriate empty state UI should indicate no past or scheduled transfers

    # Final Step: Block acknowledgment
    Then the workflow should end in a blocked state due to absence of transfer records