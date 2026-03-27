import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  /**
   * DashboardPage encapsulates navigation and workflow launch actions from the sidebar/dashboard.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Sidebar link: 'DEPOSIT CHECKS'
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Clicks on 'DEPOSIT CHECKS' in the sidebar to enter the Deposit Checks workflow.
   * @returns {Promise<this>}
   */
  async clickDepositChecksSidebar() {
    await this.depositChecksLink.click({ timeout: 30000 });
    return this;
  }
}