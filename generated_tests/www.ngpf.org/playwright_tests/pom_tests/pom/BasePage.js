export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for the page to finish loading (domcontentloaded).
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }

  /**
   * Wait for a selector to be visible on the page.
   * @param {string|import('playwright').Locator} selectorOrLocator
   * @param {number} [timeout=30000]
   */
  async waitForVisible(selectorOrLocator, timeout = 30000) {
    if (typeof selectorOrLocator === 'string') {
      await this.page.waitForSelector(selectorOrLocator, { state: 'visible', timeout });
    } else {
      await selectorOrLocator.waitFor({ state: 'visible', timeout });
    }
    return this;
  }
}
