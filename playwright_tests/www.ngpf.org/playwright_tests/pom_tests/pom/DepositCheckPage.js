import { BasePage } from './BasePage.js';

export class DepositCheckPage extends BasePage {
  /**
   * DepositCheckPage models the deposit check workflow: account dropdown, amount entry, uploads, and submit.
   * All selectors are private to this page object.
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // To account dropdown (combobox)
    // 1. page.getByRole('combobox', { name: 'To' })
    // 2. page.locator('mat-select.mat-select-required')
    // 3. page.locator('.mat-select-required')
    this.toAccountDropdown = page.getByRole('combobox', { name: 'To' });

    // 'CHECKING' account dropdown option (text may change if balance changes)
    // 1. page.getByRole('option', { name: 'CHECKING (Available Balance' })
    // 2. page.locator('[role="listbox"]').getByRole('option', { name: 'CHECKING (Available Balance is $216.04)' })
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING (Available Balance' });

    // Amount textbox (Angular Material)
    // 1. page.getByRole('textbox', { name: 'Amount' })
    // 2. page.getByRole('textbox', { name: /Amount \*/ })
    // 3. page.getByLabel('Amount *')
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });

    // Front upload button
    // 1. page.getByRole('button', { name: 'Front' })
    // 2. page.getByRole('button', { name: 'Front' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.frontUploadBtn = page.getByRole('button', { name: 'Front' });

    // Back upload button
    // 1. page.locator('button').filter({ hasText: 'Back' })
    // 2. page.getByRole('button', { name: 'Back' })
    // 3. page.locator('button.mat-focus-indicator.upload')
    this.backUploadBtn = page.locator('button').filter({ hasText: 'Back' });

    // Front image modal close icon
    // 1. page.locator('#mat-dialog-1').getByText('close')
    // 2. page.locator('[role="dialog"]').getByRole('img', { name: 'close' })
    // 3. page.getByRole('img', { name: 'close' })
    this.frontCloseIcon = page.locator('#mat-dialog-1').getByText('close');

    // Back image modal close icon
    // 1. page.getByText('close')
    // 2. page.getByRole('img', { name: 'close' })
    this.backCloseIcon = page.getByText('close');

    // Submit button
    // 1. page.getByRole('button', { name: 'Submit' })
    // 2. page.getByRole('button', { name: 'Submit' })
    // 3. page.getByText('Submit')
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Opens the 'To' account dropdown.
   * @returns {Promise<this>}
   */
  async openAccountDropdown() {
    await this.toAccountDropdown.click({ timeout: 20000 });
    return this;
  }

  /**
   * Selects the CHECKING account from dropdown.
   * @returns {Promise<this>}
   */
  async selectCheckingAccount() {
    await this.checkingAccountOption.click({ timeout: 15000 });
    return this;
  }

  /**
   * Inputs the deposit amount using pressSequentially (Angular Material input).
   * @param {string} value
   * @returns {Promise<this>}
   */
  async enterDepositAmount(value) {
    await this.amountInput.click({ timeout: 15000 });
    await this.amountInput.pressSequentially(value, { delay: 50 });
    return this;
  }

  /**
   * Clicks the button to trigger front check upload (simulated).
   * @returns {Promise<this>}
   */
  async uploadFrontCheck() {
    await this.frontUploadBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Clicks the button to trigger back check upload (simulated).
   * @returns {Promise<this>}
   */
  async uploadBackCheck() {
    await this.backUploadBtn.click({ timeout: 15000 });
    return this;
  }

  /**
   * Closes the modal for the front check image overlay.
   * @returns {Promise<this>}
   */
  async closeFrontCheckModal() {
    await this.frontCloseIcon.click({ timeout: 15000 });
    return this;
  }

  /**
   * Closes the modal for the back check image overlay.
   * @returns {Promise<this>}
   */
  async closeBackCheckModal() {
    await this.backCloseIcon.click({ timeout: 15000 });
    return this;
  }

  /**
   * Clicks the Submit button to finish deposit.
   * @returns {Promise<this>}
   */
  async submitDeposit() {
    await this.submitBtn.click({ timeout: 30000 });
    return this;
  }
}
