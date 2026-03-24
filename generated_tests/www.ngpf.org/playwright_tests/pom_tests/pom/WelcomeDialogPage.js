import { BasePage } from './BasePage.js';

// POM for Welcome Dialog displayed after starting simulation
export class WelcomeDialogPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Updated selector to uniquely target 'CONTINUE SESSION' button
    this.continueSessionBtn = this.page.getByRole('button', { name: 'CONTINUE SESSION' });
    // Ok button for secondary dialog state
    this.okBtn = this.page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Click 'CONTINUE SESSION' on the Welcome dialog if present, otherwise no-op.
   * @returns {Promise<this>}
   */
  async continueSession() {
    try {
      if (await this.continueSessionBtn.isVisible({ timeout: 2000 })) {
        await this.continueSessionBtn.click({ timeout: 10000 });
      }
    } catch (e) {
      // If not visible or gone, ignore; fallback to next step
    }
    return this;
  }

  /**
   * Click 'Ok' to confirm and close Welcome dialog.
   * @returns {Promise<this>}
   */
  async confirmWelcomeDialog() {
    await this.okBtn.click({ timeout: 30000 });
    return this;
  }
}
