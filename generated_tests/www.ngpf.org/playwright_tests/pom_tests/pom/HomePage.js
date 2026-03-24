import { BasePage } from './BasePage.js';

// POM for the landing/home page of BankSim
export class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector for 'GET STARTED NOW' button
    // Possible selectors:
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    this.getStartedBtn = this.page.getByRole('button', { name: 'GET STARTED NOW' });
  }
  
  /**
   * Clicks the 'GET STARTED NOW' button to begin simulation (triggers WelcomeDialogPage).
   * Adds SPA blank-page detection/reload logic after clicking.
   * @returns {Promise<WelcomeDialogPage>}
   */
  async startSimulation() {
    await this.getStartedBtn.click({ timeout: 30000 });
    // Wait for SPA navigation, then blank page detection/rescue per Rule 11
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const bodyText = await this.page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    if (bodyText.trim().length < 50) {
      // Page appears blank after navigation — reloading
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    }
    return this;
  }
}