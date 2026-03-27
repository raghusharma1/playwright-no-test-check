import { BasePage } from './BasePage.js';

/**
 * DashboardPage models the main dashboard/landing page after dismissal of welcome modal, including sidebar navigation.
 */
export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    // Sidebar link: DEPOSIT CHECKS
    // 1. page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // 2. page.getByText('DEPOSIT CHECKS')
    // 3. page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksLink = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Clicks the 'DEPOSIT CHECKS' sidebar link to enter the deposit workflow.
   * @returns {Promise<this>}
   */
  async clickDepositChecksSidebar() {
    await this.depositChecksLink.click({ timeout: 25000 });
    return this;
  }
}
