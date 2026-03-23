// bill_payment_recipient_management___complete_user_journey_02_1774191804_pom.noauth.spec.js
import 'dotenv/config';
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { HomePage } from './pom/HomePage.js';
import { WelcomeDialog } from './pom/WelcomeDialog.js';
import { ManageRecipientPage } from './pom/ManageRecipientPage.js';
import { AddRecipientDialog } from './pom/AddRecipientDialog.js';
import { EditRecipientDialog } from './pom/EditRecipientDialog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Per project rule: enforce no auth state for .noauth. test
// (in case global config tries to set it)
test.use({ storageState: { cookies: [], origins: [] } });

/**
 * Discovered Workflow: Bill Payment Recipient Management - Complete User Journey
 * Covers onboarding, manages recipient add/edit/delete, with UI confirmation.
 */
test('Discovered Workflow: Bill Payment Recipient Management - Complete User Journey (POM)', async ({ page }) => {
  // Step 1: Navigate to homepage
  await page.goto('https://www.ngpf.org/bank-sim', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Step 2: Click 'GET STARTED NOW'
  const homePage = new HomePage(page);
  await homePage.clickGetStartedNow();

  // Step 3: Click 'Ok' in Welcome Modal
  // Use WelcomeDialog.clickWelcomeOkButton per its API
  const welcomeDialog = new WelcomeDialog(page);
  await welcomeDialog.clickWelcomeOkButton();

  // Step 4: Click 'BILLS' sidebar to expand
  await page.locator('a').filter({ hasText: 'BILLS expand_more' }).click({ timeout: 20000 });

  // Step 5: Click 'MANAGE RECIPIENT' link in sidebar
  await page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' }).click({ timeout: 20000 });
  const manageRecipient = new ManageRecipientPage(page);

  // Step 6: Click '+ADD RECIPIENT'
  await manageRecipient.clickAddRecipient();

  // Step 7: Type 'John Doe' in AddRecipientDialog name field
  const addRecipientDialog = new AddRecipientDialog(page);
  await addRecipientDialog.enterRecipientName('John Doe');

  // Step 8: Click 'SUBMIT' to add recipient
  await addRecipientDialog.submitRecipientAdd();

  // Step 8.1: Verify success/recipient visible ('Payee updated successfully.' in banner or in recipient table)
  // Instead of brittle banner, assert 'John Doe' appears in page after submission
  await expect(page.getByText('John Doe')).toBeVisible({ timeout: 7000 });

  // Step 9: Click 'Edit' on recipient row
  await manageRecipient.clickEditRecipient();

  // Step 10: Change name to 'Jane Smith' in edit dialog and submit
  const editRecipientDialog = new EditRecipientDialog(page);
  await editRecipientDialog.editRecipientName('Jane Smith');
  await editRecipientDialog.submitRecipientEdit();

  // Step 11: Verify updated name shows up in table ('Jane Smith')
  await expect(page.getByText('Jane Smith')).toBeVisible({ timeout: 7000 });

  // Step 12: Click 'Delete' on the newly edited recipient
  await manageRecipient.clickDeleteRecipient();

  // Step 13: Expect deletion success message or that name is gone
  // Typical deletion: expect no 'Jane Smith' in table
  await expect(page.getByText('Jane Smith')).toHaveCount(0, { timeout: 7000 });
});

