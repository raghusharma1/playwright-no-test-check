import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { AccountActivityPage } from './pom/AccountActivityPage.js';
import { AccountDetailsPage } from './pom/AccountDetailsPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;
let stepTimeout30 = { timeout: 30000 };

// Main workflow scenario as derived from detailed_steps

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });

  // Step 2: GET STARTED NOW
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Ok welcome dialog
  await homePage.clickWelcomeOk();

  // Step 4: Expand ACCOUNTS section
  const sidebarMenu = new SidebarMenu(page);
  await sidebarMenu.expandAccountsSection();

  // Step 5: Switch to ACCOUNT ACTIVITY
  await sidebarMenu.openAccountActivity();

  // Step 6: VIEW ACCOUNT
  const accountActivityPage = new AccountActivityPage(page);
  await accountActivityPage.viewAccountDetails();

  // Step 7: Verify Account ID '1200001' is visible
  const accountDetailsPage = new AccountDetailsPage(page);
  await accountDetailsPage.verifyAccountID('1200001');

});

// Accessibility tree capture on failure

