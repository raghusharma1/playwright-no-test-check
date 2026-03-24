/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: bank_sim_onboarding_account_activity_verification_-_complete
 *
 * Errors are captured in test_iteration_errors_bank_sim_onboarding_account_activity_verification___complete.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialog } from './pom/WelcomeDialog.js';
import { AccountMenuPage } from './pom/AccountMenuPage.js';
import { AccountDetailPage } from './pom/AccountDetailPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stepTimeout30 = { timeout: 30000 };
const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;

// Critical user workflow for Bank Sim Onboarding & Account Activity Verification

test(
  'Bank Sim Onboarding & Account Activity Verification - Complete User Journey', 
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to Bank Sim homepage
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F');
    
    // Step 2: Click 'GET STARTED NOW' button
    await homePage.clickGetStarted();
    
    // Step 3: Click 'Ok' on Welcome dialog
    const welcomeDialog = new WelcomeDialog(page);
    await welcomeDialog.clickWelcomeDialogOk();
    // No modal interruption verification required (implicit via subsequent clicks)
    
    // Step 4: Click 'ACCOUNTS expand_more' section
    const accountMenuPage = new AccountMenuPage(page);
    await accountMenuPage.clickAccountsSection();
    
    // Step 5: Click 'ACCOUNT ACTIVITY' menu item
    await accountMenuPage.clickAccountActivityMenu();
    
    // Step 6: Click 'VIEW ACCOUNT' button in Saving account activity bar
    const accountDetailPage = new AccountDetailPage(page);
    await accountDetailPage.clickViewAccountButton();
    
    // Step 7: Verify account ID '1100001' is visible
    await expect(accountDetailPage.getAccountIdLocator()).toBeVisible(stepTimeout30);
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account');
  }
);

