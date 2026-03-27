import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

/**
 * Scenario: Discovered Workflow: e2e_business_workflow - Complete User Journey
 * Complete deposit check simulation from homepage through confirming deposit in Account Activity.
 */
test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim');

  // Step 2: Click 'GET STARTED NOW' button
  await homePage.clickGetStartedNow();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F');

  // Step 3: Click 'Ok' on welcome modal
  await homePage.clickWelcomeOk();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/');

  // Step 4: Click 'DEPOSIT CHECKS' in sidebar
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickDepositChecksSidebar();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/deposit-check');

  // Step 5: Open 'To' account dropdown
  const depositCheckPage = new DepositCheckPage(page);
  await depositCheckPage.openToAccountDropdown();

  // Step 6: Select 'CHECKING' account option
  await depositCheckPage.selectCheckingAccount();

  // Step 7: Fill 'Amount' field
  await depositCheckPage.fillAmount('100.00');

  // Step 8: Click 'Front' button to upload check front
  await depositCheckPage.clickUploadFront();

  // Step 9: Click 'close' icon on front image modal
  await depositCheckPage.closeFrontModal();

  // Step 10: Click 'Back' button to upload check back
  await depositCheckPage.clickUploadBack();

  // Step 11: Click 'close' icon on back image modal
  await depositCheckPage.closeBackModal();

  // Step 12: Click 'Submit' button
  await depositCheckPage.submitDeposit();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account');

  // Result Verification: New record appears in Account Activity page
  const accountActivityPage = new AccountActivityPage(page);
  // Click VIEW ACCOUNT to show activity (if needed)
  await accountActivityPage.viewAccountDetails();
  // Confirm deposit record for $100.00
  // This will search for a cell with '100.00' on the page
  await accountActivityPage.verifyAccountID('100.00');
});

// Capture accessibility tree on failure for debugging

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
      const stateFile = path.join(__dirname, '..', `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        url: page.url(),
        all_page_urls: context.pages().map(p => p.url())
      }, null, 2));
    } catch (e) { /* Silent fail */ }
  }
});
