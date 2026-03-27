import { BasePage } from './BasePage.js';

/**
 * EditRecipientDialog models the edit recipient modal/dialog in the Bill Pay Recipient workflow.
 * Encapsulates recipient name input editing and submit action.
 */
export class EditRecipientDialog extends BasePage {
  constructor(page) {
    super(page);
    // Recipient Name input field (same selectors as Add)
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
   * Edits the recipient name (Angular Material input, use sequential typing for safety).
   * @param {string} name
   * @returns {Promise<this>}
   */
  async editRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 15000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  /**
   * Submits the edit recipient dialog.
   * @returns {Promise<this>}
   */
  async submitRecipientEdit() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }
}
