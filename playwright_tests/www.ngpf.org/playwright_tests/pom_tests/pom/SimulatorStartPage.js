import { BasePage } from './BasePage.js';

/**
 * SimulatorStartPage models the initial simulator screen after BankSimHomePage, containing 'GET STARTED NOW' button.
 */
export class SimulatorStartPage extends BasePage {
  constructor(page) {
    super(page);
    // Primary selector for 'GET STARTED NOW' button.
    this.getStartedBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
    // Alternate selectors (for reference):
    // page.getByRole('button', { name: /GET STARTED NOW/ })
    // page.getByText('GET STARTED NOW')
  }

  /**
   * Clicks the 'GET STARTED NOW' button to begin simulation.
   * @returns {Promise<SimulatorStartPage>} (remains on page if no navigation occurs)
   */
  async beginSimulation() {
    await this.getStartedBtn.click({ timeout: 45000 });
    return this;
  }
}
