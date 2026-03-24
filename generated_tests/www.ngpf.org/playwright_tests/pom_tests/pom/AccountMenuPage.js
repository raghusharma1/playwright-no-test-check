import { BasePage } from './BasePage.js';

export class AccountMenuPage extends BasePage {
  constructor(page) {
    super(page);
    // All selectors for 'ACCOUNTS expand_more' menu item:
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    this.accountsMenu = this.page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
  }

  /**
   * Clicks the 'ACCOUNTS expand_more' menu item to expand Accounts navigation.
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async clickAccountsMenu(timeout = 30000) {
    await this.accountsMenu.click({ timeout });
    return this;
  }
}
