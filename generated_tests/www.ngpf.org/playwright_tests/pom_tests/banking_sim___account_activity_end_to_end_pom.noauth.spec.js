import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialog } from './pom/WelcomeDialog.js';
import { MenuNavigation } from './pom/MenuNavigation.js';
import { AccountActivity } from './pom/AccountActivity.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stepTimeout30 = { timeout: 30000 };
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Scenario: Discovered Workflow: Banking Sim - Account Activity End-to-End
test(
  'Discovered Workflow: Banking Sim - Account Activity End-to-End',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

    // Step 2: Click 'GET STARTED NOW'
    await homePage.clickGetStartedNow();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', stepTimeout30);

    // Step 3: Click 'Ok' in welcome dialog
    const welcomeDialog = new WelcomeDialog(page);
    await welcomeDialog.clickOkDialog();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/', stepTimeout30);

    // Step 4: Click 'ACCOUNTS' menu
    const menuNavigation = new MenuNavigation(page);
    await menuNavigation.clickAccountsMenu();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/', stepTimeout30);

    // Step 5: Click 'ACCOUNT ACTIVITY' menu
    await menuNavigation.clickAccountActivityMenu();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/', stepTimeout30);

    // Step 6: Select 'Saving' account bar
    const accountActivity = new AccountActivity(page);
    await accountActivity.clickSavingBar();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account', stepTimeout30);

    // Step 7: Verify and click account cell '1100001'
    await accountActivity.verifyAccountCell();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account', stepTimeout30);
  }
);

