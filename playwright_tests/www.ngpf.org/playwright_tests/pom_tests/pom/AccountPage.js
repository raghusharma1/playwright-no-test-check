import { BasePage } from './BasePage.js';

export class AccountPage extends BasePage {
  /**
   * AccountPage: Handles actions within Account Activity (click Saving bar, verify transaction ID)
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'Saving' bar button
    // 1. page.getByRole('button', { name: 'Saving' })
    // 2. page.getByText('Saving')
    this.savingBarBtn = page.getByRole('button', { name: 'Saving' });

    // Transaction cell containing '1100001'
    // 1. page.getByRole('cell', { name: '1100001' })
    // 2. page.locator('[role="row"]').getByRole('cell', { name: '1100001' })
    this.transactionIdCell = page.getByRole('cell', { name: '1100001' });
  }

  /**
   * Clicks the 'Saving' bar to filter by saving accounts.
   * @returns {Promise<this>}
   */
  async clickSavingBar() {
    await this.savingBarBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Checks that the transaction cell with ID '1100001' is present and visible.
   * @returns {Promise<boolean>} Returns true if visible, false otherwise.
   */
  async isTransactionIdVisible() {
    return await this.transactionIdCell.isVisible({ timeout: 15000 });
  }
}
