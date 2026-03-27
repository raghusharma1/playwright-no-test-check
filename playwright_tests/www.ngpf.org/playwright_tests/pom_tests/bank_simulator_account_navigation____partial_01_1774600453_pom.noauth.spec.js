import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { BankSimHomePage } from './pom/BankSimHomePage.js';
import { SimulatorStartPage } from './pom/SimulatorStartPage.js';
import { WelcomeDialogPage } from './pom/WelcomeDialogPage.js';
import { SidebarPage } from './pom/SidebarPage.js';
import { AccountDetailsPage } from './pom/AccountDetailsPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

// Pattern to allow both dashboard landing URLs
const DASHBOARD_URL_PATTERN = new RegExp('^' + BASE_HOST_URL + '/bank-sim(/|/home\\?returnUrl=%2F)?$');

// Scenario: Discovered Workflow: Bank Simulator Account Navigation -- Partial
test(
  'Discovered Workflow: Bank Simulator Account Navigation -- Partial',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const bankHome = new BankSimHomePage(page);
    await bankHome.navigateToHomePage();
    // Accept both '/bank-sim' and '/bank-sim/'
    await expect(page).toHaveURL(/^https:\/\/www\.ngpf\.org\/bank-sim\/?$/);

    // Step 2: Click GET STARTED NOW (begin simulation)
    const simStartPage = new SimulatorStartPage(page);
    await simStartPage.beginSimulation();
    // Accept either /bank-sim/, /bank-sim/home?returnUrl=%2F after button
    await expect(page).toHaveURL(DASHBOARD_URL_PATTERN);

    // Step 3: Dismiss Welcome Dialog (Ok button)
    const welcomeDialog = new WelcomeDialogPage(page);
    await welcomeDialog.dismissWelcomeDialog();
    // Still accept either candidate URL (dashboard loaded)
    await expect(page).toHaveURL(DASHBOARD_URL_PATTERN);

    // Step 4: Expand ACCOUNTS section in sidebar
    const sidebar = new SidebarPage(page);
    await sidebar.expandAccountsSection();
    // Step 5: Open ACCOUNT ACTIVITY sidebar item
    await sidebar.openAccountActivity();
    // Still accept either dashboard URL
    await expect(page).toHaveURL(DASHBOARD_URL_PATTERN);

    // Step 6: Click VIEW ACCOUNT button
    const accountDetails = new AccountDetailsPage(page);
    await accountDetails.viewAccountDetails();
    // NEW: Switch to Saving tab before assertion
    await accountDetails.selectSavingAccount();
    // Should now be on /bank-sim/account
    await expect(page).toHaveURL(
      new RegExp('^' + BASE_HOST_URL + '/bank-sim/account')
    );

    // Step 7: Verify account ID '1100001' is present
    const accountIdPresent = await accountDetails.isAccountIdPresent('1100001');
    expect(accountIdPresent, 'Account ID "1100001" should be present in details view').toBe(true);
  }
);

