import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialogPage } from './pom/WelcomeDialogPage.js';
import { SidebarMenuPage } from './pom/SidebarMenuPage.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import { SavingsAccountPage } from './pom/SavingsAccountPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

test(
  'Discovered Workflow: e2e_business_workflow - Complete User Journey',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });
    // Accept trailing slash or immediate home redirect in URL check
    const baseBankSim = (BASE_URL || BASE_HOST_URL);
    await expect(page).toHaveURL(
      new RegExp(
        '^' +
        baseBankSim.replace(/\/$/, '') + // no trailing slash
        '(\/)?' +
        '($|\/home\\?returnUrl=%2F$)'
      )
    );

    // Step 2: Click 'GET STARTED NOW' to begin bank sim scenario
    const homePage = new HomePage(page);
    await homePage.startScenario();
    await expect(page).toHaveURL(new RegExp('^' + baseBankSim.replace(/\/$/, '') + '\/?$'));

    // Step 3: Click 'Ok' to dismiss welcome dialog
    const welcomeDialogPage = new WelcomeDialogPage(page);
    await welcomeDialogPage.acceptWelcomeDialog();
    await expect(page).toHaveURL(new RegExp('^' + baseBankSim.replace(/\/$/, '') + '\/?$'));

    // Step 4: Expand 'ACCOUNTS' section in sidebar
    const sidebarMenuPage = new SidebarMenuPage(page);
    await sidebarMenuPage.expandAccountsSection();
    await expect(page).toHaveURL(new RegExp('^' + baseBankSim.replace(/\/$/, '') + '\/?$'));

    // Step 5: Select 'ACCOUNT ACTIVITY' from sidebar
    await sidebarMenuPage.openAccountActivity();
    await expect(page).toHaveURL(new RegExp('^' + baseBankSim.replace(/\/$/, '') + '\/?$'));

    // Step 6: Select Savings tab in Savings account section (no VIEW ACCOUNT click required)
    const accountActivityPage = new AccountActivityPage(page);
    await accountActivityPage.selectSavingsTab();
    await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');

    // Step 7: Click 'Saving' to display account activity (POM SavingsAccountPage)
    const savingsAccountPage = new SavingsAccountPage(page);
    await savingsAccountPage.showSavingsAccountActivity();
    await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');
    // FINAL stabilization: Ensure page state is settled (prevents test runner teardown race)
    await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');
  }
);

