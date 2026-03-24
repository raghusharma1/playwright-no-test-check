import { BasePage } from './BasePage.js';

export class TransferDashboardPage extends BasePage {
  /**
   * TransferDashboardPage for transfers dashboard and workflow
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    /**
     * Checking select button
     * Primary: page.locator('button').filter({ hasText: 'Checking' }).first()
     * Alternatives:
     *   page.getByRole('button', { name: 'Checking' })
     */
    this.checkingBtn = this.page.locator('button').filter({ hasText: 'Checking' }).first();
    /**
     * Savings select button
     * Primary: page.locator('button').filter({ hasText: 'Saving' }).first()
     * Alternatives:
     *   page.getByRole('button', { name: 'Saving' })
     */
    this.savingBtn = this.page.locator('button').filter({ hasText: 'Saving' }).first();
    /**
     * Search input in Upcoming Transfers
     * Primary: page.locator('#mat-input-2')
     * Alternatives:
     *   page.locator('input[data-placeholder="Search"]'), page.getByPlaceholder('Search')
     */
    this.transferSearchInput = this.page.locator('#mat-input-2');
    /**
     * Form filter/submit button (Saving scenario)
     * Primary: page.locator('form').filter({ hasText: 'close' })
     */
    this.savingTransferForm = this.page.locator('form').filter({ hasText: 'close' });
    /**
     * Items per page dropdown (mat-select)
     * Primary: page.locator('#mat-select-4')
     */
    this.pastTransfersItemsDropdown = this.page.locator('#mat-select-4');
    /**
     * Items per page option 15 (dropdown option)
     * Primary: page.getByRole('option', { name: '15' })
     */
    this.itemsPerPageOption15 = this.page.getByRole('option', { name: '15' });
  }

  /**
   * Filter/switch table to Checking account
   * @returns {Promise<TransferDashboardPage>}
   */
  async switchTransferToChecking() {
    await this.checkingBtn.click({ timeout: 30000 });
    return this;
  }
  /**
   * Input invalid transfer search
   * @param {string} value
   * @returns {Promise<TransferDashboardPage>}
   */
  async inputInvalidTransferSearch(value) {
    await this.transferSearchInput.fill(value, { timeout: 30000 });
    return this;
  }
  /**
   * Switch to Saving account transfer table
   * @returns {Promise<TransferDashboardPage>}
   */
  async switchTransferToSaving() {
    await this.savingBtn.click({ timeout: 30000 });
    return this;
  }
  /**
   * Submit the transfer form (Saving scenario)
   * @returns {Promise<TransferDashboardPage>}
   */
  async submitSavingsTransfer() {
    await this.savingTransferForm.click({ timeout: 30000 });
    return this;
  }
  /**
   * Change items per page in Past Transfers table to 10 using dropdown
   * @param {string|number} value
   * @returns {Promise<TransferDashboardPage>}
   */
  async selectPastTransfersItemsPerPage(value) {
    await this.pastTransfersItemsDropdown.selectOption(value.toString(), { timeout: 30000 });
    return this;
  }
  /**
   * Change items per page to 15 (via explicit option selection)
   * @returns {Promise<TransferDashboardPage>}
   */
  async selectPastTransfersItemsPerPageSecond() {
    await this.itemsPerPageOption15.click({ timeout: 30000 });
    return this;
  }
}
