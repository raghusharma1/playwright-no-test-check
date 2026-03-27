import { BasePage } from './BasePage.js';

export class AccountDetailsPage extends BasePage {
  /**
   * AccountDetailsPage encapsulates actions for the account detail view.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // No static selectors; dynamic method for Account ID cell
  }

  /**
   * Verifies visibility of a given account ID cell in the details table.
   * @param {string|number} accountId
   * @returns {Promise<this>}
   */
  async verifyAccountID(accountId) {
    // 1. page.getByRole('cell', { name: accountId })
    // 2. page.locator('[role="row"]').getByRole('cell', { name: accountId })
    // 3. page.getByText(String(accountId))
    const cell = this.page.getByRole('cell', { name: String(accountId) });
    await cell.waitFor({ state: 'visible', timeout: 20000 });
    return this;
  }
}
