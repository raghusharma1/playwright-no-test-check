import { BasePage } from './BasePage.js';

export class SidebarMenu extends BasePage {
  /**
   * SidebarMenu handles navigation drawer actions such as expanding TRANSFERS and opening MAKE A TRANSFER or displaying transfer history.
   * All navigation selectors are encapsulated as private properties.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // TRANSFERS expandable menu
    // 1. page.locator('a').filter({ hasText: 'TRANSFERS expand_more' })
    // 2. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[4]/a/span/span[4]')
    this.transfersExpandBtn = page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });

    // MAKE A TRANSFER link (appears after expanding TRANSFERS menu)
    // 1. page.locator('a').filter({ hasText: 'MAKE A TRANSFER' })
    // 2. page.getByText('MAKE A TRANSFER')
    // 3. page.locator('a').filter({ hasText: /^MAKE A TRANSFER$/ })
    this.makeTransferLink = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });
    
    // DISPLAY ALL TRANSFERS link in sidebar
    // 1. page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' })
    // 2. page.getByText('DISPLAY ALL TRANSFERS')
    // 3. page.locator('a').filter({ hasText: /^DISPLAY ALL TRANSFERS$/ })
    this.displayAllTransfersLink = page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' });

    // DEPOSIT CHECKS link in sidebar
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Opens the TRANSFERS menu in the sidebar navigation.
   * @returns {Promise<this>}
   */
  async expandTransfersMenu() {
    await this.transfersExpandBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Navigates to the MAKE A TRANSFER page from sidebar. Assumes TRANSFERS is expanded.
   * @returns {Promise<this>}
   */
  async clickMakeTransfer() {
    await this.makeTransferLink.click({ timeout: 20000 });
    return this;
  }

  /**
   * Navigates to the DISPLAY ALL TRANSFERS (Transfer History) page from sidebar.
   * Assumes TRANSFERS is expanded.
   * @returns {Promise<this>}
   */
  async clickDisplayAllTransfers() {
    await this.displayAllTransfersLink.click({ timeout: 25000 });
    return this;
  }

  /**
   * Clicks the DEPOSIT CHECKS link in the sidebar.
   * @returns {Promise<this>}
   */
  async clickDepositChecks() {
    await this.depositChecksLink.click({ timeout: 20000 });
    return this;
  }
}
