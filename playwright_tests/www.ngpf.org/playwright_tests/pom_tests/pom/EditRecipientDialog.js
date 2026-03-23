import { BasePage } from './BasePage.js';

export class EditRecipientDialog extends BasePage {
  /**
   * EditRecipientDialog encapsulates modal for editing a bill pay recipient.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'RECIPIENT NAME' input field (for edit action)
    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });
    // 'SUBMIT' button
    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
  }

  /**
   * Edit the recipient name in the dialog.
   * @param {string} name
   * @returns {Promise<this>}
   */
  async editRecipientName(name) {
    await this.recipientNameInput.fill(''); // Clear current text
    await this.recipientNameInput.fill(name, { timeout: 20000 });
    return this;
  }

  /**
   * Click the SUBMIT button in the Edit Recipient dialog.
   * @returns {Promise<this>}
   */
  async submitRecipientEdit() {
    await this.submitBtn.click({ timeout: 20000 });
    return this;
  }
}
