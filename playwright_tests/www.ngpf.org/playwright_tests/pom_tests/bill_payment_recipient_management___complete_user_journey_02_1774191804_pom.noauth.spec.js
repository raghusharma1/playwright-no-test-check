import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { SidebarPage } from './pom/SidebarPage.js';
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

// Main business workflow (single scenario per instructions)
test('Discovered Workflow: Bill Payment Recipient Management - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await expect(page).toHaveURL(BASE_URL);
    
    // Step 2: Click 'GET STARTED NOW'
    await homePage.clickGetStartedNow();
    // Step 3: Click Ok in welcome modal
    await homePage.clickWelcomeOk();
    await expect(page).toHaveURL(new RegExp('^https://www.ngpf.org/bank-sim(/.*)?$'));
    
    // Step 4: Click 'BILLS' in sidebar to expand
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.expandBillsNav();
    
    // Step 5: Click 'MANAGE RECIPIENT' to open panel
    await sidebarPage.openManageRecipients();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/pay-bill/manage-recipient');
    
    const manageRecipientPage = new ManageRecipientPage(page);
    
    // Step 6: Click '+ ADD RECIPIENT'
    await manageRecipientPage.addRecipient();
    // Step 7: Enter recipient name in dialog
    const addRecipientDialog = new AddRecipientDialog(page);
    await addRecipientDialog.enterRecipientName('John Doe');
    // Step 8: Click 'SUBMIT' to add recipient
    await addRecipientDialog.submitRecipientAdd();
    // Wait for banner/toast and verify recipient appears (banner handled by app, so just minimal pause)
    await page.waitForTimeout(1500);
    // Verify table contains 'John Doe'
    await expect(page.getByText('John Doe')).toBeVisible(stepTimeout30);
    
    // Step 9: Click 'Edit' on recipient row
    await manageRecipientPage.openEditRecipient();
    const editRecipientDialog = new EditRecipientDialog(page);
    // Step 10: Edit recipient name to 'Jane Smith'
    await editRecipientDialog.editRecipientName('Jane Smith');
    // Step 11: Click 'SUBMIT' to save edits
    await editRecipientDialog.submitRecipientEdit();
    await page.waitForTimeout(1500);
    // Verify table contains 'Jane Smith'
    await expect(page.getByText('Jane Smith')).toBeVisible(stepTimeout30);
    
    // Step 12: Click 'Delete' to remove recipient
    await manageRecipientPage.deleteRecipient();
    await page.waitForTimeout(1500);
    // Verify recipient is removed (no 'Jane Smith' visible)
    await expect(page.getByText('Jane Smith')).not.toBeVisible(stepTimeout30);
    // Verify table is empty (could be more robust with row count, but as per scenario, empty state check)
    // Depending on empty state UI, this may require an alternate assertion.
});

test.afterEach(async ({ page, context }, testInfo) => {
    if (testInfo.status !== 'passed') {
        try {
            const accessibilityTree = await page.accessibility.snapshot();
            const fileName = path.basename(testInfo.file)
                .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
            const stateFile = path.join(__dirname, '..', `.accessibility_state_${fileName}.json`);
            fs.writeFileSync(stateFile, JSON.stringify({
                accessibility_tree: accessibilityTree,
                url: page.url(),
                all_page_urls: context.pages().map(p => p.url())
            }, null, 2));
        } catch (e) { /* Silent fail */ }
    }
});
