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

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

// Scenario: Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial
// Test type: partial_flow

test(
  'Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial',
  { tag: ['@regression'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await expect(page).toHaveURL(BASE_URL);

    // Step 2: Click 'GET STARTED NOW'
    await homePage.clickGetStartedNow();
    // URL change is modal context, expect homepage or home with modal param
    await expect(page).toHaveURL(/https:\/\/www\.ngpf\.org\/bank-sim\/home\?returnUrl=%2F/);

    // Step 3: Dismiss welcome modal ('Ok')
    await homePage.clickWelcomeOk();
    await expect(page).toHaveURL(BASE_URL);

    // Step 4: Sidebar click 'DEPOSIT CHECKS'
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickDepositChecksSidebar();
    await expect(page).toHaveURL(BASE_URL + '/deposit-check');

    // Step 5: Attempt to click (disabled) 'Submit' button
    const depositCheckPage = new DepositCheckPage(page);
    // Check disabled state FIRST before clicking
    const isDisabled = await depositCheckPage.isSubmitDisabled();
    expect(isDisabled).toBe(true);

    // Attempt click even if disabled (as scenario suggests)
    // (Should not throw - handled internally)
    await depositCheckPage.clickDisabledSubmit();

    // Step 6: Assert NO error messages are visible
    const errorMessages = depositCheckPage.getInlineErrorMessages();
    await expect(errorMessages).toHaveCount(0);
  }
);

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
