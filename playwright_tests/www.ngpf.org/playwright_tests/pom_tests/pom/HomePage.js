import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * HomePage encapsulates the onboarding actions: 'GET STARTED NOW' and Ok button in the welcome dialog.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'GET STARTED NOW' button
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    // 4. page.locator('button.mat-focus-indicator.button')
    this.getStartedNowBtn = page.getByRole('button', { name: 'GET STARTED NOW' });

    // Ok button in welcome modal
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    // 4. page.locator('#mat-dialog-0').getByRole('button', { name: 'Ok' })
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Clicks the 'GET STARTED NOW' button to initiate onboarding/dashboard flow.
   * @returns {Promise<this>}
   */
  async clickGetStartedNow() {
    await this.getStartedNowBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the Ok button in the welcome dialog modal.
   * @returns {Promise<this>}
   */
  async clickWelcomeOk() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Navigates to the homepage via a direct URL.
   * @returns {Promise<this>}
   */
  async navigateToHomepage() {
    await this.page.goto('https://www.ngpf.org/bank-sim/home?returnUrl=%2F', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}
