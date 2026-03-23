# Scenario Summary: e2e_business_workflow_-_complete_user_journey_06_1774247273

## Overview

- **Workflow ID**: WF006
- **Title**: Deposit a Check and Confirm Posting in Account Activity
- **Goal**: Simulate check deposit by entering amount, selecting account, uploading required images, and confirming deposit. Success: user receives confirmation message and a new deposit record is visible in Account Activity.
- **Feature Area**: Check Deposit Simulation
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Bank simulator for personal finance education
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-23T11:57:53.335758

## User Journeys

### 1. Primary Business Workflow
_Main user flow_

- **Business Value**: Validate check deposit experience and transaction record creation for simulated banking
- **User Persona**: Student or educator simulating bank operations
- **Frequency**: daily
- **Complexity**: high

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the full simulated check deposit journey with confirmation and ledger update.

**Business Goal**: Verify users can complete the simulated check deposit workflow without errors and see a ledger update.

**User Story**: As a simulated bank user, I want to deposit a check so that I can confirm successful posting and track it in my transaction activity.

**Workflow Narrative**:
A user navigates to NGPF Bank Sim, starts the app, interacts with onboarding modals, accesses the deposit checks area, selects the 'CHECKING' account, inputs a specific amount, uploads simulated check images, and confirms both in-app success feedback and a new transaction record in the account activity page.

#### Implementation Guidance:
- Use waitForSelector for any dynamic modals/dialogs before clicking.
- Respect Shadow DOM: where web_component_parent is present, use pressSequentially or equivalent for complex input fields.
- Always use all_selectors array for robust targeting and fallback.
- After submission, explicitly wait for confirmation message and for account activity table to update.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click 'GET STARTED NOW' button | Welcome Screen Start Button | Begin simulator by clicking start | Welcome modal appears | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click 'Ok' on welcome dialog | Welcome Modal | Dismiss intro modal | Main dashboard visible | https://www.ngpf.org/bank-sim/ |
| 4 | Click 'DEPOSIT CHECKS' in sidebar | Sidebar Navigation | Go to deposit checks feature area | Deposit check form rendered | https://www.ngpf.org/bank-sim/deposit-check |
| 5 | Click 'To' account dropdown | To Account Dropdown | Open account selection dropdown | Dropdown options displayed | https://www.ngpf.org/bank-sim/deposit-check |
| 6 | Select 'CHECKING' account from dropdown | Deposit Account Dropdown Option | Choose checking account | 'CHECKING' is selected | https://www.ngpf.org/bank-sim/deposit-check |
| 7 | Input amount '100.00' | Amount Field | Enter deposit amount | Amount field is filled | https://www.ngpf.org/bank-sim/deposit-check |
| 8 | Click 'Front' upload button | Upload Check Front | Trigger front check image upload (simulation) | Front check file overlay appears | https://www.ngpf.org/bank-sim/deposit-check |
| 9 | Click 'Back' upload button | Upload Check Back | Trigger back check image upload (simulation) | Back check file overlay appears | https://www.ngpf.org/bank-sim/deposit-check |
| 10 | Close front check modal (click 'close' icon) | FrontCheckImageOverlay | Dismiss image preview for front check | Overlay disappears | https://www.ngpf.org/bank-sim/deposit-check |
| 11 | Close back check modal (click 'close' icon) | BackCheckImageOverlay | Dismiss image preview for back check | Overlay disappears | https://www.ngpf.org/bank-sim/deposit-check |
| 12 | Click 'Submit' to complete deposit | Deposit Check Submit Button | Submit deposit form | Deposit success notification | https://www.ngpf.org/bank-sim/deposit-check |
| 13 | Verify deposit confirmation and new activity record | Confirmation/Account Activity | Ensure deposit success banner and ledger row are present | Notification: "You have successfully deposited your check." and new ledger row matching input | https://www.ngpf.org/bank-sim/account |

#### Expected Results:
- User completes workflow
- No errors

#### Edge Cases:
- Slow network
- Interruptions

#### Data Requirements:
- Test accounts
- Valid inputs

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 33
