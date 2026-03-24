# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-24 12:30:25

## Scenarios

### 1. Discovered Workflow: Banking Sim - Account Activity End-to-End
_Comprehensive test covering the onboarding and account activity workflow in the educational banking simulator._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e, onboarding, navigation, account-activity, ui-validation, banking-simulator  
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: Low

**Type**: End-to-end business workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to the homepage of the banking simulator.
- Click the "GET STARTED NOW" button to begin onboarding.
- Click the "Ok" button in the welcome dialog to proceed.
- Click on the "ACCOUNTS" menu item to expand the account options.
- Click on the "ACCOUNT ACTIVITY" menu item.
- Select the "Saving" account bar to view savings account activity.
- Verify and click the cell with account ID '1100001' to confirm accessibility.

#### Expected Results:
- User completes workflow without errors.
- Onboarding dialog is successfully navigated.
- "Saving" account details are accessible.
- Account cell 1100001 is present and verified.

---