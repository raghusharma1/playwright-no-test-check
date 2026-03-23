// WARNING: This test covers only the navigation and welcome/entry flow steps. There is NO Page Object coverage for 'Deposit Checks' sidebar menu, deposit form, check image upload, or check submission/verification in the provided POM. Steps after sidebar navigation cannot be executed without raw selectors, which are strictly forbidden.

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

test(
  'Discovered Workflow: e2e_business_workflow - Complete User Journey',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Step 2: Click 'GET STARTED NOW' button
    const homePage = new HomePage(page);
    await homePage.clickGetStartedNow();
    await expect(page).toHaveURL(new RegExp('^' + BASE_HOST_URL + '/bank-sim/home\\?returnUrl=%2F'));

    // Step 3: Click 'Ok' on welcome modal
    await homePage.clickWelcomeOk();
    // Skipping further steps: No POM methods for 'DEPOSIT CHECKS' sidebar nav, deposit form, or verification. Test incomplete due to missing POM coverage.
    // For full test coverage, Page Objects for the deposit check workflow are required.
  }
);

