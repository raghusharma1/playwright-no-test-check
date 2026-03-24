export class BasePage {
  /**
   * Base for all POMs
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Dismisses the 'Welcome to the NGPF Bank Simulator' modal if present, robustly, multiple times if needed.
   * Should be called before any major page action.
   */
  async dismissWelcomeModal(maxAttempts = 5) {
    for (let i = 0; i < maxAttempts; i++) {
      const welcomeDialog = this.page.getByRole('dialog', { name: /Welcome to the NGPF Bank Simulator/i });
      if (await welcomeDialog.isVisible({ timeout: 1500 }).catch(() => false)) {
        const okBtn = welcomeDialog.getByRole('button', { name: /Ok/i });
        if (await okBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await okBtn.click({ timeout: 5000 });
        }
        await this.page.waitForTimeout(350); // Animation buffer
      } else {
        break;
      }
    }
  }
}
