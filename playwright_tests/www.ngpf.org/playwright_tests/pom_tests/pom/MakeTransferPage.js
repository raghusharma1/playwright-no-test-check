import { expect } from '@playwright/test';

export class MakeTransferPage {
  constructor(page) {
    this.page = page;
    this.paymentFrequencyDropdown = page.getByRole('combobox', { name: 'PAYMENT FREQUENCY' });
    this.paymentFrequencySingleOption = page.getByRole('option', { name: 'SINGLE' });
    this.transferFromDropdown = page.getByRole('combobox', { name: 'Transfer From' });
    this.checkingAccountOption = page.getByRole('option', { name: 'CHECKING ($216.04)' });
    this.transferToDropdown = page.getByRole('combobox', { name: 'Transfer To' });
    this.savingAccountOption = page.getByRole('option', { name: 'SAVING ($230.00)' }).first();
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount' });
    this.paymentDateInput = page.getByRole('textbox', { name: 'Payment Date' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.frequencySingleOption = page.getByRole('option', { name: 'SINGLE' });
    this.frequencyCombo = page.getByLabel(/PAYMENT FREQUENCY/);
    this.fromCheckingOption = page.getByRole('option', { name: /CHECKING \(\$\d+\.\d{2}\)/ });
    this.fromCombo = page.getByLabel(/Transfer From/);
    this.toSavingOption = page.getByRole('option', { name: /SAVING \(\$\d+\.\d{2}\)/ }).last();
    this.toCombo = page.getByLabel(/Transfer To/);
    this.paymentDateCalendarBtn = page.locator('mat-card-content').getByRole('button', { name: /Open calendar/i });
    this.calendarOverlay = page.locator('div.cdk-overlay-pane mat-calendar, div.mat-datepicker-content');
    this.sidebarHomeBtn = page.getByRole('link', { name: /Home/i });
  }

  async expandPaymentFrequencyDropdown() { await this.paymentFrequencyDropdown.click({ timeout: 20000 }); return this; }
  async selectPaymentFrequency() { await this.paymentFrequencySingleOption.click({ timeout: 20000 }); return this; }
  async expandTransferFromDropdown() { await this.transferFromDropdown.click({ timeout: 20000 }); return this; }
  async selectTransferFromAccount() { await this.checkingAccountOption.click({ timeout: 20000 }); return this; }
  async expandTransferToDropdown() { await this.transferToDropdown.click({ timeout: 20000 }); return this; }
  async selectTransferToAccount() { await this.savingAccountOption.click({ timeout: 20000 }); return this; }
  async fillAmountField(value) { await this.amountInput.fill(''); await this.amountInput.fill(value, { timeout: 15000 }); return this; }

  async fillPaymentDateField(dateString) {
    console.log('BEFORE fillPaymentDate:', await this.page.url());
    await this.fillPaymentDate(dateString);
    console.log('AFTER fillPaymentDate:', await this.page.url());
    return this;
  }

  async fillPaymentDate(dateString) {
    console.log('fillPaymentDate: top', dateString, await this.page.url());
    const inputSelector = 'input[formcontrolname=paymentDate], input[aria-label="Payment Date"], input';
    await this.page.evaluate(({ date, selector }) => {
      const input = document.querySelector(selector);
      if (input) {
        input.removeAttribute('readonly');
        input.value = date;
        const eventNames = ['input', 'change', 'blur'];
        eventNames.forEach(ev => {
          const e = new Event(ev, { bubbles: true });
          input.dispatchEvent(e);
        });
      }
    }, { date: dateString, selector: inputSelector });
    console.log('fillPaymentDate: after evaluate', await this.page.url());
    await this.paymentDateInput.focus();
    await this.paymentDateInput.press('Tab').catch(() => {});
    console.log('fillPaymentDate: after Tab', await this.page.url());
    await this.page.waitForTimeout(100);
    await this.page.evaluate(() => {
      const pane = document.querySelector('.cdk-overlay-pane');
      if (pane && pane.parentNode) pane.parentNode.removeChild(pane);
    });
    console.log('fillPaymentDate: after overlay remove', await this.page.url());
    await this.page.waitForTimeout(150);
    return this;
  }

  async submitTransferForm() { await this.saveBtn.click({ timeout: 30000 }); return this; }

  async selectFrequencySingle() { await this.frequencyCombo.click(); await this.frequencySingleOption.click(); }
  async selectTransferFromChecking() { await this.fromCombo.click(); await this.fromCheckingOption.click(); }
  async selectTransferToSaving() { await this.toCombo.click(); await this.toSavingOption.click(); }
  async fillAmount(value) { await this.amountInput.fill(''); await this.amountInput.type(value); }
  async clickSave() { await this.saveBtn.click(); }
}
