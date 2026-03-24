export class BasePage {
  /**
   * @param {import('playwright').Page} page - Playwright Page object
   */
  constructor(page) {
    /**
     * @type {import('playwright').Page}
     */
    this.page = page;
  }

  /**
   * Waits for an element to be visible (default timeout: 30000ms)
   * @param {import('playwright').Locator} locator
   * @param {number} [timeout=30000]
   */
  async waitForVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    return this;
  }

  /**
   * Navigates to a URL and waits for DOMContentLoaded (default timeout: 60000ms)
   * @param {string} url
   * @param {number} [timeout=60000]
   */
  async navigateTo(url, timeout = 60000) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    return this;
  }
}
