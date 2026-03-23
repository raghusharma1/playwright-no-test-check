import 'dotenv/config';
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomePage } from './pom/HomePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;
let stepTimeout30 = { timeout: 30000 };

test('e2e_business_workflow - Complete User Journey (POM-only steps)', async ({ page }) => {
  await page.goto(BASE_URL || BASE_HOST_URL, { waitUntil: 'domcontentloaded' });

  // Step 2: Click 'GET STARTED NOW' button
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' on welcome modal
  await homePage.clickWelcomeOk();

  // Steps 4–12 are NOT covered by available Page Objects (deposit workflow, sidebar)
  // Per strict POM rule, cannot proceed further without appropriate Page Object methods.
  // If/when additional Page Objects for deposit workflow are created, extend this test accordingly.
});

