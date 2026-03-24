# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://www.ngpf.org/bank-sim
- **Generated On**: 2026-03-24 18:15:00

## Scenarios

### 1. Discovered Workflow: Banking Simulator - Core Functional Navigations and Interactions
_Covers onboarding, account search, transfers, and robust shopping cart workflow with value preservation and real selectors._

**Complexity**: high | **Priority**: high | **Risk Level**: high  
**Tags**: navigation, onboarding, account-management, search-validation, transaction-deletion, transfers, shopping-cart, edge-case, pagination, e2e, ui-feedback  
**Est. Execution Time**: 100 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow  
**Pages Involved:**
- https://www.ngpf.org/bank-sim
- https://www.ngpf.org/bank-sim/home?returnUrl=%2F
- https://www.ngpf.org/bank-sim/account?type=checking
- https://www.ngpf.org/bank-sim/transfer/display-transfers
- https://www.ngpf.org/bank-sim/deposit-check
- https://www.ngpf.org/bank-sim/online-shop
- https://www.ngpf.org/bank-sim/account

#### Steps:
- Navigate to homepage
- Click GET STARTED NOW to begin session
- Click to continue onboarding flow to main dashboard
- Click VIEW ACCOUNT for Checking to expand details
- Input invalid transaction search string to validate search field edge-case handling
- Click Transaction Delete Icon to test deletion and error handling
- Click Sidebar TRANSFERS to access transfer options
- Click Sidebar DISPLAY ALL TRANSFERS to show all transfer records
- Click Checking on Transfer Dashboard to filter by Checking account
- Input invalid search to Upcoming Transfers to test edge-case input
- Switch to Saving Account in Transfer Dashboard
- Click Transfer/Saving Submission to test form submit edge-case
- Change past transfers table pagination to 10 items per page
- Change items per page to 15 to check pagination robustness further
- Navigate to Shopping via sidebar to initiate shopping workflow
- Select Shopping Cart Items (Smoothie Boost) via checkboxes
- Select Shopping Cart Items (Sit & Eat) via checkboxes
- Select Another Item (Glam Beauty) via checkboxes for multi-item flow
- Click Shopping Save to submit cart selection
- Verify Submission Success by capturing the resulting UI feedback (e.g. snackbar)

#### Expected Results:
- User is able to navigate from the homepage to the main dashboard, interact with primary banking modules (search, delete, transfers, shopping), and receives success feedback upon shopping cart submission.
- No workflow errors, and all required business logic triggers and edge-cases (invalid/empty search, pagination, and multi-item selection) are validated.

---