import { BasePage } from './BasePage.js';

export class Sidebar extends BasePage {
  /**
   * Sidebar encapsulates the main navigation actions, such as accessing the 'DEPOSIT CHECKS' section.
   * All selectors are private.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'DEPOSIT CHECKS' navigation link in sidebar
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Navigates to the Deposit Checks section via the sidebar.
   * @returns {Promise<this>}
   */
  async gotoDepositChecks() {
    await this.depositChecksLink.click({ timeout: 30000 });
    return this;
  }
}
