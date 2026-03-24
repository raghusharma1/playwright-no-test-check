import { BasePage } from './BasePage.js';

export class AccountActivity extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'Saving' account bar/button
    /**
     * Primary: page.getByRole('button', { name: 'Saving' })
     * Alt:     page.getByText('Saving')
     */
    this.savingBar = this.page.getByRole('button', { name: 'Saving' });
    // Account cell for ID '1100001'
    /**
     * Primary: page.getByRole('cell', { name: '1100001' })
     * Alt:     page.locator('[role="row"]').getByRole('cell', { name: '1100001' })
     */
    this.accountCell1100001 = this.page.getByRole('cell', { name: '1100001' });
  }

  /**
   * Clicks the 'Saving' account bar to reveal saving account info.
   * @returns {Promise<this>}
   */
  async clickSavingBar() {
    await this.savingBar.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the account cell with ID '1100001'.
   * @returns {Promise<this>}
   */
  async verifyAccountCell() {
    await this.accountCell1100001.click({ timeout: 30000 });
    return this;
  }
}
