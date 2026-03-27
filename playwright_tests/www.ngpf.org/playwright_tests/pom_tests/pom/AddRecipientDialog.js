import { BasePage } from './BasePage.js';

/**
 * AddRecipientDialog models the add recipient modal/dialog in the Bill Pay Recipient workflow.
 * Encapsulates recipient name field entry and submit action.
 */
export class AddRecipientDialog extends BasePage {
  constructor(page) {
    super(page);
    // Recipient Name input field
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
   * Enters the recipient name (Angular Material input, use sequential typing for safety).
   * @param {string} name
   * @returns {Promise<this>}
   */
  async enterRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 15000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  /**
   * Submits the add recipient dialog.
   * @returns {Promise<this>}
   */
  async submitRecipientAdd() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }
}
