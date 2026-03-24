import { BasePage } from './BasePage.js';

// POM for the Account Details & Activity page
export class AccountPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Selector for 'VIEW ACCOUNT' button (now unique after 'Saving' tab selected)
    this.viewAccountBtn = this.page.getByText('VIEW ACCOUNT');
    // Selector for 'Saving' account tab button
    this.savingAccountBtn = this.page.getByRole('button', { name: 'Saving' });
    // Selector for account activity cell with value '1100001'
    this.activityCell1100001 = this.page.getByRole('cell', { name: '1100001' });
    // Selector for the Account Number/Routing Number modal dialog (using role=dialog)
    this.accountNumberDialog = this.page.getByRole('dialog');
  }

  /**
   * Clicks the 'Saving' tab, then the 'VIEW ACCOUNT' button for the Saving account.
   * Then closes the Account Number/Routing Number dialog if it appears.
   * @returns {Promise<this>}
   */
  async viewSavingsAccount() {
    await this.savingAccountBtn.click({ timeout: 30000 });
    await this.viewAccountBtn.click({ timeout: 30000 });
    // After click, check if modal dialog appeared, and dismiss it by pressing Escape if needed
    // Wait for dialog up to 2s (if it doesn't appear, move on)
    if (await this.accountNumberDialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Try pressing Escape to close modal
      await this.page.keyboard.press('Escape');
      // Wait for modal to close (up to 2s)
      await this.accountNumberDialog.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      // Add a short stabilization wait
      await this.page.waitForTimeout(500);
    }
    return this;
  }

  /**
   * Clicks the 'Saving' account tab to activate the account
   * (may be redundant immediately after viewSavingsAccount, but kept for scenario fidelity).
   * @returns {Promise<this>}
   */
  async activateSavingsAccount() {
    // Only click 'Saving' tab if no dialog is open (since if modal is open, user can't select tab)
    if (!(await this.accountNumberDialog.isVisible({ timeout: 500 }).catch(() => false))) {
      await this.savingAccountBtn.click({ timeout: 30000 });
    }
    return this;
  }

  /**
   * Wait for the cell with value '1100001' to be visible (verifies account activity).
   * @returns {Promise<this>}
   */
  async verifyAccountActivityCell() {
    await this.activityCell1100001.waitFor({ state: 'visible', timeout: 30000 });
    return this;
  }
}
