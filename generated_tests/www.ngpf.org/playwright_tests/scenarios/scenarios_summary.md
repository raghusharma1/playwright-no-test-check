# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-24 14:55:48

## Scenarios

### 1. Discovered Workflow: BankSim - Get Started & Verify Account Activity
_Comprehensive test covering the onboarding and account activity workflow. This scenario validates the full user journey from site landing, through onboarding dialogs, navigation via the drawer menu, to selecting and verifying Saving account activity._

**Complexity**: medium | **Priority**: high | **Risk Level**: medium  
**Tags**: e2e, onboarding, navigation, account-activity, drawer-menu, ui-workflow  
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to the BankSim homepage
- Click the 'Get Started Now' button on the landing page
- Click 'CONTINUE SESSION' on the Welcome dialog
- Click 'Ok' to confirm and dismiss the Welcome dialog
- Click 'ACCOUNTS expand_more' in the main menu drawer to expand accounts options
- Click 'ACCOUNT ACTIVITY' within the expanded drawer to view account activities
- Click 'VIEW ACCOUNT' for the Saving account to access transaction details
- Activate the 'Saving' account using the account bar
- Verify the presence of cell with ID '1100001' in the account activity table

#### Expected Results:
- User is able to complete the full onboarding and account activity workflow successfully
- Account activity for the Saving account is visible with the expected transaction cell ('1100001')
- No errors or interruptions observed during the journey

---