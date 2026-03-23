# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 7
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-23 19:23:15

## Scenarios

### 1. Discovered Workflow: Partial - Account Activity Journey (Steps 1-7 Only)
_Partial scenario covering steps from onboarding up to the account activity table assertion check, as executed by the agent (excluding scenario completion and assertion success)._

**Complexity**: Medium | **Priority**: High | **Risk Level**: Medium  
**Tags**: navigation, onboarding, sidebar-menu, modal-dialog, account-activity  
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: Medium

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Load NGFP BankSim homepage
- Click 'GET STARTED NOW' button to begin simulation workflow
- Click 'CONTINUE SESSION' button to pass through welcome dialog/modal
- Click 'Ok' button to close the second welcome dialog
- Click 'ACCOUNTS' in sidebar menu to navigate to account features
- Click 'ACCOUNT ACTIVITY' in the expanded menu to access account details
- Click 'VIEW ACCOUNT' (Saving Bar) to select savings account details

#### Expected Results:
- User successfully navigates from homepage through onboarding dialogs to the account activity view and savings details.
- UI components display appropriately with no errors.

---

### 2. Discovered Workflow: e2e_business_workflow - Complete User Journey
_Comprehensive test covering a user transferring funds between Checking and Saving accounts, confirming the operation in UI and transaction history._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e, transfer-funds, form-submission, navigation, confirmation, snackbar, dropdown, transaction-history  
**Est. Execution Time**: 75 seconds | **Flakiness Potential**: Low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/transfer
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Load homepage
- Click 'GET STARTED NOW' to begin workflow
- Dismiss onboarding modal by clicking 'Ok'
- Expand 'TRANSFERS' section in sidebar
- Click 'MAKE A TRANSFER' to open transfer form
- Open 'PAYMENT FREQUENCY' dropdown
- Select 'SINGLE' option in payment frequency
- Open 'Transfer From' dropdown
- Select 'CHECKING ($216.04)' as source account
- Open 'Transfer To' dropdown
- Select 'SAVING ($230.00)' as recipient account
- Enter transfer amount '50'
- Set payment date '3/22/2026'
- Submit transfer form by clicking 'Save'
- Validate green snackbar displays confirmation and transaction appears in Past Transfers table

#### Expected Results:
- User completes workflow; transfer form submitted and confirmation visible
- Past Transfers table shows new entry reflecting transaction
- No errors encountered

---

### 3. Discovered Workflow: partial_flow -- Partial User Journey due to Empty Transfer History
_Partial test covering navigation through transfer history, including all required selector captures and UI validation, blocked by absence of past or scheduled transfers._

**Complexity**: Medium | **Priority**: Medium | **Risk Level**: Medium  
**Tags**: navigation, sidebar, transfer-history, empty-state, partial-flow, modal-dialog  
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: Low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Load homepage for bank simulator
- Capture selector for 'GET STARTED NOW', then click to enter simulator
- Capture selector for 'Ok' modal button and click to dismiss welcome overlay
- Capture selector for sidebar item 'TRANSFERS expand_more', then click to expand transfer options
- Capture selector for sidebar item 'DISPLAY ALL TRANSFERS', then click to view transfer history
- Observe and confirm that both 'Upcoming Transfers' and 'Past Transfers' tables are empty

#### Expected Results:
- User successfully navigates to transfer history via required elements.
- Both transfer tables are empty, workflow ends with hard blocker.
- No record creation or detail validation is possible in this scenario.

---

### 4. Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial
_This test attempts to submit an incomplete check deposit form (all required fields left empty) and verifies that the 'Submit' button remains disabled, preventing submission. It also checks for inline error messages beneath or near form fields. The workflow confirmed that the button is disabled, but did not observe any inline error messages, meeting only part of the validation goal._

**Complexity**: Medium | **Priority**: High | **Risk Level**: Medium  
**Tags**: form-validation, deposit-check, error-handling, disabled-button, partial-flow  
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: Low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/deposit-check

#### Steps:
- Load the Bank Simulator homepage.
- Click on the 'GET STARTED NOW' button to begin the workflow.
- Click the 'Ok' button on the welcome modal to proceed to the dashboard.
- Click on 'DEPOSIT CHECKS' in the sidebar to enter the deposit workflow.
- Attempt to click the disabled 'Submit' button on the check deposit form.
- Verify that no inline error messages are visible after attempting to submit with required fields left empty.

#### Expected Results:
- User cannot submit the deposit form when required fields are empty ('Submit' is disabled).
- No visual inline errors are displayed to the user in this state.

---

### 5. Discovered Workflow: Bill Payment Recipient Management - Complete User Journey
_Comprehensive test covering creation, update, and deletion of a bill payment recipient, with UI confirmations after each action and strict selector-capture compliance._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e, bill-payment, recipient-management, form-submission, sidebar, dialog-modal, confirmation-banner  
**Est. Execution Time**: 70 seconds | **Flakiness Potential**: Low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/pay-bill/manage-recipient

#### Steps:
- Load homepage
- Click 'GET STARTED NOW' to begin onboarding
- Click 'Ok' on welcome modal to continue
- Click 'BILLS' in sidebar to expand bill management options
- Click 'MANAGE RECIPIENT' to open recipient management
- Click '+ ADD RECIPIENT' to start adding a new bill recipient
- Type 'John Doe' into the 'RECIPIENT NAME' input in Add Recipient dialog
- Click 'SUBMIT' to add the recipient
- Click 'Edit' on the listed recipient to open edit modal
- Edit 'RECIPIENT NAME' from 'John Doe' to 'Jane Smith'
- Click 'SUBMIT' to save the recipient edits
- Click 'Delete' to remove the recipient from the list

#### Expected Results:
- User completes workflow for add, edit, and delete recipient
- UI confirmation banners appear after each main action
- Recipients list updates as expected (add, edit, then empty after delete)
- No errors encountered

---

### 6. Discovered Workflow: e2e_business_workflow - Complete User Journey (Deposit Check Simulation)
_Comprehensive test covering the deposit check simulation end to end: from initial navigation, through deposit form completion, required image uploads, to confirmation and activity check._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e, deposit-check, file-upload, modal-dialog, account-activity, confirmation-banner  
**Est. Execution Time**: 75 seconds | **Flakiness Potential**: Medium

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/deposit-check
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Load homepage
- Enter the Bank Simulator by clicking 'GET STARTED NOW'
- Acknowledge the welcome modal to proceed
- Navigate to check deposit simulation via sidebar
- Expand 'To' account dropdown
- Choose 'CHECKING (Available Balance is $216.04)' from account options
- Input check amount: 100.00
- Initiate upload of check's front image
- Close the modal displaying the front image
- Trigger upload for the back side of the check
- Close back image modal to continue deposit
- Submit the check deposit simulation form

#### Expected Results:
- User completes workflow successfully.
- No errors during navigation or deposit.
- Confirmation banner ('You have successfully deposited your check.') is visible.
- New record for $100.00 deposit appears in Account Activity.

---

### 7. Discovered Workflow: e2e_business_workflow - Transfer Funds with UI Confirmation and History
_Comprehensive test confirming a user can transfer funds using the simulation, with UI confirmation and transaction history update verification._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e, transfer-funds, form-submission, confirmation-snackbar, transaction-history, dropdown, navigation  
**Est. Execution Time**: 75 seconds | **Flakiness Potential**: Low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/transfer
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Navigate to homepage
- Click 'GET STARTED NOW' to begin workflow
- Dismiss onboarding modal by clicking 'Ok'
- Expand 'TRANSFERS' sidebar section
- Click 'MAKE A TRANSFER' to open transfer form
- Open 'PAYMENT FREQUENCY' dropdown
- Select 'SINGLE' payment frequency
- Open 'Transfer From' dropdown
- Select 'CHECKING ($216.04)'
- Open 'Transfer To' dropdown
- Select 'SAVING ($230.00)'
- Enter transfer amount '50'
- Set payment date to '3/22/2026'
- Click 'Save' to submit transfer
- Confirm that snackbar and transfer history both show the transaction

#### Expected Results:
- User completes transfer workflow with confirmation shown
- Past Transfers table shows new transaction record
- No unexpected errors or UI breakage

---