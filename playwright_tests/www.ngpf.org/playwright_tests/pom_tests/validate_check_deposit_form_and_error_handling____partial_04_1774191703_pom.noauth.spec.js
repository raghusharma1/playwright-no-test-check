import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DashboardPage } from './pom/DashboardPage.js';
import { DepositCheckPage } from './pom/DepositCheckPage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };

// Scenario: Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial

test('Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial', { tag: ['@regression'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim');

  // Step 2: Click 'GET STARTED NOW'
  await homePage.clickGetStartedNow();
  // Step 3: Click 'Ok' in welcome modal
  await homePage.clickWelcomeOk();

  // Step 4: Click 'DEPOSIT CHECKS' in sidebar
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickDepositChecksSidebar();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/deposit-check');

  // Step 5: Attempt to click the disabled 'Submit' button (all fields empty)
  const depositCheckPage = new DepositCheckPage(page);
  // Try clicking 'Submit' (should remain disabled)
  await depositCheckPage.clickDisabledSubmit();

  // Verify: 'Submit' button is disabled
  const submitBtn = depositCheckPage.submitDepositBtn;
  await expect(submitBtn).toBeDisabled({ timeout: 5000 });

  // Step 6: Assert no inline error messages are visible
  const inlineErrors = depositCheckPage.getInlineErrorElements();
  await expect(inlineErrors).toHaveCount(0);
});

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
