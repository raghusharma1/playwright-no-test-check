import { BasePage } from './BasePage.js';

export class WelcomeDialogPage extends BasePage {
  /**
   * WelcomeDialogPage models the welcome modal/dialog with session continuation and Ok actions.
   * All selectors are encapsulated as class properties.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // CONTINUE SESSION button
    // Use accessible name for uniqueness: page.getByRole('button', { name: 'CONTINUE SESSION' })
    this.continueSessionBtn = page.getByRole('button', { name: 'CONTINUE SESSION' });

    // Ok button
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks CONTINUE SESSION button in welcome dialog/modal.
   * @returns {Promise<this>}
   */
  async clickContinueSession() {
    await this.continueSessionBtn.click({ timeout: 25000 });
    return this;
  }

  /**
   * Clicks Ok button in the welcome dialog/modal (useful for 2nd modal).
   * @returns {Promise<this>}
   */
  async clickOkOnDialog() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}
