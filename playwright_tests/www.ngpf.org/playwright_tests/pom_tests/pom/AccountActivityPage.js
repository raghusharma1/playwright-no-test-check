import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage encapsulates actions on the activity summary screen.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // More robust: take the FIRST "VIEW ACCOUNT" button (Checking first)
    // (role selector and regex for whitespace-tolerant, .first() for unique)
    this.viewAccountBtn = page.getByRole('button', { name: /^\s*VIEW ACCOUNT\s*$/ }).first();
  }

  /**
   * Click the VIEW ACCOUNT button to navigate to account details page.
   * @returns {Promise<this>}
   */
  async viewAccountDetails() {
    await this.viewAccountBtn.click({ timeout: 30000 });
    return this;
  }
}
