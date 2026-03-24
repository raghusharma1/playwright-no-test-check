export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url, options = { waitUntil: 'domcontentloaded', timeout: 60000 }) {
    await this.page.goto(url, options);
    return this;
  }

  /**
   * Wait for visible text on the page for robust synchronization.
   */
  async waitForVisibleText(text, timeout = 30000) {
    await this.page.getByText(text).waitFor({ state: 'visible', timeout });
    return this;
  }

  /**
   * Wait for a role-based element by accessible name for accessibility robustness.
   */
  async waitForRole(role, name, timeout = 30000) {
    await this.page.getByRole(role, { name }).waitFor({ state: 'visible', timeout });
    return this;
  }
}
