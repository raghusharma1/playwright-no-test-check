import { BasePage } from './BasePage.js';

export class ManageRecipientPage extends BasePage {
  /**
   * ManageRecipientPage encapsulates UI for managing bill pay recipients.
   * Provides methods for clicking Add, Edit, and Delete actions.
   * 
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // '+ADD RECIPIENT' button: page.getByText('add', { exact: true })
    this.addRecipientBtn = page.getByText('add', { exact: true });
    // 'Edit' link: page.getByText('Edit')
    this.editRecipientLink = page.getByText('Edit');
    // 'Delete' link: page.getByText('Delete')
    this.deleteRecipientLink = page.getByText('Delete');
  }

  /**
   * Clicks '+ADD RECIPIENT' button.
   * @returns {Promise<this>}
   */
  async clickAddRecipient() {
    await this.addRecipientBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Clicks 'Edit' on the first recipient in the table.
   * @returns {Promise<this>}
   */
  async clickEditRecipient() {
    await this.editRecipientLink.first().click({ timeout: 20000 });
    return this;
  }

  /**
   * Clicks 'Delete' on the first recipient in the table.
   * @returns {Promise<this>}
   */
  async clickDeleteRecipient() {
    await this.deleteRecipientLink.first().click({ timeout: 20000 });
    return this;
  }
}
