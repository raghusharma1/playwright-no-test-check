# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-24 12:56:53

## Scenarios

### 1. Discovered Workflow: BankSim - Complete Onboarding and Account Activity
_Comprehensive e2e test covering all steps of onboarding through account selection and activity verification as outlined by user scenario and agent step sequence._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: e2e_workflow, onboarding, navigation, modal-dialog, account-selection, verification, regression  
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: Low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to homepage and ensure page loads with 'Get Started Now' button visible.
- Click the 'GET STARTED NOW' button to initiate onboarding; expect Welcome Dialog modal to appear.
- Click 'Ok' in the Welcome Dialog modal to proceed, verifying modal closes and main menu is accessible.
- Click 'ACCOUNTS expand_more' in the main navigation menu to expand account navigation options.
- Click 'ACCOUNT ACTIVITY' under the expanded Accounts menu and verify Account Activity page loads.
- Select 'Saving' as the account bar/button on the Account Activity page; verify the account filter is applied.
- Verify presence of the account table row (cell) with ID '1100001' confirming correct account data display.

#### Expected Results:
- User completes onboarding and account selection flow without errors.
- Account table row '1100001' is visible and found.

---