import { BasePage } from './BasePage.js';

export class AccountPage extends BasePage {
  /**
   * AccountPage for post-shopping feedback/messages
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // No strong selectors are specified for feedback message/snackbar; add as needed.
  }

  /**
   * Wait for shopping submission success feedback (snackbar/notification)
   * Note: You must provide correct selector in tests as the snackbar selector is not certain.
   * @returns {Promise<AccountPage>}
   */
  async verifyShoppingSuccess() {
    // Placeholder for actual snackbar selector; update as needed:
    await this.page.waitForSelector('snackbar, [role="alert"], .mat-simple-snackbar, [class*="snack"], [class*="alert"]', { timeout: 30000 });
    return this;
  }
}
