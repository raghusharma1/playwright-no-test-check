import { BasePage } from './BasePage.js';

export class Sidebar extends BasePage {
  /**
   * Sidebar: Handles sidebar navigation actions (expand accounts, select account activity).
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'ACCOUNTS' section (expandable menu)
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    this.accountsExpandLink = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    // 'ACCOUNT ACTIVITY' menu item
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    this.accountActivityLink = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Expands the 'ACCOUNTS' section in the sidebar.
   * @returns {Promise<this>}
   */
  async expandAccountsSection() {
    await this.accountsExpandLink.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects the 'ACCOUNT ACTIVITY' menu item in the sidebar (navigates to account activity page).
   * @returns {Promise<this>}
   */
  async selectAccountActivity() {
    await this.accountActivityLink.click({ timeout: 30000 });
    return this;
  }
}
