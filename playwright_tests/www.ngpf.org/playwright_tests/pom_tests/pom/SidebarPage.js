import { BasePage } from './BasePage.js';

/**
 * SidebarPage models the navigation sidebar in the main simulator.
 */
export class SidebarPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for "ACCOUNTS expand_more" navigation item
    this.accountsNavItem = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
    // Alternate selectors (for reference):
    // page.locator('a.mat-list-item.mat-focus-indicator')
    // page.locator('a.mat-list-item')

    // Selector for 'ACCOUNT ACTIVITY' menu item
    this.accountActivityNavItem = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
    // Alternate selectors (for reference):
    // page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')

    // --- Added for Transfers workflow ---
    // "TRANSFERS expand_more" section (step 4)
    // 1. page.locator('a').filter({ hasText: 'TRANSFERS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    this.transfersNavItem = page.locator('a').filter({ hasText: 'TRANSFERS expand_more' });

    // "MAKE A TRANSFER" menu item (step 5)
    // 1. page.locator('a').filter({ hasText: 'MAKE A TRANSFER' })
    // 2. page.getByText('MAKE A TRANSFER')
    // 3. page.locator('a').filter({ hasText: /^MAKE A TRANSFER$/ })
    this.makeTransferNavItem = page.locator('a').filter({ hasText: 'MAKE A TRANSFER' });

    // --- New for TransferHistory (step 5) ---
    // "DISPLAY ALL TRANSFERS" sidebar item
    // 1. page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' })
    // 2. page.getByText('DISPLAY ALL TRANSFERS')
    // 3. page.locator('a').filter({ hasText: /^DISPLAY ALL TRANSFERS$/ })
    this.displayAllTransfersNavItem = page.locator('a').filter({ hasText: 'DISPLAY ALL TRANSFERS' });

    // --- Bill Payment Workflow ---
    // "BILLS expand_more" section
    // 1. page.locator('a').filter({ hasText: 'BILLS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.getByText('BILLS expand_more')
    this.billsNavItem = page.locator('a').filter({ hasText: 'BILLS expand_more' });

    // "MANAGE RECIPIENT" sidebar item
    // 1. page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' })
    // 2. page.getByText('MANAGE RECIPIENT')
    // 3. page.locator('a').filter({ hasText: /^MANAGE RECIPIENT$/ })
    this.manageRecipientNavItem = page.locator('a').filter({ hasText: 'MANAGE RECIPIENT' });

    // --- Check Deposit Workflow ---
    // Selector for 'DEPOSIT CHECKS' menu item (step 4)
    // Primary: page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' })
    // Alternate: page.getByText('DEPOSIT CHECKS')
    // Alternate: page.locator('a').filter({ hasText: /^DEPOSIT CHECKS$/ })
    this.depositChecksNavItem = page.locator('a').filter({ hasText: 'DEPOSIT CHECKS' });
  }

  /**
   * Clicks Accounts section to expand it in sidebar.
   * @returns {Promise<SidebarPage>}
   */
  async expandAccountsSection() {
    await this.accountsNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks Account Activity within sidebar after Accounts expanded.
   * @returns {Promise<SidebarPage>}
   */
  async openAccountActivity() {
    await this.accountActivityNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Expands the 'TRANSFERS' section in the sidebar to reveal transfer options.
   * @returns {Promise<SidebarPage>}
   */
  async expandTransfersSidebar() {
    await this.transfersNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'MAKE A TRANSFER' menu item to open the transfer form.
   * @returns {Promise<SidebarPage>}
   */
  async openTransferForm() {
    await this.makeTransferNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'DISPLAY ALL TRANSFERS' sidebar item to navigate to transfer history.
   * Uses captured selector strictly for workflow reliability.
   * @returns {Promise<SidebarPage>}
   */
  async openTransferHistory() {
    await this.displayAllTransfersNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Expands the 'BILLS' section in the sidebar to reveal bill management options.
   * @returns {Promise<SidebarPage>}
   */
  async expandBillsNav() {
    await this.billsNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'MANAGE RECIPIENT' sidebar link to navigate to recipient management panel.
   * @returns {Promise<SidebarPage>}
   */
  async openManageRecipients() {
    await this.manageRecipientNavItem.click({ timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'DEPOSIT CHECKS' sidebar menu item to navigate to the Deposit Check page.
   *
   * Relies on the captured selector strictly for workflow reliability.
   * @returns {Promise<SidebarPage>} Fluent return for chaining.
   */
  async openDepositChecks() {
    await this.depositChecksNavItem.click({ timeout: 30000 });
    return this;
  }
}
