export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url, options = { timeout: 60000 }) {
    await this.page.goto(url, { ...options, waitUntil: 'domcontentloaded' });
    return this;
  }

  async waitForUrl(pattern, options = { timeout: 60000 }) {
    await this.page.waitForURL(pattern, options);
    return this;
  }

  // Add other common utilities here as needed
}
