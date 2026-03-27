import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { MakeTransferPage } from './pom/MakeTransferPage.js';
import { TransferHistoryPage } from './pom/TransferHistoryPage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

// Happy path scenario: Complete user journey for single transfer.
test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // 1. Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  // Accept either the bare homepage or the redirected welcome page as valid landing URLs
  await expect(page).toHaveURL(/\/bank-sim(\/home\?returnUrl=%2F)?\/?$/, stepTimeout30);

  // 2. Click 'GET STARTED NOW'
  await homePage.clickGetStartedNow();
  await expect(page).toHaveURL(BASE_URL + '/home?returnUrl=%2F', stepTimeout30);

  // 3. Click 'Ok' in onboarding modal
  await homePage.clickWelcomeOk();
  // Modal disappears, dashboard visible
  await expect(page).toHaveURL(/\/bank-sim\/?$/, stepTimeout30);

  // 4. Expand 'TRANSFERS' section in sidebar
  const sidebarMenu = new SidebarMenu(page);
  await sidebarMenu.expandTransfersSidebar();

  // 5. Click 'MAKE A TRANSFER'
  await sidebarMenu.clickMakeTransfer();
  await expect(page).toHaveURL(BASE_URL + '/transfer', stepTimeout30);

  // 6. Expand 'PAYMENT FREQUENCY' dropdown
  const makeTransferPage = new MakeTransferPage(page);
  await makeTransferPage.expandPaymentFrequencyDropdown();

  // 7. Select 'SINGLE' option
  await makeTransferPage.selectPaymentFrequency();

  // 8. Expand 'Transfer From' dropdown
  await makeTransferPage.expandTransferFromDropdown();

  // 9. Select 'CHECKING ($216.04)' as source account
  await makeTransferPage.selectTransferFromAccount();

  // 10. Expand 'Transfer To' dropdown
  await makeTransferPage.expandTransferToDropdown();

  // 11. Select 'SAVING ($230.00)' as recipient account
  await makeTransferPage.selectTransferToAccount();

  // 12. Fill Amount field with '50'
  await makeTransferPage.fillAmountField('50');

  // 13. Fill Payment Date with '3/22/2026'
  await makeTransferPage.fillPaymentDateField('3/22/2026');

  // 14. Submit transfer form ('Save')
  await makeTransferPage.submitTransferForm();
  await expect(page).toHaveURL(BASE_URL + '/transfer/display-transfers', stepTimeout30);

  // 15. Validate confirmation snackbar and Past Transfers table updated
  const transferHistoryPage = new TransferHistoryPage(page);
  await transferHistoryPage.waitForTransferSuccessSnackbar();
  // Check that the latest row in Past Transfers table reflects expected transaction
  const latestRow = transferHistoryPage.getLatestPastTransferRow();
  await expect(latestRow).toBeVisible({ timeout: 15000 });
  await expect(latestRow).toContainText(['1100002', '03/22/2026', 'Transfer to Saving Account', '-$50.00']);
});

// Accessibility dump for debugging failed tests

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
