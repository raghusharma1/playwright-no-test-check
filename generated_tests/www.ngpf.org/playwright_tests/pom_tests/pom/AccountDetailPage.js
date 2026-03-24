import { BasePage } from './BasePage.js';

export class AccountDetailPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for 'VIEW ACCOUNT' button in Saving Account bar
    // Use the FIRST matching button for 'VIEW ACCOUNT' (most likely correct position)
    this.viewAccountButton = page.getByRole('button', { name: 'VIEW ACCOUNT' }).first();
    // Locator for account ID text ('1100001') for verification
    // Primary: page.getByText('1100001')
    this.accountIdText = page.getByText('1100001');
  }

  /**
   * Clicks the 'VIEW ACCOUNT' button to show Saving account details.
   * @returns {Promise<this>}
   */
  async clickViewAccountButton() {
    await this.viewAccountButton.click({ timeout: 30000 });
    return this;
  }

  /**
   * Returns a locator for the account ID text, for test assertions.
   * @returns {import('playwright').Locator}
   */
  getAccountIdLocator() {
    return this.accountIdText;
  }
}
