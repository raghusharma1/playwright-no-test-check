import { BasePage } from './BasePage.js';

export class AccountMenuPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for 'ACCOUNTS expand_more' section
    // Primary: page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // Alternative: page.locator('a.mat-list-item.mat-focus-indicator')
    this.accountsSectionLink = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });

    // Selector for 'ACCOUNT ACTIVITY' menu item
    // Primary: page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // Alternative: page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    this.accountActivityLink = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Clicks the 'ACCOUNTS expand_more' section to open accounts submenu.
   * @returns {Promise<this>}
   */
  async clickAccountsSection() {
    await this.accountsSectionLink.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'ACCOUNT ACTIVITY' nav menu to view account activity.
   * @returns {Promise<this>}
   */
  async clickAccountActivityMenu() {
    await this.accountActivityLink.click({ timeout: 30000 });
    return this;
  }
}
