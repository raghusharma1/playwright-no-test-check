import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * HomePage encapsulates the onboarding actions: 'GET STARTED NOW' and Ok button in the welcome dialog.
   * All selectors are defined as class properties and are private to this Page Object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'GET STARTED NOW' button
    // 1. page.getByRole('button', { name: 'GET STARTED NOW' })
    // 2. page.getByRole('button', { name: /GET STARTED NOW/ })
    // 3. page.getByText('GET STARTED NOW')
    // 4. page.locator('button.mat-focus-indicator.button')
    this.getStartedNowBtn = page.getByRole('button', { name: 'GET STARTED NOW' });

    // Ok button in welcome modal
    // 1. page.getByRole('button', { name: 'Ok' })
    // 2. page.locator('[role="dialog"]').getByRole('button', { name: 'Ok' })
    // 3. page.getByText('Ok')
    // 4. page.locator('#mat-dialog-0').getByRole('button', { name: 'Ok' })
    this.okBtn = page.getByRole('button', { name: 'Ok' });

    // Welcome dialog
    // 1. page.getByRole('dialog', { name: 'Welcome to the NGPF Bank' })
    // 2. page.getByRole('dialog', { name: /Welcome to the NGPF Bank Simulator/ })
    // 3. page.locator('#cdk-overlay-0').getByRole('dialog', { name: 'Welcome to the NGPF Bank Simulator' })
    // 4. page.locator('mat-dialog-container.mat-dialog-container.ng-tns-c82-10')
    // 5. page.locator('mat-dialog-container.mat-dialog-container')
    this.welcomeDialog = page.getByRole('dialog', { name: 'Welcome to the NGPF Bank' });
  }

  /**
   * Clicks the 'GET STARTED NOW' button to initiate onboarding/dashboard flow.
   * @returns {Promise<this>}
   */
  async clickGetStartedNow() {
    await this.getStartedNowBtn.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the Ok button in the welcome dialog modal.
   * @returns {Promise<this>}
   */
  async clickWelcomeOk() {
    await this.okBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Focuses/clicks the Welcome dialog, ensuring it is active and accessible.
   * @returns {Promise<this>}
   */
  async focusWelcomeDialog() {
    await this.welcomeDialog.click({ timeout: 30000 });
    return this;
  }
}
