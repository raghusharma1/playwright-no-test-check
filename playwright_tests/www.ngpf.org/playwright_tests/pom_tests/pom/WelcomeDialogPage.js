import { BasePage } from './BasePage.js';

/**
 * WelcomeDialogPage models the onboarding dialog after simulator launch, containing an 'Ok' button.
 */
export class WelcomeDialogPage extends BasePage {
  constructor(page) {
    super(page);
    // Primary selector for 'Ok' button inside dialog.
    this.okBtn = page.getByRole('button', { name: 'Ok' });
    // Alternate selectors (for reference):
    // page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
  }

  /**
   * Dismisses the welcome dialog by clicking the 'Ok' button.
   * @returns {Promise<WelcomeDialogPage>}
   */
  async dismissWelcomeDialog() {
    await this.okBtn.click({ timeout: 30000 });
    return this;
  }
}
