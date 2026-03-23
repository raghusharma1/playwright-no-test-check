import { BasePage } from './BasePage.js';

export class DashboardSideMenu extends BasePage {
  /**
   * Models the dashboard sidebar menu for navigation.
   * Provides actions for 'ACCOUNTS' and 'ACCOUNT ACTIVITY' menu items.
   * All selectors are private, with alternatives documented in comments.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'ACCOUNTS' menu link
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/a')
    this.accountsMenuLink = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    // 'ACCOUNT ACTIVITY' menu item
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')
    this.accountActivityMenuItem = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Clicks the 'ACCOUNTS' menu item.
   * @returns {Promise<this>}
   */
  async clickAccountsMenu() {
    await this.accountsMenuLink.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'ACCOUNT ACTIVITY' submenu item.
   * @returns {Promise<this>}
   */
  async clickAccountActivityMenu() {
    await this.accountActivityMenuItem.click({ timeout: 30000 });
    return this;
  }
}
