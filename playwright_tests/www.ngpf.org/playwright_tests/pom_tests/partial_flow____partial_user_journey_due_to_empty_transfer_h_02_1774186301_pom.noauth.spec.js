import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { BankSimHomePage } from './pom/BankSimHomePage.js';
import { HomePage } from './pom/HomePage.js';
import { SidebarPage } from './pom/SidebarPage.js';
import { TransferHistoryPage } from './pom/TransferHistoryPage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;
let stepTimeout30 = { timeout: 30000 };

// Scenario: Partial flow -- Partial User Journey due to Empty Transfer History

test(
  'Discovered Workflow: partial_flow -- Partial User Journey due to Empty Transfer History',
  { tag: ['@smoke'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const bankSimHomePage = new BankSimHomePage(page);
    await bankSimHomePage.navigateToHomePage();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim');

    // Step 2: Click 'GET STARTED NOW'
    const homePage = new HomePage(page);
    await homePage.clickGetStartedNow();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/home?returnUrl=%2F');

    // Step 3: Dismiss welcome modal
    await homePage.clickWelcomeOk();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/');

    // Step 4: Expand 'TRANSFERS' sidebar
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.expandTransfersSidebar();

    // Step 5: Click 'DISPLAY ALL TRANSFERS' to enter transfer history view
    await sidebarPage.openTransferHistory();
    await expect(page).toHaveURL('https://www.ngpf.org/bank-sim/transfer/display-transfers');

    // Step 6: Validate both tables are empty ("0 of 0" records)
    const transferHistoryPage = new TransferHistoryPage(page);
    await transferHistoryPage.waitForTablesVisible();
    const emptyState = await transferHistoryPage.isEmptyStateDisplayed();
    expect(emptyState).toBe(true);
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
