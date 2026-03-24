import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * HomePage POM for https://www.ngpf.org/bank-sim
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.getStartedBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  /**
   * Navigate to homepage
   * @returns {Promise<HomePage>}
   */
  async navigateToHomepage() {
    await this.page.goto('https://www.ngpf.org/bank-sim', { timeout: 60000, waitUntil: 'domcontentloaded' });
    // Golden Rule #11: After navigation, check for SPA blank screen/reload
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const bodyText = await this.page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    if (bodyText.trim().length < 50) {
      console.log('Page appears blank after navigation — reloading');
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    }
    await this.dismissWelcomeModal();
    return this;
  }

  /**
   * Click 'GET STARTED NOW' button
   * @returns {Promise<HomePage>}
   */
  async clickGetStarted() {
    await this.dismissWelcomeModal();
    await this.getStartedBtn.click({ timeout: 45000 });
    return this;
  }

  /**
   * Continue session from onboarding/main workflow action
   * ONLY dismisses the onboarding welcome modal if present.
   * No progression button click, as dashboard loads directly.
   * @returns {Promise<HomePage>}
   */
  async continueSession() {
    await this.dismissWelcomeModal();
    // Do NOT click any main onboarding button; dashboard is ready
    // Golden Rule #11: Check for blank SPA load after modal
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const bodyText = await this.page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    if (bodyText.trim().length < 50) {
      console.log('Page appears blank after onboarding modal — reloading');
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    }
    return this;
  }
}
