import { BasePage } from './BasePage.js';

export class DashboardMenu extends BasePage {
  /**
   * DashboardMenu models the sidebar navigation for bank-sim dashboard.
   * It encapsulates selectors and public actions for expanding account menus and selecting Account Activity.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'ACCOUNTS' main menu (expand)
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.locator('a.mat-list-item')
    // 4. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/a')
    this.accountsMenu = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    // 'ACCOUNT ACTIVITY' menu item
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')
    this.accountActivityMenu = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Expands the 'ACCOUNTS' section in the sidebar menu.
   * @returns {Promise<this>}
   */
  async expandAccountsMenu() {
    await this.accountsMenu.click({ timeout: 30000 });
    return this;
  }

  /**
   * Selects 'ACCOUNT ACTIVITY' from the expanded accounts menu.
   * @returns {Promise<this>}
   */
  async selectAccountActivity() {
    await this.accountActivityMenu.click({ timeout: 30000 });
    return this;
  }
}
