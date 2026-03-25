export class BasePage {
  constructor(page) {
    this.page = page;
  }
  // Common wait method for explicit waits
  async waitForSelector(selector, timeout = 30000) {
    return await this.page.waitForSelector(selector, { timeout });
  }
}
