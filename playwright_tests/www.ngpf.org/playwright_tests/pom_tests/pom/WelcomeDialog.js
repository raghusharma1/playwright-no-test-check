import { BasePage } from './BasePage.js';

export class WelcomeDialog extends BasePage {
  /**
   * WelcomeDialog encapsulates interaction with the welcome modal/dialog.
   * All selectors are defined as class properties and are private to this Page Object.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Ok button in welcome dialog
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    // 4. page.locator('#mat-dialog-0').getByRole('button', { name: 'Ok' })
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Dismiss the welcome dialog by clicking the Ok button.
   * @returns {Promise<this>}
   */
  async acceptWelcomeDialog() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }
}
