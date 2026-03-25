import { BasePage } from './BasePage.js';

// AccountActivityPage models the page with the account list and tab switching actions.
export class AccountActivityPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for Savings button (acts as tab)
    this.page = page;
    this.savingsTab = page.getByRole('button', { name: /Saving/i });
    this.activityPanelHeading = page.getByRole('heading', { name: /Account Activity/i });
  }

  // Clicks 'Saving' tab (button). For Savings, this step alone is sufficient.
  async selectSavingsTab() {
    await this.savingsTab.click({ timeout: 30000 });
    // Wait for any network activity to finish (Angular async/data)
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    // Explicit stability: Wait for Account Activity heading to be visible.
    await this.activityPanelHeading.waitFor({ state: 'visible', timeout: 10000 });
    return this;
  }

  // For workflow compatibility — does nothing for Savings account page, as no 'VIEW ACCOUNT' required
  async viewSavingsAccount() {
    // No-op: No button/click is needed for Savings
    return this;
  }
}
