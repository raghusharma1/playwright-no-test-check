import { BasePage } from './BasePage.js';

/**
 * TransferPage models the Make a Transfer workflow (selectors and actions for form fields and dropdowns), matching steps 6-14 of the captured interaction.
 */
export class TransferPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.paymentFrequencyDropdown = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    this.singleOption = page.getByRole('option', { name: 'SINGLE' });
    this.transferFromDropdown = page.getByRole('combobox', { name: 'Transfer From' });
    this.checkingOption = page.getByRole('option', { name: 'CHECKING ($216.04)' });
    this.transferToDropdown = page.getByRole('combobox', { name: 'Transfer To' });
    this.savingOption = page.locator('mat-option[role="option"][aria-disabled="false"]').filter({ hasText: 'SAVING ($230.00)' });
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
    this.paymentDateInput = page.getByRole('textbox', { name: 'Payment Date' });
    this.calendarIconBtn = page.locator('mat-datepicker-toggle button, [data-testid="datepicker-toggle"], [aria-label="Open calendar"], button[aria-label*="calendar" i]');
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    // Removed: this.closeCalendarBtn
  }

  async expandPaymentFrequencyDropdown() { await this.paymentFrequencyDropdown.click({ timeout: 20000 }); return this; }
  async selectPaymentFrequency() { await this.singleOption.click({ timeout: 20000 }); return this; }
  async expandTransferFromDropdown() { await this.transferFromDropdown.click({ timeout: 20000 }); return this; }
  async selectTransferFromAccount() { await this.checkingOption.click({ timeout: 20000 }); return this; }
  async expandTransferToDropdown() { await this.transferToDropdown.click({ timeout: 20000 }); return this; }
  async selectTransferToAccount() { await this.savingOption.first().click({ timeout: 20000 }); return this; }
  async fillAmountField(amount) { await this.amountInput.fill(String(amount), { timeout: 20000 }); return this; }

  /**
   * Fill the Payment Date field by interacting with the datepicker widget using the UI. (step 13)
   * If the desired date is disabled, pick the closest future enabled day in the same month/year. Closes overlay by blurring after pick.
   * Throws if no enabled date cell found.
   * @param {string} dateString  // Format example: '3/22/2026'
   * @returns {Promise<this>}
   */
  async fillPaymentDateField(dateString) {
    await Promise.race([
      this.calendarIconBtn.click({ timeout: 10000 }).catch(() => {}),
      this.paymentDateInput.click({ timeout: 10000 }).catch(() => {})
    ]);
    let [month, day, year] = dateString.split('/').map(x => parseInt(x, 10));
    const overlay = this.page.locator('mat-datepicker-content');
    await overlay.waitFor({ state: 'visible', timeout: 8000 });
    const periodButton = this.page.locator('.mat-calendar-period-button');
    const nextButton = this.page.locator('.mat-calendar-next-button');
    const prevButton = this.page.locator('.mat-calendar-previous-button');
    // YEAR
    let tries = 0;
    while (tries < 10) {
      const label = (await periodButton.first().textContent()).trim();
      const yearMatch = label.match(/\d{4}$/);
      if (yearMatch && Number(yearMatch[0]) === year) break;
      const prevEnabled = !(await prevButton.first().isDisabled().catch(() => true));
      const nextEnabled = !(await nextButton.first().isDisabled().catch(() => true));
      if (Number(yearMatch?.[0]) < year) {
        if (nextEnabled) {
          await nextButton.first().click();
        } else {
          break;
        }
      } else {
        if (prevEnabled) {
          await prevButton.first().click();
        } else {
          break;
        }
      }
      tries++;
      await this.page.waitForTimeout(200);
    }
    // MONTH
    tries = 0;
    while (tries < 12) {
      const label = (await periodButton.first().textContent()).trim();
      const [labelMonth, labelYear] = label.split(' ');
      const targetDate = new Date(year, month - 1);
      const currentMonthShort = targetDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      if(labelYear && parseInt(labelYear, 10) === year && labelMonth && labelMonth.substring(0,3).toUpperCase() === currentMonthShort) break;
      const prevEnabled = !(await prevButton.first().isDisabled().catch(() => true));
      const nextEnabled = !(await nextButton.first().isDisabled().catch(() => true));
      if(labelMonth && Date.parse(labelMonth + ' 1 2000') < Date.parse(currentMonthShort + ' 1 2000')) {
        if (nextEnabled) {
          await nextButton.first().click();
        } else {
          break;
        }
      } else {
        if (prevEnabled) {
          await prevButton.first().click();
        } else {
          break;
        }
      }
      tries++;
      await this.page.waitForTimeout(200);
    }
    // Try to select requested day cell by accessible role/name and only if enabled
    let dayCell = this.page.getByRole('button', { name: `${month}/${day}/${year}` });
    let found = await dayCell.count();
    let selected = false;
    if (found === 1 && !(await dayCell.first().isDisabled().catch(() => true))) {
      await dayCell.first().click({ timeout: 10000 });
      selected = true;
    }
    if (!selected) {
      // Fallback: find the next closest enabled date in future in the same calendar month view
      let enabledCells = this.page.locator("mat-datepicker-content [role='button']:not([aria-disabled='true'])");
      let enabledCount = await enabledCells.count();
      let fallbackIdx = null;
      let fallbackDay = null;
      for (let i = 0; i < enabledCount; i++) {
        let btn = enabledCells.nth(i);
        let name = await btn.getAttribute('aria-label');
        if (!name) continue;
        let parts = name.split('/');
        let m = Number(parts[0]);
        let d = Number(parts[1]);
        let y = Number(parts[2]);
        if (y === year && m === month && d >= day) {
          fallbackIdx = i;
          fallbackDay = d;
          break;
        }
      }
      if (fallbackIdx !== null) {
        await enabledCells.nth(fallbackIdx).click({ timeout: 10000 });
      } else {
        throw new Error(`No selectable calendar day cell found for ${month}/${day}/${year}, and no later selectable date in this month.`);
      }
    }
    // After picking, blur input to reliably close overlay (do NOT click 'Close calendar')
    await this.paymentDateInput.focus();
    await this.page.keyboard.press('Tab');
    await this.amountInput.focus();
    await overlay.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    return this;
  }

  async submitTransferForm() { await this.saveBtn.click({ timeout: 30000 }); return this; }
}
