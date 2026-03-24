Feature: NGPF Banking Simulator - End-to-End User Journey
  As a student user,
  I want to interact with the NGPF Banking Simulator
  So that I can learn key online banking, transaction, transfer, and shopping workflows with business logic and UI verifications.

  @critical @business_workflow
  Scenario: Banking Simulator - Core Functional Navigations and Interactions

    # HOMEPAGE INITIALIZATION
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should be loaded successfully
    And the 'GET STARTED NOW' button should be visible

    # START SESSION
    When I click the 'GET STARTED NOW' button inside the 'mat-card-content' section
    Then I should be on the Banking Simulator landing page at 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'
    And the main onboarding action button should be visible

    # CONTINUE ONBOARDING
    When I click the visible primary onboarding action button
    Then the main banking dashboard should be displayed
    And the Checking Account card with 'VIEW ACCOUNT' button should be visible

    # VIEW CHECKING ACCOUNT DETAILS
    When I click the 'VIEW ACCOUNT' button for the Checking Account inside the 'mat-card-content' section
    Then I should be on the Checking Account detail page at 'https://www.ngpf.org/bank-sim/account?type=checking'
    And the transaction table and search field with placeholder 'Search' should be visible

    # EDGE CASE SEARCH - CHECKING ACCOUNT
    When I fill in the 'Search' field with 'INVALID_SEARCH_#$@!' in the Checking Account detail view
    Then no matching transactions should be shown
    And a validation message or feedback should be displayed indicating no results

    # DELETE ICON INTERACTION - CHECKING ACCOUNT
    When I click the 'close' icon inside the transaction row of the Checking Account page
    Then no feedback message should be displayed after the icon click
    And the transaction should remain unchanged

    # SIDEBAR NAVIGATION - TRANSFERS
    When I click the 'TRANSFERS expand_more' link in the sidebar navigation inside 'app-menu-list-item'
    Then the Transfers section should be visible on the Checking Account detail page

    # SIDEBAR NAVIGATION - DISPLAY ALL TRANSFERS
    When I click the 'DISPLAY ALL TRANSFERS' link in the sidebar navigation inside 'app-menu-list-item'
    Then I should be on the Transfer Dashboard page at 'https://www.ngpf.org/bank-sim/transfer/display-transfers'
    And the account selector buttons 'Checking' and 'Saving' should be visible

    # ACCOUNT SELECTOR - CHECKING IN TRANSFER DASHBOARD
    When I click the 'Checking' button in the Transfer Dashboard inside 'app-choose-account'
    Then the Checking Transfer table should be displayed and focused

    # EDGE CASE SEARCH - TRANSFER DASHBOARD
    When I fill in the 'Search' field with '&&&INVALID_SEARCH&&&' in the upcoming transfers section (field id '#mat-input-2')
    Then no matching transfers should be shown
    And no error or validation message should appear

    # ACCOUNT SELECTOR - SAVING IN TRANSFER DASHBOARD
    When I click the 'Saving' button in the Transfer Dashboard inside 'app-choose-account'
    Then the Saving Transfer table should be displayed and focused

    # EDGE SUBMISSION - SAVING IN TRANSFER DASHBOARD
    When I click the 'close' button inside the transfer form for Saving account in 'app-choose-account'
    Then no error or validation message should appear after submission

    # PAGINATION CHANGE - PAST TRANSFERS
    When I select '10' in the items per page dropdown for past transfers (dropdown id '#mat-select-4')
    Then the transfer table should update to show 10 items per page

    # PAGINATION CHANGE - TO ANOTHER VALUE
    When I select the option '15' in the items per page dropdown in the past transfers listbox
    Then the transfer table should update to show 15 items per page

    # SIDEBAR NAVIGATION - SHOPPING
    When I click the 'SHOPPING' link in the sidebar navigation inside 'app-menu-list-item'
    Then I should be on the Shopping page at 'https://www.ngpf.org/bank-sim/online-shop'
    And the shopping cart items and checkboxes should be visible

    # SHOPPING CART ITEM SELECTION - SMOOTHIE BOOST
    When I click the checkbox for 'Smoothie Boost' item (checkbox id '#mat-checkbox-21')
    Then the checkbox for 'Smoothie Boost' should be checked

    # SHOPPING CART ITEM SELECTION - SIT & EAT
    When I click the checkbox for 'Sit & Eat' item (checkbox id '#mat-checkbox-22')
    Then the checkbox for 'Sit & Eat' should be checked

    # SHOPPING CART ITEM SELECTION - GLAM BEAUTY
    When I click the checkbox for 'Glam Beauty' item (checkbox id '#mat-checkbox-24')
    Then the checkbox for 'Glam Beauty' should be checked

    # SHOPPING CART SUBMISSION
    When I click the 'Save' button in the shopping cart modal inside 'app-money-quiz'
    Then the selection should be submitted
    And a visible success message should be displayed indicating "Transactions added successfully"
    And I should be on the account page at 'https://www.ngpf.org/bank-sim/account'