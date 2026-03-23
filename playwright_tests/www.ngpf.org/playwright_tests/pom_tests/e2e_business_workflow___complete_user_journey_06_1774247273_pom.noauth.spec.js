import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { Sidebar } from './pom/Sidebar.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };
const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;

// Discovered Workflow: e2e_business_workflow - Complete User Journey

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateHome();
  await homePage.waitForUrl(/^https:\/\/www\.ngpf\.org\/bank-sim(\?.*)?$/, 30000);

  // Step 2: Click 'GET STARTED NOW' (onboarding)
  await homePage.clickGetStartedNow();
  await homePage.waitForUrl(/^https:\/\/www\.ngpf\.org\/bank-sim\/home\?returnUrl=%2F(\?.*)?$/, 30000);

  // Step 3: Dismiss welcome modal
  await homePage.clickWelcomeOk();
  await homePage.waitForUrl(/^https:\/\/www\.ngpf\.org\/bank-sim(\?.*)?$/, 30000);

  // Step 4: Click 'DEPOSIT CHECKS' in sidebar
  const sidebar = new Sidebar(page);
  await sidebar.gotoDepositChecks();
  await sidebar.waitForUrl(/^https:\/\/www\.ngpf\.org\/bank-sim\/deposit-check(\?.*)?$/, 30000);

  // Step 5: Click 'To' account dropdown
  const depositPage = new DepositCheckPage(page);
  await depositPage.openAccountDropdown();

  // Step 6: Select 'CHECKING' account from dropdown
  await depositPage.selectCheckingAccount();

  // Step 7: Input amount '100.00'
  await depositPage.enterDepositAmount('100.00');

  // Step 8: Click 'Front' upload button (opens modal)
  await depositPage.uploadFrontCheck();
  // FIX: Close front modal immediately after uploading front check, before clicking back!
  await depositPage.closeFrontCheckModal();

  // Step 9: Click 'Back' upload button (modal should now open/active)
  await depositPage.uploadBackCheck();

  // Step 10: Close back check modal (click 'close' icon)
  await depositPage.closeBackCheckModal();

  // Step 11: Click 'Submit' to complete deposit
  await depositPage.submitDeposit();

  // Step 12: Verify deposit confirmation message and new activity record
  // Expect confirmation message
  const activityPage = new AccountActivityPage(page);
  const confirmText = await activityPage.getDepositSuccessMessageText();
  await expect(confirmText).toContain('You have successfully deposited your check');

  // Expect a ledger row containing 'DEPOSITED CHECK'
  const activityRow = await activityPage.getLatestDepositActivityRow();
  await expect(activityRow).toBeVisible();
});

// Capture accessibility tree on failure for debugging

