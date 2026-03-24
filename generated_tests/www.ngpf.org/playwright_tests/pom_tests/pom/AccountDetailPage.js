import { BasePage } from './BasePage.js';

export class AccountDetailPage extends BasePage {
  /**
   * AccountDetailPage for account details and workflow (Checking/Savings)
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    /**
     * Search input on transaction table
     * Primary: page.getByPlaceholder('Search')
     * Alternatives:
     *   page.locator('input[data-placeholder="Search"]')
     */
    this.searchInput = this.page.getByPlaceholder('Search');
    /**
     * Transaction delete icon/button
     * Primary: page.getByText('close')
     * Alternatives:
     *   page.getByRole('img', { name: 'close' })
     */
    this.deleteIcon = this.page.getByText('close');
    /**
     * Sidebar TRANSFERS navigation link
     * Primary: page.locator('a').filter({ hasText: 'TRANSFERS expand_more' })
     * Alternatives:
     *   page.locator('a.mat-list-item.mat-focus-indicator')
     */
    this.sidebarTransfers = this.page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });
    /**
     * Sidebar DISPLAY ALL TRANSFERS
     * Primary: page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' })
     * Alternatives:
     *   page.getByText('DISPLAY ALL TRANSFERS')
     */
    this.sidebarAllTransfers = this.page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' });
  }

  /**
   * Input invalid transaction search
   * @param {string} value
   * @returns {Promise<AccountDetailPage>}
   */
  async inputInvalidTransactionSearch(value) {
    await this.searchInput.fill(value, { timeout: 30000 });
    return this;
  }
  /**
   * Click the transaction delete icon
   * @returns {Promise<AccountDetailPage>}
   */
  async deleteTransaction() {
    await this.deleteIcon.click({ timeout: 30000 });
    return this;
  }
  /**
   * Click sidebar TRANSFERS navigation
   * @returns {Promise<AccountDetailPage>}
   */
  async navigateToTransfers() {
    await this.sidebarTransfers.click({ timeout: 30000 });
    return this;
  }
  /**
   * Click sidebar DISPLAY ALL TRANSFERS
   * @returns {Promise<AccountDetailPage>}
   */
  async displayAllTransfers() {
    await this.sidebarAllTransfers.click({ timeout: 30000 });
    return this;
  }
}
