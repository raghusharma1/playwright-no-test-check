import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // All selectors for 'GET STARTED NOW' button:
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    this.getStartedNowBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Navigates to the homepage URL and waits for DOM content loaded.
   * @param {number} [timeout=60000] - Timeout in ms
   * @returns {Promise<this>}
   */
  async navigateToHomepage(timeout = 60000) {
    await this.page.goto('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', { waitUntil: 'domcontentloaded', timeout });
    return this;
  }
}
