import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  constructor(page) {
    super(page);
    // Selector for 'Ok' button in the dialog
    // Primary: page.getByRole('button', { name: 'Ok' })
    // Alternative: page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // Alternative agent-captured: page.locator('button.mat-focus-indicator.button')
    this.okButton = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the 'Ok' button to dismiss the Welcome dialog.
   * @returns {Promise<this>}
   */
  async clickWelcomeDialogOk() {
    await this.okButton.click({ timeout: 30000 });
    return this;
  }
}
