import { BasePage } from './BasePage.js';

// SidebarMenuPage models the sidebar and its account expansion/selection behaviors.
export class SidebarMenuPage extends BasePage {
  constructor(page) {
    super(page);
    // Selector for ACCOUNTS expandable sidebar menu
    // 1. page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' })
    // 2. page.locator('a.mat-list-item.mat-focus-indicator')
    // 3. page.locator('a.mat-list-item')
    this.accountsExpandBtn = page.locator('a').filter({ hasText: 'ACCOUNTS expand_more' });
    // Selector for ACCOUNT ACTIVITY in sidebar
    // 1. page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' })
    // 2. page.locator('a').filter({ hasText: /^ACCOUNT ACTIVITY$/ })
    // 3. page.locator('xpath=html/body/app-root/app-main/mat-drawer-container/mat-drawer/div/mat-nav-list/app-menu-list-item[3]/div/app-menu-list-item[1]/a')
    this.accountActivityLink = page.locator('a').filter({ hasText: 'ACCOUNT ACTIVITY' });
  }

  // Expands the ACCOUNTS section in the sidebar
  async expandAccountsSection() {
    await this.accountsExpandBtn.click({ timeout: 30000 });
    return this;
  }

  // Selects ACCOUNT ACTIVITY from the sidebar; remains on same page
  async openAccountActivity() {
    await this.accountActivityLink.click({ timeout: 30000 });
    return this;
  }
}
