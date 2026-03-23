Feature: Review and Confirm Transfer History in NGPF Bank Simulator
  As a student or educator using the NGPF Bank Simulator,
  I want to navigate through all steps to review transfer history,
  So that I can accurately verify the presence or absence of transfer records
  for educational financial literacy exercises.

  Business Value:
    - Ensures students and educators can always validate transfer history integrity
    - Provides immediate feedback on empty-state for transfer records
    - Guards against UI regressions that obscure required navigation or empty-list handling

  @core @regression @partial_flow @transfer_history @blocker_empty_state
  Scenario: Navigate to Transfer History and verify no transfer records are present
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should be loaded and visible
    And the URL should be 'https://www.ngpf.org/bank-sim'

    When I click the 'GET STARTED NOW' button within the 'mat-card-content' section
    Then the welcome modal dialog with the title 'Welcome to Bank Simulator' should be visible

    When I click the 'Ok' button inside the 'Welcome' modal dialog
    Then the welcome modal dialog should be dismissed
    And the main simulator interface should be visible
    And the URL should be 'https://www.ngpf.org/bank-sim/'

    When I click the sidebar menu item labeled 'TRANSFERS expand_more' within the sidebar
    Then the transfers sidebar section should expand and transfer navigation items should be visible

    When I click the sidebar menu item labeled 'DISPLAY ALL TRANSFERS' within the expanded transfers section
    Then I should be on the transfer history page
    And the URL should be 'https://www.ngpf.org/bank-sim/transfer/display-transfers'
    And the page should display a table titled 'Upcoming Transfers'
    And the page should display a table titled 'Past Transfers'

    Then the 'Upcoming Transfers' table should be visible with column headers present
    And the 'Upcoming Transfers' table should show '0 of 0' records and contain no rows

    Then the 'Past Transfers' table should be visible with column headers present
    And the 'Past Transfers' table should show '0 of 0' records and contain no rows

    And no transfer record detail rows should be present in either table
    And the workflow is blocked with a visible empty-state, as no transfer records exist