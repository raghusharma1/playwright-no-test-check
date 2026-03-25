import { BasePage } from './BasePage.js';

// WelcomeDialogPage models the Welcome dialog shown after scenario initiation.
export class WelcomeDialogPage extends BasePage {
  constructor(page) {
    super(page);
    // Primary selector for 'Ok' button inside welcome dialog
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }

  // Clicks the 'Ok' button to dismiss the dialog
  async acceptWelcomeDialog() {
    await this.okBtn.click({ timeout: 30000 }); // Moderate timeout for dialog
    return this;
  }
}
