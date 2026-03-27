import { BasePage } from './BasePage.js';

export class EditRecipientDialog extends BasePage {
  /**
   * EditRecipientDialog models the edit recipient modal/dialog. Provides entering new name and submitting changes.
   * All selectors are private and defined in the constructor.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'RECIPIENT NAME' input (mat-form-field)
    // 1. page.getByRole('textbox', { name: 'RECIPIENT NAME' })
    // 2. page.locator('[role="dialog"]').getByRole('textbox', { name: 'RECIPIENT NAME *' })
    // 3. page.getByRole('textbox', { name: /RECIPIENT NAME \*/ })
    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });

    // 'SUBMIT' button
    // 1. page.getByRole('button', { name: 'SUBMIT' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'SUBMIT' })
    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
  }

  /**
   * Edits the recipient name (Angular Material input: use click + pressSequentially).
   * @param {string} name
   * @returns {Promise<this>}
   */
  async editRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 15000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  /**
   * Clicks SUBMIT to save recipient changes.
   * @returns {Promise<this>}
   */
  async submitRecipientEdit() {
    await this.submitBtn.click({ timeout: 25000 });
    return this;
  }
}
