# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 6
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-23 17:55:36

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
_A comprehensive, end-to-end test validating a complete user funds transfer workflow between Checking and Saving accounts. This scenario demonstrates navigation, form entry, validation of UI feedback, and transaction history auditing. The journey fully exercises onboarding, sidebar navigation, dynamic form handling, controlled input, and consecutive UI state validations for both confirmation and audit trail integrity in the Bank Simulator._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: e2e, transfer, workflow, ui-confirmation, history-validation, navigation, form-submission, onboarding  
**Est. Execution Time**: 75 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/transfer
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Navigate to homepage.
- Click 'GET STARTED NOW' on the landing page.
- Dismiss onboarding modal by clicking 'Ok'.
- Expand 'TRANSFERS' in the sidebar.
- Click 'MAKE A TRANSFER' to bring up the transfer form.
- Open the 'PAYMENT FREQUENCY' dropdown.
- Select 'SINGLE' in the dropdown.
- Open the 'Transfer From' dropdown.
- Select 'CHECKING ($216.04)'.
- Open the 'Transfer To' dropdown.
- Select 'SAVING ($230.00)'.
- Input transfer amount '50'.
- Set the payment date to '3/22/2026'.
- Click 'Save' to submit transfer.
- Validate confirmation snackbar displays transfer success and transaction appears in Past Transfers table.

#### Expected Results:
- User completes workflow; transfer form is submitted and confirmation message is visible.
- Past Transfers table displays a new transaction entry reflecting the transfer.
- No errors are encountered.

---

### 2. Discovered Workflow: Account Activity - Complete User Journey
_This scenario provides a complete verification of the user’s journey from landing, through onboarding dialogs, carefully navigating sidebar menus, to the Account Activity page. It validates the presence of expected transaction entries, guarantees workflow correspondence with path discovery, and assures that agent-captured actions result in a seamless, error-free journey for users auditing their account records._

**Complexity**: medium | **Priority**: high | **Risk Level**: medium  
**Tags**: e2e, navigation, onboarding, menu-navigation, account-activity, audit, assertion, agent-captured  
**Est. Execution Time**: 36 seconds | **Flakiness Potential**: medium

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to homepage with landing URL.
- Click on 'GET STARTED NOW' to initiate onboarding.
- Click 'CONTINUE SESSION' in the welcome dialog.
- Click 'Ok' on the welcome modal.
- Click the 'ACCOUNTS' menu to expand options.
- Click 'ACCOUNT ACTIVITY' to view account transactions.
- Click 'VIEW ACCOUNT' on the Saving Account bar.
- Verify the presence of the transaction cell with ID '1200001'.

#### Expected Results:
- User completes the workflow as per agent path.
- No errors are encountered during dialog handling or menu navigation.
- Transaction cell with ID '1200001' is present and visible.

---

### 3. Discovered Workflow: partial_flow -- Partial User Journey due to Empty Transfer History
_A targeted UI navigation and validation scenario that exercises access to the transfer history view through sequential sidebar navigation. It confirms the correct blocking UI state when no transfer records exist, ensuring the application gracefully renders empty-state tables and prevents further workflow actions tied to transfer records._

**Complexity**: medium | **Priority**: medium | **Risk Level**: low  
**Tags**: partial, navigation, sidebar, transfer-history, ui-validation, empty-state, blocker, onboarding  
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Navigate to homepage.
- Capture and click 'GET STARTED NOW'.
- Capture and click 'Ok' on welcome modal.
- Capture and click 'TRANSFERS' in the sidebar.
- Capture and click 'DISPLAY ALL TRANSFERS' in the sidebar.
- Validate UI state: both 'Upcoming Transfers' and 'Past Transfers' tables are empty.

#### Expected Results:
- User reaches the transfer history screen following mandatory UI steps.
- Both transfer tables are empty; workflow ends with a hard block.
- No record creation or detail validation is possible in this scenario.

---

### 4. Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial
_This partial validation scenario exercises the check deposit form’s defense against incomplete submission. It ensures that with all required fields left blank, the 'Submit' button is reliably disabled and the form cannot be submitted, verifying core UI validation though no inline error messages are shown—demonstrating both protection and a current feedback gap._

**Complexity**: medium | **Priority**: high | **Risk Level**: medium  
**Tags**: partial, deposit-check, form-validation, error-handling, onboarding, ui-assertion  
**Est. Execution Time**: 28 seconds | **Flakiness Potential**: low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/deposit-check

#### Steps:
- Navigate to homepage.
- Click 'GET STARTED NOW' on the welcome overlay.
- Click 'Ok' on the welcome modal to access the dashboard.
- Click 'DEPOSIT CHECKS' in the sidebar to open the deposit form.
- Attempt to click the disabled 'Submit' button (all fields empty).
- Assert that no inline error messages are visible.

#### Expected Results:
- User cannot submit the deposit form with missing required fields (button is disabled).
- No visual inline errors are present in this state.

---

### 5. Discovered Workflow: Bill Payment Recipient Management - Complete User Journey
_An e2e business workflow through the creation, editing, and deletion of a bill payment recipient. The path validates initial onboarding and then exhaustively steps through recipient management—including UI confirmation after each operation—assuring reliable state update and user feedback at every process stage._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: e2e, bills, recipient-management, add-edit-delete, onboarding, ui-confirmation, form-interaction  
**Est. Execution Time**: 60 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/pay-bill/manage-recipient

#### Steps:
- Navigate to homepage.
- Click 'GET STARTED NOW' to begin onboarding.
- Click 'Ok' in the onboarding modal.
- Click 'BILLS' in sidebar to expand options.
- Click 'MANAGE RECIPIENT' to open management panel.
- Click '+ ADD RECIPIENT' to start recipient entry.
- Type 'John Doe' in 'RECIPIENT NAME' field.
- Click 'SUBMIT' to add recipient.
- Click 'Edit' on the recipient to open the edit dialog.
- Change recipient name to 'Jane Smith'.
- Click 'SUBMIT' to save edit.
- Click 'Delete' to remove the recipient.

#### Expected Results:
- User completes add, edit, and delete recipient workflow.
- UI confirmation banners display after each main action.
- Recipients list updates as expected (add, edit, then empty after delete).
- No errors encountered.

---

### 6. Discovered Workflow: e2e_business_workflow - Complete User Journey
_A rigorous, end-to-end scenario simulating the deposit of a physical check, including navigation, entering the deposit workflow, complete form interaction with amount entry and image uploads, and confirmation. It thoroughly validates key functional touchpoints: modals, file uploads (front and back images), and correct posting to account activity with immediate UI feedback._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: e2e, deposit-check, workflow, navigation, form-submission, file-upload, ui-confirmation, onboarding  
**Est. Execution Time**: 60 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/deposit-check
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to homepage.
- Click 'GET STARTED NOW' to enter the simulator.
- Acknowledge and close the welcome modal.
- Click 'DEPOSIT CHECKS' in the sidebar to load the deposit form.
- Expand the 'To' account dropdown.
- Select 'CHECKING (Available Balance is $216.04)' as the account.
- Input the deposit amount: 100.00.
- Upload the front image of the check.
- Close the front image modal.
- Upload the back image of the check.
- Close the back image modal.
- Click 'Submit' to deposit the check.

#### Expected Results:
- User completes check deposit workflow without errors.
- Confirmation banner ('You have successfully deposited your check.') is visible.
- New record for $100.00 deposit is present in the Account Activity.

---