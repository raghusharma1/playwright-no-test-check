import { BasePage } from './BasePage.js';

// HomePage models the landing screen of the bank sim, focusing on scenario initiation.
export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Primary selector for GET STARTED NOW button
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    this.getStartedNowBtn = page.getByRole('button', { name: 'GET STARTED NOW' });
  }

  // Clicks the 'GET STARTED NOW' button to begin the bank sim scenario
  async startScenario() {
    await this.getStartedNowBtn.click({ timeout: 30000 }); // Simple click, 30s timeout
    return this;
  }
}
