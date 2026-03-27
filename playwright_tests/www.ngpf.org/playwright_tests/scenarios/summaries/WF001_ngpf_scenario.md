# Scenario Summary: e2e_business_workflow_-_complete_user_journey_01_1774609860

## Overview

- **Workflow ID**: WF001
- **Title**: Ngpf Scenario
- **Goal**: Ngpf Scenario
- **Feature Area**: Downloads
- **Site URL**: https://www.ngpf.org/bank-sim
- **Site Type**: dashboard — Banking simulation for financial education
- **Confidence Score**: 0.95
- **Auth Required**: False
- **Generated On**: 2026-03-27T16:41:00.620307

## User Journeys

### 1. Primary Business Workflow
_Main user flow for account activity review_

- **Business Value**: Enables users to simulate banking actions and understand account activity
- **User Persona**: Student or educator seeking practical financial literacy experience
- **Frequency**: daily
- **Complexity**: low

## Scenarios

### 1. Discovered Workflow: e2e_business_workflow - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Comprehensive test covering the journey from site entry to account activity review and verification.

**Business Goal**: Verify users can complete the bank simulation workflow, ending in account verification.

**User Story**: As a bank simulation user, I want to start a scenario and review my account activity so that I can verify details and learn about financial management.

**Workflow Narrative**:
A user navigates to the NGPF Bank Sim site, initiates simulation, dismisses the introductory dialog, expands the accounts section, accesses account activity, views a savings account, and verifies the presence of a specific account ID as observed in the successful agent flow.

#### Implementation Guidance:
- Use waitForSelector to ensure modal/dialog components are closed.
- Sequentially interact with sidebar navigation to expand/collapse items.
- Explicitly validate visibility of account ID cell.
- Ensure accurate selector referencing for elements within web components.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load homepage | Page loaded | https://www.ngpf.org/bank-sim |
| 2 | Click | GET STARTED NOW button | Initiate simulation by clicking 'GET STARTED NOW' | Scenario start triggered, homepage changes | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 3 | Click | Ok dialog button | Accept the welcome dialog by clicking 'Ok' | Dialog dismissed | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 4 | Click | ACCOUNTS expand_more sidebar link | Expand the accounts section of the sidebar navigation | Accounts section expanded | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 5 | Click | ACCOUNT ACTIVITY sidebar link | Switch to account activity view | Account activity section visible | https://www.ngpf.org/bank-sim/home?returnUrl=%2F |
| 6 | Click | VIEW ACCOUNT button on activity page | View detailed saving account activity | Account details page loaded | https://www.ngpf.org/bank-sim/account |
| 7 | Verify Visibility | Account ID cell | Check that ID '1200001' is visible on account detail page | ID appears in table | https://www.ngpf.org/bank-sim/account |

#### Expected Results:
- User completes workflow
- No errors

#### Edge Cases:
- Slow network
- Interruptions

#### Data Requirements:
- Test accounts with IDs present in table
- Valid navigation elements

#### Prerequisites:
- Site accessible

## Captured Selectors

- **Total**: 10
