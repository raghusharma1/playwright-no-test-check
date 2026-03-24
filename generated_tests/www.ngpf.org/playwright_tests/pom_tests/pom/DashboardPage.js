import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  /**
   * DashboardPage for banking dashboard home
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    /**
     * VIEW ACCOUNT button for Checking
     * Primary: page.locator('button').filter({ hasText: 'VIEW ACCOUNT' }).first()
     * Alternatives:
     *   page.getByRole('button', { name: /VIEW ACCOUNT/ })
     *   page.locator('button.mat-focus-indicator.view-account')
     */
    this.viewCheckingBtn = this.page.locator('button').filter({ hasText: 'VIEW ACCOUNT' }).first();
  }

  /**
   * Forcefully clears all overlays/dialogs blocking interaction (last resort Angular fix)
   * Attempts to click dismiss/OK buttons and finally DOM-remove overlays that still exist.
   */
  async forceClearAllOverlays(maxTries = 3) {
    for (let attempt = 0; attempt < maxTries; attempt++) {
      // 1. Try to click buttons in dialogs/overlays
      await this.page.evaluate(() => {
        const dialogContainers = Array.from(document.querySelectorAll('mat-dialog-container'));
        dialogContainers.forEach(container => {
          // Try all button elements
          container.querySelectorAll('button').forEach(btn => btn.click());
          // Try close-icon spans/divs just in case
          container.querySelectorAll('span,div').forEach(el => {
            if (el.textContent && /close|ok|dismiss/i.test(el.textContent.trim())) {
              el.click();
            }
          });
        });
      });
      await this.page.evaluate(() => {
        const overlays = Array.from(document.querySelectorAll('.cdk-overlay-backdrop'));
        overlays.forEach(overlay => {
          if (window.getComputedStyle(overlay).display !== 'none' && overlay.click) {
            overlay.click();
          }
        });
      });
      await this.page.waitForTimeout(400); // Let DOM react
      // 2. Remove zombie overlays
      await this.page.evaluate(() => {
        document.querySelectorAll('.cdk-overlay-backdrop, mat-dialog-container').forEach(el => {
          if (el && el.parentNode) el.parentNode.removeChild(el);
        });
      });
      // Allow Angular to repaint
      await this.page.waitForTimeout(300);
      // 3. If overlays are really gone, break
      const overlaysLeft = await this.page.$$('.cdk-overlay-backdrop, mat-dialog-container');
      if (overlaysLeft.length === 0) return;
    }
    // After maxTries, overlays might still exist (should basically never hit)
  }

  /**
   * Click VIEW ACCOUNT for Checking
   * Uses (1) robust modal/overlay dismissal utility, (2) force removes any overlays as last resort.
   * Handles Angular SPA blank-page issue after navigation.
   * @returns {Promise<DashboardPage>}
   */
  async openCheckingAccount() {
    await this.dismissWelcomeModal(5);
    await this.forceClearAllOverlays(3);
    // Wait for overlays/backdrops/dialogs really gone before clicking
    for (let i = 0; i < 3; i++) {
      const overlaysLeft = await this.page.$$('.cdk-overlay-backdrop, mat-dialog-container');
      if (overlaysLeft.length === 0) break;
      await this.page.waitForTimeout(350);
      await this.forceClearAllOverlays(1);
    }
    // Now it's really safe to click
    await this.viewCheckingBtn.waitFor({ state: 'visible', timeout: 20000 });
    await this.viewCheckingBtn.click({ timeout: 45000 });

    // Post-click overlay check (for any racing overlays)
    await this.forceClearAllOverlays(1);
    await this.page.waitForTimeout(100);

    // --- SPA BLANK PAGE DEFENDER: Rule 11 ---
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
    } catch {}
    let bodyText = '';
    try {
      bodyText = await this.page.locator('body').innerText({ timeout: 5000 });
    } catch {}
    if (!bodyText || bodyText.trim().length < 50) {
      console.log('Page appears blank after navigation to checking account — reloading');
      await this.page.reload({ waitUntil: 'networkidle', timeout: 30000 });
      await this.dismissWelcomeModal(3);
      await this.forceClearAllOverlays(2);
    }
    return this;
  }
}
