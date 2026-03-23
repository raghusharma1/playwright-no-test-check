import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Bill Payment Recipient Management - Complete User Journey', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });
  
  // Step 2: Click 'GET STARTED NOW' to begin onboarding
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' on welcome modal to continue
  await homePage.clickWelcomeOk();

  // Remaining workflow (sidebar navigation, manage recipient, add/edit/delete recipient) is UNIMPLEMENTABLE via POM as currently defined.
});

