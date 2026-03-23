import { BasePage } from './BasePage.js';

export class AccountActivityMenu extends BasePage {
  /**
   * AccountActivityMenu models the navigation menu for account activity actions.
   * All selectors are encapsulated as class properties.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // ACCOUNT ACTIVITY link in expanded menu
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')
    this.accountActivityLink = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  /**
   * Clicks ACCOUNT ACTIVITY link to go to account activity view.
   * @returns {Promise<this>}
   */
  async clickAccountActivityMenu() {
    await this.accountActivityLink.click({ timeout: 30000 });
    return this;
  }
}
