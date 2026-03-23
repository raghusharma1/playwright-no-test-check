import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage models the savings/checking account view with action selectors for new UI.
   * All selectors are encapsulated and private to this object.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Savings and Checking tab buttons
    this.checkingTab = page.getByRole('button', { name: 'Checking' });
    this.savingTab = page.getByRole('button', { name: 'Saving' });
  }

  /**
   * Clicks the 'Saving' button to show savings account transactions.
   * @returns {Promise<this>}
   */
  async clickSavingAccount() {
    await this.savingTab.click({ timeout: 25000 });
    return this;
  }

  /**
   * Clicks the 'Checking' button to show checking account transactions.
   * @returns {Promise<this>}
   */
  async clickCheckingAccount() {
    await this.checkingTab.click({ timeout: 25000 });
    return this;
  }
}
