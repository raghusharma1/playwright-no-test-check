import { BasePage } from './BasePage.js';

export class OnboardingDialog extends BasePage {
  /**
   * Models the Onboarding dialog/modal that appears on startup.
   * Encapsulates the selector for the 'CONTINUE SESSION' button.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'CONTINUE SESSION' button
    // Use a more specific role+name based selector to avoid non-unique matches
    // 1. page.getByRole('button', { name: 'CONTINUE SESSION' })
    // 2. page.getByRole('button', { name: /CONTINUE SESSION/ })
    this.continueSessionBtn = page.getByRole('button', { name: 'CONTINUE SESSION' });
  }

  /**
   * Clicks the 'CONTINUE SESSION' button in onboarding dialog.
   * Returns this for fluent chaining.
   * @returns {Promise<this>}
   */
  async clickContinueSessionDialog() {
    await this.continueSessionBtn.click({ timeout: 30000 });
    return this;
  }
}
