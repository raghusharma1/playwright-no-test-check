import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomePage } from './pom/WelcomePage.js';
import { WelcomeDialog } from './pom/WelcomeDialog.js';
import { AccountMenuPage } from './pom/AccountMenuPage.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

// Scenario: Discovered Workflow: BankSim - Complete Onboarding and Account Activity

test(
  'Discovered Workflow: BankSim - Complete Onboarding and Account Activity',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHomepage();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F');

    // Step 2: Click 'GET STARTED NOW' button
    const welcomePage = new WelcomePage(page);
    await welcomePage.clickGetStartedNow(stepTimeout30.timeout);
    // Modal dialog expected
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/');

    // Step 3: Click 'Ok' in Welcome Dialog modal
    const welcomeDialog = new WelcomeDialog(page);
    await welcomeDialog.clickWelcomeOk(stepTimeout30.timeout);
    // Main menu now accessible
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/');

    // Step 4: Click 'ACCOUNTS expand_more' menu item
    const accountMenuPage = new AccountMenuPage(page);
    await accountMenuPage.clickAccountsMenu(stepTimeout30.timeout);
    // Expanded menu expected

    // Step 5: Click 'ACCOUNT ACTIVITY' link under expanded Accounts menu
    const accountActivityPage = new AccountActivityPage(page);
    await accountActivityPage.clickAccountActivityLink(stepTimeout30.timeout);
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account');

    // Step 6: Click 'Saving' bar/button
    await accountActivityPage.clickSavingBar(stepTimeout30.timeout);

    // Step 7: Verify presence of Account row '1100001'
    await accountActivityPage.verifyAccountRowPresence(stepTimeout30.timeout);
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/account');
  }
);

