import { BasePage } from './BasePage.js';

/**
 * ManageRecipientPage models the Bill Payment Recipient Management screen.
 * Encapsulates actions for adding, editing, and deleting recipients (add + Edit/Delete table triggers).
 */
export class ManageRecipientPage extends BasePage {
  constructor(page) {
    super(page);
    // '+ ADD RECIPIENT' button (plus) icon
    // 1. page.getByText('add', { exact: true })
    // 2. page.getByRole('img', { name: 'add' })
    // 3. page.getByText('add')
    this.addRecipientBtn = page.getByText('add', { exact: true });

    // 'Edit' button (per recipient row)
    // 1. page.getByText('Edit')
    // 2. page.locator('a').filter({ hasText: /^Edit$/ })
    this.editRecipientBtn = page.getByText('Edit');

    // 'Delete' button (per recipient row)
    // 1. page.getByText('Delete')
    // 2. page.locator('a').filter({ hasText: /^Delete$/ })
    this.deleteRecipientBtn = page.getByText('Delete');
  }

  /**
   * Starts adding a bill recipient by clicking '+ ADD RECIPIENT'.
   * @returns {Promise<this>}
   */
  async addRecipient() {
    await this.addRecipientBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Opens the edit recipient dialog for the first available recipient in the list.
   * (Assumes single recipient or first in the list)
   * @returns {Promise<this>}
   */
  async openEditRecipient() {
    await this.editRecipientBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Deletes the first recipient in the list by clicking Delete.
   * (Assumes single recipient or first in the list)
   * @returns {Promise<this>}
   */
  async deleteRecipient() {
    await this.deleteRecipientBtn.click({ timeout: 30000 });
    return this;
  }
}
