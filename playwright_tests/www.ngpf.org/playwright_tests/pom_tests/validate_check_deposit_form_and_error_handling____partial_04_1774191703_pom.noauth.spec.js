// NOTE: Now uses POM for all app interactions.
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomePage } from './pom/HomePage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { DepositChecksPage } from './pom/DepositChecksPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const stepTimeout30 = { timeout: 30000 };

test.use({ storageState: { cookies: [], origins: [] } }); // explicit no-auth context

test('Discovered Workflow: Validate Check Deposit Form and Error Handling -- Partial', async ({ page }) => {
  // Step 1: Go to homepage
  await page.goto(BASE_URL || 'https://www.ngpf.org/bank-sim', { waitUntil: 'domcontentloaded' });
  const homePage = new HomePage(page);

  // Step 2: Click 'GET STARTED NOW'
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' on welcome modal
  await homePage.clickWelcomeOk();

  // Step 4: Click sidebar "DEPOSIT CHECKS"
  const sidebar = new SidebarMenu(page);
  await sidebar.clickDepositChecks();

  // Step 5: Try to interact with (disabled) Submit button on empty Deposit Check form
  const depositChecksPage = new DepositChecksPage(page);
  // Assert the Submit button is disabled (should be true since form is empty)
  await expect(await depositChecksPage.isSubmitDisabled()).toBe(true);

  // Step 6: Assert there are no visible inline error messages (only button disables submission)
  await depositChecksPage.assertNoInlineErrors();
});

