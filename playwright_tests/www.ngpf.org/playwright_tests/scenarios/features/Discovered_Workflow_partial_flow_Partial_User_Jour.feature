Feature: Review and confirmation of transfer history in NGPF Bank Simulator

  As a student or educator using the NGPF Bank Simulator,
  I want to navigate to the Transfer History section,
  So that I can verify past and scheduled transfers or identify when no records are present.

  Business Value: Ensures users can access transfer records for financial literacy exercises and see accurate empty-state feedback if no transactions exist.

  @daily @transfer-history @empty-state @navigation @blocker
  Scenario: Viewing transfer history with no recorded past or scheduled transfers
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'

    # Step 1: Homepage load verification
    Then the NGPF Bank Simulator homepage should be visible
    And the page URL should be 'https://www.ngpf.org/bank-sim'

    # Step 2: Click the 'GET STARTED NOW' button
    When I click the 'GET STARTED NOW' button inside the 'mat-card-content' section
    Then the simulator welcome modal should appear
    And I should be on the page with URL 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    # Step 3: Dismiss the welcome modal by clicking the 'Ok' button
    When I click the 'Ok' button in the welcome modal dialog
    Then the welcome modal should be dismissed
    And the main simulator interface should be visible
    And the page URL should be 'https://www.ngpf.org/bank-sim/'

    # Step 4: Expand the 'TRANSFERS' section in the sidebar
    When I click the sidebar item labeled 'TRANSFERS expand_more'
    Then the transfers section in the sidebar should expand
    And the option labeled 'DISPLAY ALL TRANSFERS' should be visible

    # Step 5: Click the 'DISPLAY ALL TRANSFERS' sidebar item
    When I click the sidebar item labeled 'DISPLAY ALL TRANSFERS'
    Then the transfer history page should be visible
    And the page URL should be 'https://www.ngpf.org/bank-sim/transfer/display-transfers'
    And the tables 'Upcoming Transfers' and 'Past Transfers' should be visible

    # Step 6: Verify empty-state in transfer tables
    Then the 'Upcoming Transfers' table should be visible
    And the 'Upcoming Transfers' table should display '0 of 0' records
    And only the table column headers should be visible in the 'Upcoming Transfers' table
    And no transfer records should be shown in the 'Upcoming Transfers' table

    Then the 'Past Transfers' table should be visible
    And the 'Past Transfers' table should display '0 of 0' records
    And only the table column headers should be visible in the 'Past Transfers' table
    And no transfer records should be shown in the 'Past Transfers' table

    # Step 7: Verify workflow block due to absence of records
    Then no transfer detail or record viewing should be possible
    And the workflow should halt due to absence of past or scheduled transfers