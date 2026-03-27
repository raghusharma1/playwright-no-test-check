import { BasePage } from './BasePage.js';
/**
 * ConfirmationPage models the confirmation and transfer history UI after successful transfer.
 * Handles green snackbar and Past Transfers section validation, as required in step 15.
 */
export class ConfirmationPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    // Success snackbar
    this.successSnackbar = page.getByText('Amount has been transferred to Saving Account');
    // Past Transfers header
    this.pastTransfersHeader = page.getByRole('heading', { name: 'Past Transfers' });
    // 'Description' cell—will check for transfer
    this.transferDescriptionCell = (desc) => page.getByRole('text', { name: desc });
    // 'Amount' cell (negative for outgoing)
    this.transferAmountCell = (amt) => page.getByRole('text', { name: amt });
    // Id cell (be robust, can use regex)
    this.transferIdCell = (id) => page.getByRole('text', { name: new RegExp(id) });
    // Account tabs
    this.savingTab = page.getByRole('button', { name: /saving/i });
    this.checkingTab = page.getByRole('button', { name: /checking/i });
  }

  /**
   * Waits for success snackbar and Past Transfers section to confirm transfer. Now checks by Description or Amount cell, not <tr>.
   * @param {Object} opts
   * @param {string} opts.amountStr - Exact amount string, e.g. '-$50.00'
   * @param {string} opts.descStr - Description string, e.g. 'Transfer to Saving Account'
   * @returns {Promise<this>}
   */
  async waitForConfirmationAndHistory({ amountStr = '-$50.00', descStr = 'Transfer to Saving Account' } = {}) {
    await this.successSnackbar.waitFor({ timeout: 20000 });
    await this.pastTransfersHeader.waitFor({ timeout: 20000 });
    // Toggle tabs if needed
    let found = await this.transferDescriptionCell(descStr).isVisible({ timeout: 6000 }).catch(() => false);
    if (!found) {
      await this.savingTab.click({ timeout: 6000 }).catch(() => {});
      await this.checkingTab.click({ timeout: 6000 }).catch(() => {});
      found = await this.transferDescriptionCell(descStr).isVisible({ timeout: 10000 }).catch(() => false);
    }
    if (!found) {
      found = await this.transferAmountCell(amountStr).isVisible({ timeout: 10000 }).catch(() => false);
    }
    if (!found) {
      // DEBUG: Print all 'text' role nodes in transfers region for investigation
      const pastTransfersRegion = await this.pastTransfersHeader.evaluateHandle(h => h.parentElement);
      const textNodes = await pastTransfersRegion.evaluateHandle(region => {
        return Array.from(region.querySelectorAll('[role="text"]')).map(n => n.textContent.trim());
      });
      const texts = await textNodes.jsonValue();
      // Only log if running under test, not in prod
      console.log('DEBUG: All Past Transfers visible text nodes:', texts);
      throw new Error(`No transfer row found in table with description: '${descStr}' or amount: '${amountStr}'`);
    }
    return this;
  }
}
