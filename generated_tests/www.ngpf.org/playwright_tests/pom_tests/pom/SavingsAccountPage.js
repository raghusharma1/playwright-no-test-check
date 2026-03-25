import { BasePage } from './BasePage.js';

// SavingsAccountPage models the detailed savings account area with activity controls
export class SavingsAccountPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for 'Saving' button
    this.savingBtn = page.getByRole('button', { name: 'Saving' });
    this.activityTableIdHeader = page.getByText('Id'); // Transaction table column header as stabilization
  }

  // Clicks the 'Saving' button to display account activity, unless already visible (test stable)
  async showSavingsAccountActivity() {
    // If the table header 'Id' is already visible, skip click
    const isVisible = await this.activityTableIdHeader.isVisible().catch(() => false);
    if (!isVisible) {
      await this.savingBtn.click({ timeout: 30000 });
      await this.activityTableIdHeader.waitFor({ state: 'visible', timeout: 15000 });
    } else {
      // Table already visible, just ensure it's really loaded
      await this.activityTableIdHeader.waitFor({ state: 'visible', timeout: 5000 });
    }
    return this;
  }
}
