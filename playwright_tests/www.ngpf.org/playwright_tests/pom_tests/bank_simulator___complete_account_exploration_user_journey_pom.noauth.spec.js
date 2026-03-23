import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { Sidebar } from './pom/Sidebar.js';
import { AccountPage } from './pom/AccountPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

test(
  'Discovered Workflow: Bank Simulator - Complete Account Exploration User Journey',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', { waitUntil: 'domcontentloaded' });
    
    // Step 2: Click 'GET STARTED NOW'
    const homePage = new HomePage(page);
    await homePage.clickGetStartedNow();

    // Step 3: Click 'Ok' in Welcome dialog
    await homePage.clickWelcomeOk();

    // Step 4: Expand 'Accounts' section
    const sidebar = new Sidebar(page);
    await sidebar.expandAccountsSection();

    // Step 5: Click 'Account Activity'
    await sidebar.selectAccountActivity();

    // Step 6: Click 'Saving' bar
    const accountPage = new AccountPage(page);
    await accountPage.clickSavingBar();

    // Step 7: Verify presence of transaction ID '1100001'
    const visible = await accountPage.isTransactionIdVisible();
    expect(visible).toBe(true);
  }
);

