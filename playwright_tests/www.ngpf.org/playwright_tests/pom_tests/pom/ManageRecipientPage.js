import { BasePage } from './BasePage.js';

export class ManageRecipientPage extends BasePage {
  /**
   * ManageRecipientPage encapsulates recipient management actions: add, edit, and delete recipient in the UI table.
   * All selectors are defined as class properties and never exposed outside the class.
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // '+ ADD RECIPIENT' floating action button (FAB) or toolbar button
    // 1. page.getByText('add', { exact: true })
    // 2. page.getByRole('img', { name: 'add' })
    // 3. page.getByText('add')
    this.addRecipientBtn = page.getByText('add', { exact: true });

    // 'Edit' link/button in recipients table
    // 1. page.getByText('Edit')
    // 2. page.locator('a').filter({ hasText: /^Edit$/ })
    this.editRecipientBtn = page.getByText('Edit');

    // 'Delete' link/button in recipients table
    // 1. page.getByText('Delete')
    // 2. page.locator('a').filter({ hasText: /^Delete$/ })
    this.deleteRecipientBtn = page.getByText('Delete');
  }

  /**
   * Clicks '+ ADD RECIPIENT' to open the add dialog.
   * @returns {Promise<this>}
   */
  async addRecipient() {
    await this.addRecipientBtn.click({ timeout: 25000 });
    return this;
  }

  /**
   * Clicks 'Edit' on the first listed recipient.
   * @returns {Promise<this>}
   */
  async openEditRecipient() {
    await this.editRecipientBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Clicks 'Delete' for the recipient.
   * @returns {Promise<this>}
   */
  async deleteRecipient() {
    await this.deleteRecipientBtn.click({ timeout: 20000 });
    return this;
  }
}
