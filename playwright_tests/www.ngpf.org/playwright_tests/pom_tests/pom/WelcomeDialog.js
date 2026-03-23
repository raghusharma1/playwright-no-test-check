import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  /**
   * WelcomeDialog: Dismiss welcome message by clicking Ok.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button (inside welcome dialog)
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Dismiss the welcome dialog by clicking Ok.
   * @returns {Promise<this>}
   */
  async clickOk() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}
