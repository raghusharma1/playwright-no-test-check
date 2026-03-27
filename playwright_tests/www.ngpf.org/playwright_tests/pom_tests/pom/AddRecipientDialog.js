import { BasePage } from './BasePage.js';

export class AddRecipientDialog extends BasePage {
  /**
   * AddRecipientDialog models the 'Add Recipient' modal/dialog, allowing entry of recipient name and submission.
   * All selectors are private and defined in constructor.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'RECIPIENT NAME' (mat-form-field input)
    // 1. page.getByRole('textbox', { name: 'RECIPIENT NAME' })
    // 2. page.locator('[role="dialog"]').getByRole('textbox', { name: 'RECIPIENT NAME *' })
    // 3. page.getByRole('textbox', { name: /RECIPIENT NAME \*/ })
    this.recipientNameInput = page.getByRole('textbox', { name: 'RECIPIENT NAME' });

    // 'SUBMIT' button in the modal
    // 1. page.getByRole('button', { name: 'SUBMIT' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'SUBMIT' })
    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
  }

  /**
   * Enters a recipient name (Angular Material input: must click + pressSequentially for change detection!)
   * @param {string} name
   * @returns {Promise<this>}
   */
  async enterRecipientName(name) {
    await this.recipientNameInput.click({ timeout: 15000 });
    await this.recipientNameInput.pressSequentially(name, { delay: 50 });
    return this;
  }

  /**
   * Clicks SUBMIT to add the new recipient.
   * @returns {Promise<this>}
   */
  async submitRecipientAdd() {
    await this.submitBtn.click({ timeout: 25000 });
    return this;
  }
}
