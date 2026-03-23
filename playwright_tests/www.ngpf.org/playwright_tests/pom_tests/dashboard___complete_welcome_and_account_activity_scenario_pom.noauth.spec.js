import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { DashboardMenu } from './pom/DashboardMenu.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stepTimeout30 = { timeout: 30000 };
const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;

test('Dashboard - Complete Welcome and Account Activity Scenario', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Click 'GET STARTED NOW'
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Focus/click Welcome dialog
  await homePage.focusWelcomeDialog();

  // Step 4: Click OK in Welcome dialog
  await homePage.clickWelcomeOk();

  // Step 5: Expand ACCOUNTS menu
  const dashboardMenu = new DashboardMenu(page);
  await dashboardMenu.expandAccountsMenu();

  // Step 6: Select ACCOUNT ACTIVITY
  await dashboardMenu.selectAccountActivity();

  // Step 7: Click 'Saving' to filter by saving account
  const accountActivityPage = new AccountActivityPage(page);
  await accountActivityPage.clickSavingBar();

  // Step 8: Verify transaction cell containing '1100001'
  const cellContent = await accountActivityPage.getTransactionCellContent();
  expect(cellContent).toContain('1100001');
});

