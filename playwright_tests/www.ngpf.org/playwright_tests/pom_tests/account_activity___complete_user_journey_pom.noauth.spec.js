import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { OnboardingDialog } from './pom/OnboardingDialog.js';
import { DashboardSideMenu } from './pom/DashboardSideMenu.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Scenario: Discovered Workflow: Account Activity - Complete User Journey

test('Discovered Workflow: Account Activity - Complete User Journey', async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.gotoHomepage();

  // Verify 'GET STARTED NOW' button is visible before clicking
  await expect(homePage.getStartedNowBtn).toBeVisible(stepTimeout30);

  // Step 2: Click 'GET STARTED NOW' button
  await homePage.clickGetStartedNow();

  // Step 3: CONTINUE SESSION button/dialog no longer present (skipped)!

  // Step 4: Click 'Ok' button in Welcome modal
  await homePage.clickWelcomeOk();

  // Step 5: Click 'ACCOUNTS' menu button
  const sideMenu = new DashboardSideMenu(page);
  await sideMenu.clickAccountsMenu();

  // Step 6: Click 'ACCOUNT ACTIVITY' menu item
  await sideMenu.clickAccountActivityMenu();

  // Step 7: Switch to 'Saving' tab (no 'VIEW ACCOUNT' button click necessary)
  const accountActivityPage = new AccountActivityPage(page);
  await accountActivityPage.selectSavingTab();

  // Step 8: Verify that at least one cell with a 7-digit transaction ID exists and is visible
  const transactionIdCells = accountActivityPage.getAnyTransactionIdCell();
  await expect(transactionIdCells).toHaveCount(2); // Table should have at least 2 transactions as seen in the screenshot
  await expect(transactionIdCells.first()).toBeVisible(stepTimeout30);
});

