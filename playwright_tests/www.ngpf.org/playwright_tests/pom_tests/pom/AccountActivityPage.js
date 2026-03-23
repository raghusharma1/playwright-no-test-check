import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * Models the Account Activity page (Savings Account view).
   * Encapsulates selectors for the 'Saving' tab, 'VIEW ACCOUNT' and transaction ID cell.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'Saving' account tab (actually a button)
    this.savingTab = page.getByRole('button', { name: 'Saving' });
    // 'VIEW ACCOUNT' buttons may not be unique -- select '.first()' on intended account bar
    this.viewAccountBtn = page.getByRole('button', { name: 'VIEW ACCOUNT' });
  }

  /** Switches to 'Saving' account tab. */
  async selectSavingTab() {
    await this.savingTab.click({ timeout: 15000 });
    return this;
  }

  /** Clicks 'VIEW ACCOUNT' to show savings account detail/table. (Disambiguate strictly using .first()) */
  async clickViewAccountBar() {
    await this.viewAccountBtn.first().click({ timeout: 30000 });
    return this;
  }

  /** Returns a locator for ANY transaction cell with a 7-digit numeric ID. */
  getAnyTransactionIdCell() {
    return this.page.getByRole('cell', { name: /\b\d{7}\b/ });
  }

  /** Returns a locator for a transaction cell with the specified id string. */
  getTransactionCellById(id) {
    return this.page.getByRole('cell', { name: id });
  }
}
