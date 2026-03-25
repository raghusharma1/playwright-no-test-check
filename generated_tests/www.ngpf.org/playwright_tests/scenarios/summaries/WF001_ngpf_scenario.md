# Scenario Summary: e2e_business_workflow_-_complete_user_journey_01_1774424865

## Overview

- **Workflow ID**: WF001
- **Title**: Ngpf Scenario
- **Goal**: Ngpf Scenario
- **Feature Area**: Downloads
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: saas — Bank simulator for financial education and learning
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-25T13:17:45.132377

## User Journeys

### 1. Primary Business Workflow
_Main user flow_

- **Business Value**: Enables users to simulate banking operations for educational purposes
- **User Persona**: Student or educator exploring banking scenarios
- **Frequency**: daily
- **Complexity**: low

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the user journey of accessing the savings account activity in the NGPF Bank Simulator.

**Business Goal**: Verify users can complete the workflow of accessing account activity in the simulator.

**User Story**: As a student, I want to navigate through the Bank Simulator to view my savings account activity so that I can learn about banking transactions.

**Workflow Narrative**:
A user navigates to the NGPF Bank Simulator, initiates the banking scenario, closes the welcome dialog, expands the accounts sidebar, selects 'Account Activity', views the savings account, and displays its activity. This sequence validates end-to-end access to account details, confirming workflow completion as observed.

#### Implementation Guidance:
- Use waitForSelector for dialogs and menu transitions.
- Use pressSequentially for steps inside web components (copy the web_component_parent field where present).
- Validate each page change with URL assertions as observed.
- All selectors are mapped from captured database; use alternatives when primaries are unstable.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click | Start Scenario | Click 'GET STARTED NOW' to begin bank sim scenario | Scenario initiated | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click | Welcome Dialog | Click 'Ok' to dismiss welcome dialog | Welcome dialog closed | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 4 | Click | Sidebar Menu | Expand 'ACCOUNTS' section in sidebar | Accounts section expanded | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 5 | Click | Sidebar Menu | Select 'ACCOUNT ACTIVITY' from sidebar | Account activity page loaded | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 6 | Click | Account List | Click 'VIEW ACCOUNT' in Savings account section | Navigated to savings account details | https://www.ngpf.org/bank-sim/account |
| 7 | Click | Savings Account Details | Click 'Saving' to display account activity | Savings account details displayed | https://www.ngpf.org/bank-sim/account |

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

- **Total**: 10
