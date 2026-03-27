/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: e2e_business_workflow_-_complete_user_journey_01_1774191904
 *
 * Errors are captured in test_iteration_errors_e2e_business_workflow___complete_user_journey_01_1774191904.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { BankSimHomePage } from './pom/BankSimHomePage.js';
import { HomePage } from './pom/HomePage.js';
import { SidebarPage } from './pom/SidebarPage.js';
import { TransferPage } from './pom/TransferPage.js';
import { ConfirmationPage } from './pom/ConfirmationPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
let stepTimeout30 = { timeout: 30000 };

// Helper for today's date formatted as M/D/YYYY
function getTodayDateString() {
  const now = new Date();
  return (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
}

// Scenario: Discovered Workflow: e2e_business_workflow - Complete User Journey

test('Discovered Workflow: e2e_business_workflow - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  // Instrumentation: capture console errors and failed network requests
  const consoleErrors = [];
  const failedRequests = [];
  const allTransferRequests = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        text: msg.text(),
        location: msg.location && msg.location()
      });
      // Log directly for Playwright output
      // console.log('BROWSER CONSOLE ERROR:', msg.text(), msg.location && msg.location());
    }
  });
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      method: request.method(),
      postData: request.postData(),
      failure: request.failure()?.errorText
    });
    // console.log('NETWORK REQUEST FAILED:', request.url(), request.failure()?.errorText);
  });
  page.on('request', request => {
    if (/transfer|funds|transact|api/i.test(request.url()) && request.method() !== 'GET') {
      allTransferRequests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData()
      });
      // console.log('TRANSFER REQUEST:', request.method(), request.url(), request.postData());
    }
  });
  page.on('response', async response => {
    if (/transfer|funds|transact|api/i.test(response.url()) && response.request().method() !== 'GET') {
      const body = await response.text().catch(() => '');
      // console.log('TRANSFER API RESPONSE:', response.status(), response.url(), body.slice(0, 500));
    }
  });

  // Step 1: Navigate to homepage
  const bankSimHome = new BankSimHomePage(page);
  await bankSimHome.navigateToHomePage();
  await expect(page).toHaveURL(new RegExp('^https://www\\.ngpf\\.org/bank-sim([/?]|/home.*)?$'));

  // Step 2: Click 'GET STARTED NOW'
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();
  await expect(page).toHaveURL(new RegExp('^https://www.ngpf.org/bank-sim.*'));

  // Step 3: Dismiss onboarding modal ('Ok')
  await homePage.clickWelcomeOk();
  await expect(page).toHaveURL(new RegExp('^https://www.ngpf.org/bank-sim/?(\\?.*)?$'));

  // Step 4: Expand 'TRANSFERS' section in sidebar
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.expandTransfersSidebar();

  // Step 5: Click 'MAKE A TRANSFER'
  await sidebarPage.openTransferForm();
  await expect(page).toHaveURL(new RegExp('^https://www.ngpf.org/bank-sim/transfer.*'));

  // Step 6: Expand 'PAYMENT FREQUENCY' dropdown
  const transferPage = new TransferPage(page);
  await transferPage.expandPaymentFrequencyDropdown();

  // Step 7: Select 'SINGLE' option
  await transferPage.selectPaymentFrequency();

  // Step 8: Expand 'Transfer From' dropdown
  await transferPage.expandTransferFromDropdown();

  // Step 9: Select 'CHECKING ($216.04)'
  await transferPage.selectTransferFromAccount();

  // Step 10: Expand 'Transfer To' dropdown
  await transferPage.expandTransferToDropdown();

  // Step 11: Select 'SAVING ($230.00)'
  await transferPage.selectTransferToAccount();

  // Step 12: Enter transfer amount '50'
  await transferPage.fillAmountField('50');

  // Step 13: Set payment date to today
  const todayStr = getTodayDateString();
  await transferPage.fillPaymentDateField(todayStr);

  // Step 14: Submit transfer
  await transferPage.submitTransferForm();

  // Step 15: Validate confirmation snackbar & Past Transfers updated
  const confirmationPage = new ConfirmationPage(page);
  await confirmationPage.waitForConfirmationAndHistory();

  // FINAL DEBUG OUTPUT
  // if (consoleErrors.length > 0) {
  //   console.log('FOUND BROWSER CONSOLE ERRORS:', JSON.stringify(consoleErrors, null, 2));
  // }
  // if (failedRequests.length > 0) {
  //   console.log('FOUND NETWORK FAILED REQUESTS:', JSON.stringify(failedRequests, null, 2));
  // }
  // if (allTransferRequests.length === 0) {
  //   console.log('NO TRANSFER API REQUEST FIRED - Possible JS error or missing submit logic.');
  // }
});

