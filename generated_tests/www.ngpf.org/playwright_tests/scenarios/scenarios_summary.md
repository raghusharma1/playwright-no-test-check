# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-24 13:26:59

## Scenarios

### 1. Bank Sim Onboarding & Account Activity Verification - Complete User Journey
_A test scenario covering user onboarding, navigation to accounts, activity review, and verification of account presence (ID 1100001)._

**Complexity**: High | **Priority**: High | **Risk Level**: High  
**Tags**: onboarding, navigation, account-verification, e2e, dialog-interaction, menu-access, account-activity, UI-flow  
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: Low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to homepage
- Click the 'GET STARTED NOW' button to begin onboarding
- Click the 'Ok' button on the Welcome dialog to dismiss it
- Click the 'ACCOUNTS expand_more' section to open the accounts menu
- Click the 'ACCOUNT ACTIVITY' menu item to view account activity
- Click the 'VIEW ACCOUNT' button in the Saving account activity bar
- Assert that account ID '1100001' is visible on the Saving account page

#### Expected Results:
- User completes workflow without errors.
- Account activity and ID information is displayed as expected.

---