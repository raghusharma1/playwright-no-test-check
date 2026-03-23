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
    
    // ACCOUNTS expandable menu
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.locator('a.mat-list-item')
    // 4. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/a')
    this.accountsExpandBtn = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
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
   * Expands the ACCOUNTS menu in the sidebar navigation drawer.
   * @returns {Promise<this>}
   */
  async clickAccountsMenu() {
    await this.accountsExpandBtn.click({ timeout: 25000 });
    return this;
  }
}
