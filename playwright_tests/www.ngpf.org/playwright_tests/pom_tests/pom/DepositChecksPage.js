import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

/**
 * Page Object Model for the Check Deposit Form page.
 * Provides actions and assertions for form controls and error states.
 */
export class DepositChecksPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // 'Submit' button on the deposit check form
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByText('Submit')
    this.submitBtn = page.getByRole('button', { name: 'Submit' });

    // Common error message selectors (inline errors may not be present)
    // We'll check for any visible error elements near form fields.
    this.formErrors = page.locator('[class*=error], .mat-error, .field-error, [role="alert"]');
  }

  /**
   * Returns true if the Submit button is disabled.
   * @returns {Promise<boolean>}
   */
  async isSubmitDisabled() {
    return await this.submitBtn.isDisabled();
  }

  /**
   * Attempts to click the Submit button if enabled. For safety in this workflow, expects button to remain disabled.
   * @returns {Promise<void>}
   */
  async tryClickSubmit() {
    await this.submitBtn.click({ timeout: 5000 }); // will throw if disabled, but for safety
  }

  /**
   * Asserts that there are NO visible inline error message elements related to the check deposit form.
   * Passes if no .mat-error, .field-error, .error, or [role="alert"] are visible on the page.
   * @returns {Promise<void>}
   */
  async assertNoInlineErrors() {
    // Should be zero visible error messages.
    // only visible elements:
    await expect(await this.formErrors.filter({ has: this.page.locator(':visible') }).count()).toBe(0);
  }
}
