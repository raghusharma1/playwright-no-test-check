import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialogPage } from './pom/WelcomeDialogPage.js';
import { DrawerMenuPage } from './pom/DrawerMenuPage.js';
import { AccountPage } from './pom/AccountPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: BankSim - Get Started & Verify Account Activity', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.goto(BASE_URL);
  // Accept home page, trailing slash, or immediate redirect to /home?returnUrl=%2F
  const possibleFirstUrls = [
    BASE_URL.replace(/\/$/, ''),                      // without trailing slash
    BASE_URL.replace(/\/$/, '') + '/',               // with trailing slash
    BASE_HOST_URL + '/bank-sim/home?returnUrl=%2F'    // redirected SPA home
  ];
  await expect(page).toHaveURL(new RegExp(
    possibleFirstUrls.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  ));

  // Step 2: Click 'GET STARTED NOW' button
  await homePage.startSimulation();
  // Accept either /home?returnUrl=%2F redirect or just /bank-sim/ (no redirect)
  const possibleStartedUrls = [
    BASE_HOST_URL + '/bank-sim/',
    BASE_HOST_URL + '/bank-sim/home?returnUrl=%2F'
  ];
  await expect(page).toHaveURL(new RegExp(
    possibleStartedUrls.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  ));

  // Step 3: Click 'CONTINUE SESSION' on Welcome dialog (conditionally as needed in POM)
  const welcomeDialog = new WelcomeDialogPage(page);
  await welcomeDialog.continueSession();
  // Next page is always /bank-sim/ after dialog acceptance
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/');

  // Step 4: Click 'Ok' to confirm and close Welcome dialog
  await welcomeDialog.confirmWelcomeDialog();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/');

  // Step 5: Expand 'ACCOUNTS' drawer menu
  const drawerMenu = new DrawerMenuPage(page);
  await drawerMenu.expandAccountsDrawer();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/');

  // Step 6: Click 'ACCOUNT ACTIVITY'
  await drawerMenu.goToAccountActivity();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/');

  // Step 7: Click 'VIEW ACCOUNT' for Saving account
  const accountPage = new AccountPage(page);
  await accountPage.viewSavingsAccount();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');

  // Step 8: Activate 'Saving' account
  await accountPage.activateSavingsAccount();
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');

  // Step 9: Verify cell '1100001' is visible
  await accountPage.verifyAccountActivityCell();
  // Final URL is still /account
  await expect(page).toHaveURL(BASE_HOST_URL + '/bank-sim/account');
});

