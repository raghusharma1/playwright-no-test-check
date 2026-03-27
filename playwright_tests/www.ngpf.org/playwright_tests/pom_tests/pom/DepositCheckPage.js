import { BasePage } from './BasePage.js';

/**
 * DepositCheckPage models the full deposit check workflow: account selection, amount input, front/back upload, modal closes, and submit.
 * Selectors are derived from live scenario capture for reliability.
 */
export class DepositCheckPage extends BasePage {
  constructor(page) {
    super(page);
    // --- Step 5: Open account dropdown ('To') ---
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    this.accountDropdown = page.getByRole('combobox', { name: 'To' });

    // --- Step 6: Select 'CHECKING' account option ---
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });

    // --- Step 7: Fill 'Amount' field ---
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });

    // --- Step 8: Upload 'Front' image ---
    // 1. page.getByRole('button', { name: 'Front' })
    // 2. page.getByRole('button', { name: 'Front' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.uploadFrontBtn = page.getByRole('button', { name: 'Front' });

    // --- Step 9: Close front image modal ---
    // 1. page.getByText('close')
    // 2. page.getByRole('img', { name: 'close' })
    this.closeFrontModalBtn = page.getByText('close');

    // --- Step 10: Upload 'Back' image ---
    // 1. page.getByRole('button', { name: 'Back' })
    // 2. page.locator('button.mat-focus-indicator.upload')
    this.uploadBackBtn = page.getByRole('button', { name: 'Back' });

    // --- Step 11: Close back image modal ---
    // 1. page.getByText('close')
    // 2. page.getByRole('img', { name: 'close' })
    this.closeBackModalBtn = page.getByText('close');

    // --- Step 12: Submit deposit ---
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByText('Submit')
    this.submitDepositBtn = page.getByRole('button', { name: 'Submit' });
    // --- Inline error messages: for negative tests ---
    // Common patterns seen: .mat-error, .error, .ng-invalid, span[role="alert"], div:has-text('Please'), etc.
    this.inlineErrorElements = page.locator('.mat-error, .error, [role="alert"], span.error, div:has-text("error"), div:has-text("required")');
  }

  /**
   * Expands the account dropdown for deposit target account.
   * @returns {Promise<this>}
   */
  async expandAccountDropdown() {
    await this.accountDropdown.click({ timeout: 25000 });
    return this;
  }

  /**
   * Selects 'CHECKING' as the deposit account.
   * @returns {Promise<this>}
   */
  async selectCheckingAccountOption() {
    await this.checkingAccountOption.click({ timeout: 25000 });
    return this;
  }

  /**
   * Fills the Amount field with provided value (string/number allowed).
   * @param {string|number} value
   * @returns {Promise<this>}
   */
  async enterAmount(value) {
    // Use click+pressSequentially for mat-form-field reliability (Angular Material input)
    await this.amountInput.click({ timeout: 20000 });
    await this.amountInput.pressSequentially(String(value), { delay: 50 });
    return this;
  }

  /**
   * Clicks to upload the front check image.
   * @returns {Promise<this>}
   */
  async uploadFrontCheck() {
    await this.uploadFrontBtn.click({ timeout: 18000 });
    return this;
  }

  /**
   * Closes the front image modal.
   * @returns {Promise<this>}
   */
  async closeFrontImageModal() {
    await this.closeFrontModalBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Clicks to upload the back check image.
   * @returns {Promise<this>}
   */
  async uploadBackCheck() {
    await this.uploadBackBtn.click({ timeout: 18000 });
    return this;
  }

  /**
   * Closes the back image modal.
   * @returns {Promise<this>}
   */
  async closeBackImageModal() {
    await this.closeBackModalBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Clicks the 'Submit' button to finalize deposit.
   * @returns {Promise<this>}
   */
  async submitDeposit() {
    await this.submitDepositBtn.click({ timeout: 35000 });
    return this;
  }

  /**
   * Attempts to click the 'Submit' button, even if disabled (for validation tests).
   * @returns {Promise<this>}
   */
  async clickDisabledSubmit() {
    // Playwright allows click attempt, but if button is disabled, nothing happens; test logic should then assert disabled attribute.
    await this.submitDepositBtn.click({ timeout: 5000 });
    return this;
  }

  /**
   * Returns locator for all inline error elements (for negative flow assertions).
   * Test can use this to expect errors NOT to be visible in current scenario.
   * @returns {import('playwright').Locator}
   */
  getInlineErrorElements() {
    return this.inlineErrorElements;
  }
}
