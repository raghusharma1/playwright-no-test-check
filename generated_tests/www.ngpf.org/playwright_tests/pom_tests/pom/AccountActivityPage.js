import { BasePage } from './BasePage.js';

export class AccountActivityPage extends BasePage {
  constructor(page) {
    super(page);
    // All selectors for 'ACCOUNT ACTIVITY' link:
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    this.accountActivityLink = this.page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });

    // All selectors for 'Saving' button:
    // 1. page.getByRole('button', { name: 'Saving' })
    // 2. page.getByRole('button', { name: 'Saving' })
    // 3. page.getByText('Saving')
    this.savingBarBtn = this.page.getByRole('button', { name: 'Saving' });

    // All selectors for account activity cell with ID '1100001':
    // 1. page.getByRole('cell', { name: '1100001' })
    // 2. page.locator('[role="row"]').getByRole('cell', { name: '1100001' })
    this.accountRowCell_1100001 = this.page.getByRole('cell', { name: '1100001' });
  }

  /**
   * Clicks the 'ACCOUNT ACTIVITY' link in the nav menu.
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async clickAccountActivityLink(timeout = 30000) {
    await this.accountActivityLink.click({ timeout });
    return this;
  }

  /**
   * Clicks the 'Saving' bar/button in Account Activity.
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async clickSavingBar(timeout = 30000) {
    await this.savingBarBtn.click({ timeout });
    return this;
  }

  /**
   * Waits for presence of account activity row/cell with ID '1100001'.
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async verifyAccountRowPresence(timeout = 30000) {
    await this.accountRowCell_1100001.waitFor({ state: 'visible', timeout });
    return this;
  }
}
