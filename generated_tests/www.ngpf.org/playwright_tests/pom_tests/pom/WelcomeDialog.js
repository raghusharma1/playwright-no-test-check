import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Selectors for the Welcome Dialog Ok button
    /**
     * Primary: page.getByRole('button', { name: 'Ok' })
     * Alt 1:   page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
     */
    this.okButton = this.page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the 'Ok' button in the onboarding welcome dialog.
   * @returns {Promise<this>}
   */
  async clickOkDialog() {
    await this.okButton.click({ timeout: 30000 });
    return this;
  }
}
