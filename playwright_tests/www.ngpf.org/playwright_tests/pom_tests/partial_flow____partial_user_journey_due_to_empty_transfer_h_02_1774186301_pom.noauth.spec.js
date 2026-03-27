import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { HomePage } from './pom/HomePage.js';
import { SidebarMenu } from './pom/SidebarMenu.js';
import { TransferHistoryPage } from './pom/TransferHistoryPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common timeout for all steps
let stepTimeout30 = { timeout: 30000 };

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;


test(
  'Discovered Workflow: partial_flow -- Partial User Journey due to Empty Transfer History',
  { tag: ['@regression'] },
  async ({ page }) => {
    // Step 1: Navigate to homepage
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await homePage.waitForUrl('https://www.ngpf.org/bank-sim', stepTimeout30.timeout);

    // Step 2: Click GET STARTED NOW
    await homePage.clickGetStartedNow();
    await homePage.waitForUrl(
      'https://www.ngpf.org/bank-sim/home?returnUrl=%2F',
      stepTimeout30.timeout
    );

    // Step 3: Dismiss welcome modal/overlay
    await homePage.clickWelcomeOk();
    await homePage.waitForUrl('https://www.ngpf.org/bank-sim/', stepTimeout30.timeout);

    // Step 4: Expand TRANSFERS sidebar menu
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.expandTransfersSidebar();

    // Step 5: Click DISPLAY ALL TRANSFERS to view transfer history
    await sidebarMenu.openTransferHistory();
    await homePage.waitForUrl(
      'https://www.ngpf.org/bank-sim/transfer/display-transfers',
      stepTimeout30.timeout
    );

    // Step 6: Validate empty state in transfer history tables
    const transferHistoryPage = new TransferHistoryPage(page);
    await transferHistoryPage.waitForTablesVisible();
    const emptyTables = await transferHistoryPage.validateEmptyTransferTables();
    await expect(emptyTables, 
      'Expected both Upcoming and Past transfer tables to show empty state (0 of 0 entries).')
      .toBe(true);
  }
);

// Accessibility debugging on failure

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '').replace('.noauth.spec.js', '').replace('.spec.js', '');
      const stateFile = path.join(
        __dirname,
        '..',
        `.accessibility_state_${fileName}.json`
      );
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
