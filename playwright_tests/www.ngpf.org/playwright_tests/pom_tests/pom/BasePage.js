export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  /**
   * Wait for a specific url pattern.
   * @param {string|RegExp} urlPattern
   * @param {number} timeoutMs
   * @returns {Promise<this>}
   */
  async waitForUrl(urlPattern, timeoutMs = 60000) {
    let waitForUrlError = null;
    try {
      await this.page.waitForURL(urlPattern, { timeout: timeoutMs });
    } catch (e) {
      waitForUrlError = e;
      // Log the error but proceed to blank-page recovery
      console.warn('[waitForUrl] waitForURL timed out:', e.message);
    }
    // Always check for SPA blank page after attempted navigation, even on error
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    } catch (e) { /* Silent fail, in case idle takes too long */ }
    const bodyText = await this.page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    if (!bodyText || bodyText.trim().length < 50) {
      console.log('Page appears blank after navigation — reloading');
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
      // Optionally wait for correct url again and networkidle after reload
      try {
        await this.page.waitForURL(urlPattern, { timeout: 15000 });
      } catch (e2) {
        console.warn('[waitForUrl] waitForURL after reload timed out:', e2.message);
      }
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    }
    // If we failed both navigation and reload, throw original waitForURL error, else continue
    if (waitForUrlError) {
      // Check if the page is still blank after all attempts
      const postBodyText = await this.page.locator('body').innerText({ timeout: 3000 }).catch(() => '');
      if (!postBodyText || postBodyText.trim().length < 50) {
        throw waitForUrlError;
      }
      // else: the page recovered, continue
    }
    return this;
  }
  /**
   * Wait for the page to reach network idle.
   * @param {number} timeoutMs
   * @returns {Promise<this>}
   */
  async waitForNetworkIdle(timeoutMs = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout: timeoutMs });
    return this;
  }
}
