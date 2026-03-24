/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: banking_simulator_-_core_functional_navigations_and_interact
 *
 * Errors are captured in test_iteration_errors_banking_simulator___core_functional_navigations_and_interact.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { AccountDetailPage } from './pom/AccountDetailPage.js';
import { TransferDashboardPage } from './pom/TransferDashboardPage.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import { OnlineShopPage } from './pom/OnlineShopPage.js';
import { AccountPage } from './pom/AccountPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

// Main E2E workflow test

test('Discovered Workflow: Banking Simulator - Core Functional Navigations and Interactions', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHomepage();
  // Landing always redirects to /home?returnUrl=%2F
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

  // Step 2: Click GET STARTED NOW
  await homePage.clickGetStarted();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

  // Step 3: Continue onboarding
  await homePage.continueSession();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

  // Step 4: Click VIEW ACCOUNT for Checking
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.openCheckingAccount();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account?type=checking', stepTimeout30);

  // Step 5: Input invalid transaction search
  const accountDetailPage = new AccountDetailPage(page);
  await accountDetailPage.inputInvalidTransactionSearch('INVALID_SEARCH_#$@!');
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account?type=checking', stepTimeout30);

  // Step 6: Delete Transaction (icon click)
  await accountDetailPage.deleteTransaction();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account?type=checking', stepTimeout30);

  // Step 7: Click Sidebar TRANSFERS
  await accountDetailPage.navigateToTransfers();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account?type=checking', stepTimeout30);

  // Step 8: Click Sidebar DISPLAY ALL TRANSFERS
  await accountDetailPage.displayAllTransfers();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account?type=checking', stepTimeout30);

  // Step 9: Click Checking on Transfer Dashboard
  const transferDashboardPage = new TransferDashboardPage(page);
  await transferDashboardPage.switchTransferToChecking();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 10: Input invalid search to Upcoming Transfers
  await transferDashboardPage.inputInvalidTransferSearch('&&&INVALID_SEARCH&&&');
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 11: Switch to Saving account in Transfer Dashboard
  await transferDashboardPage.switchTransferToSaving();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 12: Submit transfer form (Saving)
  await transferDashboardPage.submitSavingsTransfer();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 13: Change items per page to 10 on Past Transfers table
  await transferDashboardPage.selectPastTransfersItemsPerPage('10');
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 14: Change items per page to 15
  await transferDashboardPage.selectPastTransfersItemsPerPageSecond();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers', stepTimeout30);

  // Step 15: Navigate to Shopping via sidebar
  const depositCheckPage = new DepositCheckPage(page);
  await depositCheckPage.navigateToShopping();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/deposit-check', stepTimeout30);

  // Step 16: Select Shopping Cart Items (Smoothie Boost)
  const onlineShopPage = new OnlineShopPage(page);
  await onlineShopPage.selectSmoothieBoost();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/online-shop', stepTimeout30);

  // Step 17: Select Shopping Cart Items (Sit & Eat)
  await onlineShopPage.selectSitAndEat();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/online-shop', stepTimeout30);

  // Step 18: Select Another Shopping Cart Item (Glam Beauty)
  await onlineShopPage.selectGlamBeauty();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/online-shop', stepTimeout30);

  // Step 19: Click Shopping Save
  await onlineShopPage.submitShoppingCart();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/online-shop', stepTimeout30);

  // Step 20: Verify Submission Success (feedback/message)
  const accountPage = new AccountPage(page);
  await accountPage.verifyShoppingSuccess();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account', stepTimeout30);
});

// Capture accessibility tree on failure

