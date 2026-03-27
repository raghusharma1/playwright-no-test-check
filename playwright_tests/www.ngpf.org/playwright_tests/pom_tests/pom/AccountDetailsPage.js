import { BasePage } from './BasePage.js';

/**
 * AccountDetailsPage models the account details section after navigating from sidebar.
 */
export class AccountDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    // Use an unambiguous selector (role=button, exact name, first match)
    this.viewAccountBtn = page.getByRole('button', { name: 'VIEW ACCOUNT' }).first();
    // Selector for 'Saving' account tab button
    this.savingTabBtn = page.getByRole('button', { name: 'Saving' });
  }

  /**
   * Clicks the 'VIEW ACCOUNT' button to view account details.
   * @returns {Promise<AccountDetailsPage>} (returning self, since it stays on details)
   */
  async viewAccountDetails() {
    await this.viewAccountBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Select the 'Saving' account tab.
   * @returns {Promise<AccountDetailsPage>} (returns self for chaining)
   */
  async selectSavingAccount() {
    await this.savingTabBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Checks for the presence of the specified Account ID in details view.
   * @param {string} accountIdText
   * @returns {Promise<boolean>} true if found, false otherwise
   */
  async isAccountIdPresent(accountIdText) {
    // Usage: await page.locator('text=1100001').isVisible()
    return await this.page.locator(`text=${accountIdText}`).isVisible({ timeout: 15000 });
  }
}
