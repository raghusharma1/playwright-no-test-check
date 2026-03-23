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

test('Discovered Workflow: e2e_business_workflow - Complete User Journey (Onboarding Only)', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', ...stepTimeout30 });

  // Step 2: Click 'GET STARTED NOW' button
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' on welcome modal
  await homePage.clickWelcomeOk();

  // Step 4+ cannot be implemented: No POM methods for navigation or deposit workflow for steps beyond onboarding.
});

