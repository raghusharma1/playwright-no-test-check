import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  /**
   * AccountActivityPage models the account/ledger area for verifying recent activity and success notifications.
   * All selectors are private to this page object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Success notification after deposit
    // (Selector assumptions, may need tuning based on site structure.)
    // Example 1: page.getByText('You have successfully deposited your check.')
    // Example 2: page.locator('.mat-mdc-snack-bar-label')
    // Example 3: page.locator('[role="status"]').getByText('You have successfully deposited your check.')
    this.depositSuccessMsg = page.getByText('You have successfully deposited your check.');

    // Activity table row(s) -- for recent ledger entry
    // Match row for 'Deposit Check To Checking Account', 'Deposited Check', etc. (case-insensitive)
    this.activityRow = page.locator('tr').filter({ hasText: /deposit(ed)? check/i });
  }

  /**
   * Gets the text of the deposit success confirmation message.
   * @returns {Promise<string>}
   */
  async getDepositSuccessMessageText() {
    const text = await this.depositSuccessMsg.textContent({ timeout: 20000 });
    return text;
  }

  /**
   * Gets the first ledger row element after deposit (for test-side assertion).
   * @returns {Promise<import('playwright').Locator>}
   */
  async getLatestDepositActivityRow() {
    return this.activityRow.first();
  }
}
