import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * Deposit Checks Page Object
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Primary selector: combobox for selecting 'To' account
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    this.toAccountCombo = page.getByRole('combobox', { name: 'To' });

    // Primary selector: option for 'CHECKING (Available Balance ...'
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });

    // Primary selector: Amount textbox
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });

    // Primary selector: Front upload button
    // 1. page.getByRole('button', { name: 'Front' })
    // 2. page.getByRole('button', { name: 'Front' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.uploadFrontBtn = page.getByRole('button', { name: 'Front' });

    // Primary selector: Modal 'close' for front image
    // 1. page.getByText('close')
    // 2. page.locator('[role="dialog"]').getByRole('img', { name: 'close' })
    // 3. page.getByRole('img', { name: 'close' })
    this.frontCloseIcon = page.getByText('close');

    // Primary selector: Back upload button
    // 1. page.getByRole('button', { name: 'Back' })
    // 2. page.getByRole('button', { name: 'Back' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.uploadBackBtn = page.getByRole('button', { name: 'Back' });

    // Primary selector: Modal 'close' for back image
    // Same as front close, used twice
    this.backCloseIcon = page.getByText('close');

    // Primary selector: Submit button
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByRole('button', { name: 'Submit' })
    // 3. page.getByText('Submit')
    this.submitBtn = page.getByRole('button', { name: 'Submit' });

    // Inline error message elements (not found in scenario, included for extensibility)
    // 1. page.locator('.mat-error')
    // 2. page.locator('[class*=error]')
    // 3. page.getByText(/required|error|validation/i)
    this.inlineErrors = page.locator('.mat-error');
  }

  /**
   * Opens the account selection dropdown ("To" account)
   * @returns {Promise<this>}
   */
  async openToAccountDropdown() {
    await this.toAccountCombo.click({ timeout: 30000 });
    return this;
  }

  /**
   * Selects the CHECKING account option.
   * @returns {Promise<this>}
   */
  async selectCheckingAccount() {
    await this.checkingAccountOption.click({ timeout: 30000 });
    return this;
  }

  /**
   * Fills in the deposit Amount field. Uses pressSequentially due to mat-form-field parent (Angular Material).
   * @param {string|number} value
   * @returns {Promise<this>}
   */
  async fillAmount(value) {
    await this.amountInput.click({ timeout: 15000 });
    await this.amountInput.pressSequentially(String(value), { delay: 50 });
    return this;
  }

  /**
   * Click the 'Front' button to start front image upload/modal.
   * @returns {Promise<this>}
   */
  async clickUploadFront() {
    await this.uploadFrontBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Closes front side modal (after image shown/uploaded)
   * @returns {Promise<this>}
   */
  async closeFrontModal() {
    await this.frontCloseIcon.click({ timeout: 15000 });
    return this;
  }

  /**
   * Click the 'Back' button to start back image upload/modal.
   * @returns {Promise<this>}
   */
  async clickUploadBack() {
    await this.uploadBackBtn.click({ timeout: 20000 });
    return this;
  }

  /**
   * Closes back side modal after image is shown/uploaded.
   * @returns {Promise<this>}
   */
  async closeBackModal() {
    await this.backCloseIcon.click({ timeout: 15000 });
    return this;
  }

  /**
   * Clicks the Submit button to complete deposit.
   * Navigates to Account page (AccountActivityPage).
   * @returns {Promise<AccountActivityPage>}
   */
  async submitDeposit() {
    await this.submitBtn.click({ timeout: 35000 });
    // navigation is expected, but as per POM strict rules, DO NOT import or return AccountActivityPage instance
    return this;
  }

  /**
   * Attempts to click the 'Submit' button (should be disabled when form incomplete).
   * @returns {Promise<this>}
   */
  async clickDisabledSubmit() {
    // Safe attempt: will only interact if enabled, but you can use isSubmitDisabled() in the test
    await this.submitBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Checks whether the Submit button is disabled.
   * @returns {Promise<boolean>}
   */
  async isSubmitDisabled() {
    return await this.submitBtn.isDisabled({ timeout: 5000 });
  }

  /**
   * Returns the Locator for possible inline error messages (if any appear).
   * Test code (not POM) should use this to assert absence/presence.
   * @returns {import('playwright').Locator}
   */
  getInlineErrorMessages() {
    return this.inlineErrors;
  }
}
