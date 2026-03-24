import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for 'GET STARTED NOW' button
    // Primary: page.getByRole('button', { name: 'GET STARTED NOW' })
    // Alternative: page.getByRole('button', { name: /GET STARTED NOW/ })
    // Alternative: page.getByText('GET STARTED NOW')
    this.getStartedNowButton = page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Navigate directly to the Bank Sim homepage.
   * @returns {Promise<HomePage>}
   */
  async gotoHomePage() {
    await this.page.goto('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', { waitUntil: 'domcontentloaded', timeout: 60000 });
    // Wait for GET STARTED NOW visible for onboarding readiness
    await this.getStartedNowButton.waitFor({ state: 'visible', timeout: 45000 });
    return this;
  }

  /**
   * Click the 'GET STARTED NOW' button to begin onboarding.
   * @returns {Promise<this>}
   */
  async clickGetStarted() {
    await this.getStartedNowButton.click({ timeout: 30000 });
    return this;
  }
}
