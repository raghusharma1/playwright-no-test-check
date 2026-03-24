import { BasePage } from './BasePage.js';

export class MenuNavigation extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Selectors for navigation menu items
    /**
     * 'ACCOUNTS' menu item:
     *   Primary: page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
     *   Alt:     page.locator('a.mat-list-item.mat-focus-indicator')
     */
    this.accountsMenu = this.page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    /**
     * 'ACCOUNT ACTIVITY' item:
     *   Primary: page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
     *   Alt:     page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
     */
    this.accountActivityMenu = this.page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Clicks the 'ACCOUNTS' menu item to expand account options.
   * @returns {Promise<this>}
   */
  async clickAccountsMenu() {
    await this.accountsMenu.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'ACCOUNT ACTIVITY' menu item.
   * @returns {Promise<this>}
   */
  async clickAccountActivityMenu() {
    await this.accountActivityMenu.click({ timeout: 30000 });
    return this;
  }
}
