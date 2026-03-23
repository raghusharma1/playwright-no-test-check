import { BasePage } from './BasePage.js';

export class AddRecipientDialog extends BasePage {
  /**
   * AddRecipientDialog encapsulates modal for adding bill pay recipient.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'RECIPIENT NAME' input field (required for input action)
    // selector: page.getByRole('textbox', { name: 'RECIPIENT NAME' })
    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });
    // 'SUBMIT' button
    // selector: page.getByRole('button', { name: 'SUBMIT' })
    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
  }

  /**
   * Fill in the recipient name in the Add Recipient dialog.
   * @param {string} name
   * @returns {Promise<this>}
   */
  async enterRecipientName(name) {
    await this.recipientNameInput.fill(name, { timeout: 20000 });
    return this;
  }

  /**
   * Click the SUBMIT button in the Add Recipient dialog.
   * @returns {Promise<this>}
   */
  async submitRecipientAdd() {
    await this.submitBtn.click({ timeout: 20000 });
    return this;
  }
}
