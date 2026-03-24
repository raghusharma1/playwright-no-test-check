import { BasePage } from './BasePage.js';

// POM for the navigation drawer/menu in BankSim
export class DrawerMenuPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Selector for 'ACCOUNTS expand_more' drawer item
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    this.accountsDrawerLink = this.page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
    // Selector for 'ACCOUNT ACTIVITY' inside drawer
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    this.accountActivityLink = this.page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Expand the 'ACCOUNTS' drawer in the menu.
   * @returns {Promise<this>}
   */
  async expandAccountsDrawer() {
    await this.accountsDrawerLink.click({ timeout: 30000 });
    return this;
  }

  /**
   * Click the 'ACCOUNT ACTIVITY' link.
   * @returns {Promise<this>}
   */
  async goToAccountActivity() {
    await this.accountActivityLink.click({ timeout: 30000 });
    return this;
  }
}
