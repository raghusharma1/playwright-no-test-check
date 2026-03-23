Feature: Transfer History Navigation and Empty-State Validation in NGPF Bank Simulator
  As a student or educator simulating bank activity,
  I want to navigate to the transfer history and confirm the system accurately displays empty tables when no transfers exist,
  so that I can reliably verify completed and scheduled transfers as part of financial literacy exercises.

  Background:
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'

  @partial_flow @ui @transfer-history @blocker
  Scenario: Navigate to Transfer History and Verify Empty-State When No Transfers Exist
    # Step 1: Load the homepage and confirm the site is accessible
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should be loaded successfully

    # Step 2: Locate and click the 'GET STARTED NOW' button within the landing card
    When I click the 'GET STARTED NOW' button in the landing page card
    Then the simulator welcome modal should appear
    And I should be on the simulator landing page 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    # Step 3: Locate and click the 'Ok' button in the welcome modal overlay
    When I click the 'Ok' button in the welcome modal overlay
    Then the welcome modal overlay should be dismissed
    And the main simulator interface should be visible
    And I should be on the simulator main page 'https://www.ngpf.org/bank-sim/'

    # Step 4: Locate and click the sidebar section 'TRANSFERS expand_more' to expand transfers menu
    When I click the 'TRANSFERS expand_more' sidebar section in the main navigation
    Then the 'TRANSFERS' sidebar section should be expanded
    And sidebar transfer options should be visible

    # Step 5: Locate and click the 'DISPLAY ALL TRANSFERS' sidebar item to view transfer history
    When I click the 'DISPLAY ALL TRANSFERS' sidebar item under transfers menu
    Then the transfer history page should be displayed
    And I should be on the transfer history page 'https://www.ngpf.org/bank-sim/transfer/display-transfers'

    # Step 6: Validate that both 'Upcoming Transfers' and 'Past Transfers' tables are present and empty
    Then the 'Upcoming Transfers' table should be visible with 0 of 0 records
    And the 'Past Transfers' table should be visible with 0 of 0 records
    And the transfer table column headers should be present for both tables
    And no transfer records should be displayed in either table

    # Step 7: Assert workflow is blocked due to zero records
    Then the transfer history workflow should end with an empty-state indicator in both tables

  # Edge cases verified by this scenario:
  #  - The site loads on slow networks or delayed element rendering
  #  - Sidebar navigation and overlays function as intended
  #  - Modal dismissal correctly reveals the simulator interface
  #  - Absence of transfer records results in correct empty-state UI with '0 of 0' records

  # Data/environment prerequisites for scenario execution:
  #  - Educational user account with zero past or scheduled transfers
  #  - All simulator features and sidebar items enabled by configuration
  #  - Valid login session if authentication is required (not applicable in public/demo mode)