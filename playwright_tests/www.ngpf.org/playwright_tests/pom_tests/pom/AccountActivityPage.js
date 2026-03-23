import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage models the account review and transaction table filtering.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'Saving' account filter button
    // 1. page.getByRole('button', { name: 'Saving' })
    // 2. page.getByText('Saving')
    // 3. page.locator('button.mat-focus-indicator.mat-button')
    // 4. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^Saving$/ })
    this.savingBtn = page.getByRole('button', { name: 'Saving' });

    // Transaction cell containing ID '1100001'
    // 1. page.getByRole('cell', { name: '1100001' })
    // 2. page.getByText('1100001')
    // 3. page.locator('td').filter({ hasText: '1100001' })
    this.transactionIdCell = page.getByRole('cell', { name: '1100001' });
  }

  /**
   * Clicks the 'Saving' button to filter the account transactions.
   * @returns {Promise<this>}
   */
  async clickSavingBar() {
    await this.savingBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Returns the transaction cell element for ID '1100001'. Test code can assert presence/content.
   * @returns {Promise<string>}
   */
  async getTransactionCellContent() {
    await this.transactionIdCell.waitFor({ timeout: 30000 });
    return await this.transactionIdCell.textContent();
  }

  /**
   * Clicks the transaction cell for ID '1100001' (optional interactive action).
   * @returns {Promise<this>}
   */
  async clickTransactionCell() {
    await this.transactionIdCell.click({ timeout: 15000 });
    return this;
  }
}
