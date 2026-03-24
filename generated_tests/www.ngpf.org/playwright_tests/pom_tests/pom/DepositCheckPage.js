import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * DepositCheckPage for deposit checks and navigation sidebar
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    /**
     * Sidebar SHOPPING navigation link
     * Primary: page.locator('a').filter({ hasText: 'SHOPPING' })
     * Alternatives:
     *   page.getByText('SHOPPING')
     */
    this.sidebarShopping = this.page.locator('a').filter({ hasText: 'SHOPPING' });
  }

  /**
   * Navigate to Shopping section via sidebar
   * @returns {Promise<DepositCheckPage>}
   */
  async navigateToShopping() {
    await this.sidebarShopping.click({ timeout: 30000 });
    return this;
  }
}
