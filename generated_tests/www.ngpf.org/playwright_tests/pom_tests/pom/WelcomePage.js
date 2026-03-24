import { BasePage } from './BasePage.js';

export class WelcomePage extends BasePage {
  constructor(page) {
    super(page);
    // All selectors for 'GET STARTED NOW' button:
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    this.getStartedNowBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Clicks the 'GET STARTED NOW' button on the Welcome Page (within 'mat-card-content').
   * @param {number} [timeout=30000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async clickGetStartedNow(timeout = 30000) {
    await this.getStartedNowBtn.click({ timeout });
    return this;
  }
}
