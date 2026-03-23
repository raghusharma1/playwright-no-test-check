# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 6
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-23 20:10:59

## Scenarios

### 1. e2e_business_workflow - Complete User Journey
_Comprehensive test covering a user transferring funds between Checking and Saving accounts, confirming the operation in UI and transaction history._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: transfer, form-submission, navigation, account-history, confirmation, e2e
**Est. Execution Time**: 75 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/transfer
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Navigate to homepage
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

### 2. partial_flow -- Partial User Journey due to Empty Transfer History
_Partial test covering navigation through transfer history, including all required selector captures and UI validation, blocked by absence of past or scheduled transfers._

**Complexity**: medium | **Priority**: medium | **Risk Level**: medium  
**Tags**: navigation, sidebar, modal, empty-state, account-history, partial-flow
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/transfer/display-transfers

#### Steps:
- Load homepage for bank simulator
- Capture selector for 'GET STARTED NOW', then click to enter simulator
- Capture selector for 'Ok' modal button and click to dismiss welcome overlay
- Capture selector for sidebar item 'TRANSFERS expand_more', then click to expand transfer options
- Capture selector for sidebar item 'DISPLAY ALL TRANSFERS', then click to view transfer history
- Observe and confirm that both 'Upcoming Transfers' and 'Past Transfers' tables are empty ('0 of 0' records)

#### Expected Results:
- User successfully navigates to transfer history via required elements
- Both transfer tables are empty, workflow ends with hard blocker
- No record creation or detail validation is possible in this scenario

---

### 3. Validate Check Deposit Form and Error Handling -- Partial
_This test attempts to submit an incomplete check deposit form (all required fields left empty) and verifies that the 'Submit' button remains disabled, preventing submission. It also checks for inline error messages beneath or near form fields. The workflow confirmed that the button is disabled, but did not observe any inline error messages, meeting only part of the validation goal._

**Complexity**: medium | **Priority**: high | **Risk Level**: medium  
**Tags**: form-validation, error-handling, disabled-button, input-validation, navigation, partial-flow
**Est. Execution Time**: 33 seconds | **Flakiness Potential**: low

**Type**: partial_flow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/deposit-check

#### Steps:
- Load the Bank Simulator homepage
- Click on the 'GET STARTED NOW' button to begin the workflow
- Click the 'Ok' button on the welcome modal to proceed to the dashboard
- Click on 'DEPOSIT CHECKS' in the sidebar to enter the deposit workflow
- Attempt to click the disabled 'Submit' button on the check deposit form (with all fields left empty)
- Verify that no inline error messages are visible after attempting to submit with required fields left empty

#### Expected Results:
- User cannot submit the deposit form when required fields are empty ('Submit' is disabled)
- No visual inline errors are displayed to the user in this state

---

### 4. Bill Payment Recipient Management - Complete User Journey
_Comprehensive test covering creation, update, and deletion of a bill payment recipient, with UI confirmations after each action and strict selector-capture compliance._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: bill-pay, recipient-management, add-edit-delete, form-submission, navigation, confirmation, e2e
**Est. Execution Time**: 60 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
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
- Click 'Edit' on the listed recipient to open the edit recipient modal
- Edit 'RECIPIENT NAME' from 'John Doe' to 'Jane Smith'
- Click 'SUBMIT' to save the recipient edits
- Click 'Delete' to remove the recipient from the list

#### Expected Results:
- User completes workflow for add, edit, and delete recipient
- UI confirmation banners appear after each main action
- Recipients list updates as expected (add, edit, then empty after delete)
- No errors encountered

---

### 5. e2e_business_workflow - Complete User Journey (Check Deposit)
_Comprehensive test covering the deposit check simulation end to end: from initial navigation, through deposit form completion, required image uploads, to confirmation and activity check._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: check-deposit, file-upload, navigation, form-submission, modal, confirmation, account-activity, e2e
**Est. Execution Time**: 60 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/deposit-check
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Load homepage
- Enter the Bank Simulator by clicking 'GET STARTED NOW'
- Acknowledge the welcome modal to proceed
- Navigate to check deposit simulation screen
- Expand account selection dropdown menu for deposit
- Choose 'CHECKING (Available Balance is $216.04)' from account options
- Input check amount: 100.00
- Initiate upload of check's front image
- Close the modal displaying the front image
- Trigger upload for the back side of the check
- Close back image modal to continue deposit
- Submit the check deposit simulation form

#### Expected Results:
- User completes workflow successfully
- No errors during navigation or deposit
- Confirmation banner ('You have successfully deposited your check.') is visible
- New record for $100.00 deposit appears in Account Activity

---

### 6. Dashboard - Complete Welcome and Account Activity Scenario
_Comprehensive test covering onboarding (Welcome dialog) and navigation to Account Activity for review_

**Complexity**: high | **Priority**: critical | **Risk Level**: high  
**Tags**: onboarding, navigation, account-activity, modal, transaction-verification, e2e
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Load homepage
- Click the 'GET STARTED NOW' button to begin onboarding
- Click the Welcome dialog to focus/open
- Click the 'Ok' button in the Welcome dialog
- Click on 'ACCOUNTS' in main navigation to expand account options
- Select 'ACCOUNT ACTIVITY' from expanded account options
- Click 'Saving' to filter by saving account
- Verify presence of transaction ID '1100001'

#### Expected Results:
- User completes onboarding and account activity review
- Transaction ID '1100001' is visible
- No errors or interruptions occur

---