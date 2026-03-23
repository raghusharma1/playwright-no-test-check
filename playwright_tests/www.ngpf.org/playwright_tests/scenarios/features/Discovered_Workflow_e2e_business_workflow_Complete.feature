Feature: Deposit Check Simulation - End-to-End Workflow
  Ensures users can simulate depositing a check into their account and verify posting via Account Activity, reinforcing financial literacy.

  @e2e @deposit @bank-sim @daily
  Scenario: Complete Deposit Check Workflow and Verify Account Posting
    Given I am on the homepage 'https://www.ngpf.org/bank-sim'
    Then the page should be loaded successfully

    When I click the 'GET STARTED NOW' button in the Welcome Menu
    Then the simulator welcome modal should be displayed
    And I should be on the page 'https://www.ngpf.org/bank-sim/home?returnUrl=%2F'

    When I click the 'Ok' button in the Welcome Modal
    Then the dashboard and sidebar navigation should be fully visible
    And I should be on the page 'https://www.ngpf.org/bank-sim/'

    When I click the 'DEPOSIT CHECKS' link in the sidebar navigation
    Then the 'Deposit Checks' form should appear
    And I should be on the page 'https://www.ngpf.org/bank-sim/deposit-check'

    When I open the 'To' account dropdown in the Deposit Checks form
    Then the 'To' account dropdown options should be displayed

    When I select the 'CHECKING (Available Balance is $216.04)' option from the 'To' account dropdown
    Then the deposit form should be ready for entering the amount and uploading check images

    When I fill in the 'Amount' field with '100.00'
    Then the amount '100.00' should be present in the 'Amount' input field

    When I click the 'Front' button to upload the front side of the check
    Then the modal to upload/display the front check image should open

    When I close the modal displaying the front check image by clicking the 'close' icon
    Then I should return to the deposit form with the front image uploaded

    When I click the 'Back' button to upload the back side of the check
    Then the modal to upload/display the back check image should open

    When I close the modal displaying the back check image by clicking the 'close' icon
    Then I should return to the deposit form with both front and back images uploaded

    When I click the 'Submit' button in the Deposit Checks form
    Then a confirmation banner with the text 'You have successfully deposited your check.' should be visible
    And I should be on the page 'https://www.ngpf.org/bank-sim/account'

    Then a new record for a $100.00 deposit should appear in the Account Activity section

  # Edge Cases to be covered in additional scenarios (not included here):
  # - Submitting without uploading either check image should produce an error
  # - Entering invalid values (negative, blank, or non-numeric) in 'Amount' should produce a validation error
  # - Workflow interruption before submission should not result in deposit posting
  # - Handling slow network or modal lag should not break the workflow

  # Data Requirements:
  # - Valid simulator test account present
  # - Amount input must accept only numeric, positive values
  # - Image uploads must simulate as successful when click actions are performed

  # Prerequisites:
  # - Site is accessible at 'https://www.ngpf.org/bank-sim'
  # - No modal, navigation, or service outages