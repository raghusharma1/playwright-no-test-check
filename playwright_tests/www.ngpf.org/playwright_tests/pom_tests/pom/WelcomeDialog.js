import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  /**
   * Models the Welcome dialog/modal with Ok button.
   * All selectors are private and up to 5 variants are documented.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button inside welcome modal
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    // 4. page.locator('#mat-dialog-0').getByRole('button', { name: 'Ok' })
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks Ok button in welcome dialog.
   * Returns this for fluent chaining.
   * @returns {Promise<this>}
   */
  async clickWelcomeOkButton() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}
