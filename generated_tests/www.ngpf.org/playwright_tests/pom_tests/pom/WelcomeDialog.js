import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  constructor(page) {
    super(page);
    // All selectors for 'Ok' button in Welcome Dialog:
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByRole('button', { name: 'Ok' })
    this.okBtn = this.page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the 'Ok' button in the Welcome Dialog modal.
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async clickWelcomeOk(timeout = 30000) {
    await this.okBtn.click({ timeout });
    return this;
  }
}
