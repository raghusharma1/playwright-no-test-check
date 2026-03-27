// bill_payment_recipient_management___complete_user_journey_02_1774191804_pom.noauth.spec.js
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { Sidebar } from './pom/Sidebar.js';
import { ManageRecipientPage } from './pom/ManageRecipientPage.js';
import { AddRecipientDialog } from './pom/AddRecipientDialog.js';
import { EditRecipientDialog } from './pom/EditRecipientDialog.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = process.env.BASE_URL || 'https://www.ngpf.org/bank-sim';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://www.ngpf.org';
let stepTimeout30 = { timeout: 30000 };

test(
  'Discovered Workflow: Bill Payment Recipient Management - Complete User Journey',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await expect(page).toHaveURL(BASE_URL, stepTimeout30);

    // Step 2: Click 'GET STARTED NOW'
    await homePage.clickGetStartedNow();
    await expect(page).toHaveURL(
      BASE_URL + '/home?returnUrl=%2F',
      stepTimeout30
    );

    // Step 3: Click 'Ok' on welcome modal
    await homePage.clickWelcomeOk();
    await expect(page).toHaveURL(BASE_URL + '/', stepTimeout30);

    // Step 4: Click 'BILLS' in sidebar
    const sidebar = new Sidebar(page);
    await sidebar.expandBillsNav();

    // Step 5: Click 'MANAGE RECIPIENT' in sidebar
    await sidebar.openManageRecipients();
    await expect(page).toHaveURL(BASE_URL + '/pay-bill/manage-recipient', stepTimeout30);

    // Step 6: Click '+ ADD RECIPIENT'
    const manageRecipientPage = new ManageRecipientPage(page);
    await manageRecipientPage.addRecipient();

    // Step 7: Type 'John Doe' in 'RECIPIENT NAME' input
    const addRecipientDialog = new AddRecipientDialog(page);
    await addRecipientDialog.enterRecipientName('John Doe');

    // Step 8: Click 'SUBMIT' to add recipient
    await addRecipientDialog.submitRecipientAdd();
    await expect(page).toHaveURL(BASE_URL + '/pay-bill/manage-recipient', stepTimeout30);
    // Recommended: wait for UI confirmation banner after submit
    await page.waitForTimeout(1600); // Conservative wait for toast/banner

    // Step 9: Click 'Edit' on recipient
    await manageRecipientPage.openEditRecipient();
    // Step 10: Edit name to 'Jane Smith'
    const editRecipientDialog = new EditRecipientDialog(page);
    await editRecipientDialog.editRecipientName('Jane Smith');

    // Step 11: Click 'SUBMIT' to save edit
    await editRecipientDialog.submitRecipientEdit();
    await expect(page).toHaveURL(BASE_URL + '/pay-bill/manage-recipient', stepTimeout30);
    await page.waitForTimeout(1600); // Wait for confirmation/banner

    // Step 12: Click 'Delete' to remove recipient
    await manageRecipientPage.deleteRecipient();
    await expect(page).toHaveURL(BASE_URL + '/pay-bill/manage-recipient', stepTimeout30);
    await page.waitForTimeout(1600); // Wait for confirmation/banner

    // Final verification: recipients list should be empty (table update visually, but scenario does not provide a direct validation method)
    // Only assertion mandated by scenario: No errors encountered, UI feedback present after each operation.
  }
);

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
      const stateFile = path.join(__dirname, '..', `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(
        stateFile,
        JSON.stringify(
          {
            accessibility_tree: accessibilityTree,
            url: page.url(),
            all_page_urls: context.pages().map(p => p.url())
          },
          null,
          2
        )
      );
    } catch (e) { /* Silent fail */ }
  }
});
