import { BasePage } from './BasePage.js';

export class Sidebar extends BasePage {
  /**
   * Sidebar encapsulates the navigation actions for sidebar expandable menus and navigation links.
   * All selectors are defined as class properties (private to POM).
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'BILLS' expandable nav
    // 1. page.locator('a').filter({ hasText: 'BILLS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    this.billsExpandNav = page.locator('a').filter({ hasText: 'BILLS expand_more' });
    
    // 'MANAGE RECIPIENT' nav link
    // 1. page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' })
    // 2. page.getByText('MANAGE RECIPIENT')
    // 3. page.locator('a').filter({ hasText: /^MANAGE RECIPIENT$/ })
    this.manageRecipientNav = page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' });
  }

  /**
   * Expands the 'BILLS' menu in the sidebar.
   * @returns {Promise<this>}
   */
  async expandBillsNav() {
    await this.billsExpandNav.click({ timeout: 25000 });
    return this;
  }

  /**
   * Clicks on 'MANAGE RECIPIENT' in the sidebar navigation.
   * @returns {Promise<this>}
   */
  async openManageRecipients() {
    await this.manageRecipientNav.click({ timeout: 30000 });
    return this;
  }
}
