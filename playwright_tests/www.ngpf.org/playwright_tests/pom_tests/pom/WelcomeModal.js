import { BasePage } from './BasePage.js';

export class WelcomeModal extends BasePage {
  /**
   * WelcomeModal handles the welcome dialog that appears after onboarding.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button in the welcome dialog
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the Ok button to dismiss the welcome modal.
   * @returns {Promise<this>}
   */
  async dismissWelcomeModal() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}
