import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Selectors for HomePage
    // 1. Home navigation (for reference, no locator needed)
    // 2. 'GET STARTED NOW' button
    /**
     * Primary: page.getByRole('button', { name: 'GET STARTED NOW' })
     * Alt 1:   page.getByRole('button', { name: /GET STARTED NOW/ })
     * Alt 2:   page.getByText('GET STARTED NOW')
     */
    this.getStartedNowBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Navigate to the homepage (https://www.ngpf.org/bank-sim/home?returnUrl=%2F)
   * @returns {Promise<HomePage>}
   */
  async navigateToHome() {
    await this.page.goto('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Clicks the 'GET STARTED NOW' button on the welcome screen
   * @returns {Promise<this>}
   */
  async clickGetStartedNow() {
    await this.getStartedNowBtn.click({ timeout: 30000 });
    return this;
  }
}
