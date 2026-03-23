import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialogPage } from './pom/WelcomeDialogPage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { AccountActivityMenu } from './pom/AccountActivityMenu.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;
let stepTimeout30 = { timeout: 30000 };

/**
 * Scenario: Discovered Workflow: Partial - Account Activity Journey (Steps 1-7 Only)
 * Description: User begins at BankSim homepage, goes through onboarding modals, navigates to account activity, selects 'Saving' tab for account details, stops before assertions.
 */
test('partial___account_activity_journey_steps_1_7_only', async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHomepage();
  await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

  // Step 2: Click 'GET STARTED NOW'
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' in welcome dialog
  const welcomeDialogPage = new WelcomeDialogPage(page);
  await welcomeDialogPage.clickOkOnDialog();

  // Step 4: Click 'ACCOUNTS' in sidebar menu
  const sidebarMenu = new SidebarMenu(page);
  await sidebarMenu.clickAccountsMenu();

  // Step 5: Click 'ACCOUNT ACTIVITY' in expanded menu
  const accountActivityMenu = new AccountActivityMenu(page);
  await accountActivityMenu.clickAccountActivityMenu();

  // Step 6: Click 'Saving' tab/button to view savings account transactions
  const accountActivityPage = new AccountActivityPage(page);
  await accountActivityPage.clickSavingAccount();

  // Test stops here as per scenario guidance
});

