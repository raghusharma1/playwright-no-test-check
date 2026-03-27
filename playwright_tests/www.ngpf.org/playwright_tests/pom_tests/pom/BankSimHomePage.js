import { BasePage } from './BasePage.js';

/**
 * BankSimHomePage models the landing screen for the NGPF Bank Simulator.
 */
export class BankSimHomePage extends BasePage {
  constructor(page) {
    super(page);
    // No page-level selectors required, acts as entry point for navigation
  }

  /**
   * Navigates to Bank Simulator homepage.
   * @returns {Promise<BankSimHomePage>}
   */
  async navigateToHomePage() {
    // Captured selector:
    // page.goto('https://www.ngpf.org/bank-sim', { waitUntil: 'domcontentloaded' })
    await this.page.goto('https://www.ngpf.org/bank-sim', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}
