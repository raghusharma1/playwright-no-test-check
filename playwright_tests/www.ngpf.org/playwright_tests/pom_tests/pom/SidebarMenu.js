import { BasePage } from './BasePage.js';

export class SidebarMenu extends BasePage {
  /**
   * SidebarMenu handles navigation drawer actions such as expanding TRANSFERS and ACCOUNTS sections,
   * opening MAKE A TRANSFER, displaying transfer history, and switching to account activity view.
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

    // ACCOUNTS expandable menu
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.locator('a.mat-list-item')
    this.accountsExpandBtn = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    // ACCOUNT ACTIVITY link (within sidebar)
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')
    this.accountActivityLink = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
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
   * Scenario alias for expanding TRANSFERS section. (Same as expandTransfersMenu)
   * @returns {Promise<this>}
   */
  async expandTransfersSidebar() {
    return this.expandTransfersMenu();
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
   * Scenario alias for clicking DISPLAY ALL TRANSFERS (same as clickDisplayAllTransfers).
   * @returns {Promise<this>}
   */
  async openTransferHistory() {
    return this.clickDisplayAllTransfers();
  }

  /**
   * Expands the ACCOUNTS section of the sidebar navigation.
   * @returns {Promise<this>}
   */
  async expandAccountsSection() {
    await this.accountsExpandBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Navigates to ACCOUNT ACTIVITY section from sidebar. Assumes ACCOUNTS is expanded.
   * @returns {Promise<this>}
   */
  async openAccountActivity() {
    await this.accountActivityLink.click({ timeout: 20000 });
    return this;
  }
}
