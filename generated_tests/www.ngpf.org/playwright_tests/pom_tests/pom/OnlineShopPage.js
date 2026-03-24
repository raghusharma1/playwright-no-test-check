import { BasePage } from './BasePage.js';

export class OnlineShopPage extends BasePage {
  /**
   * OnlineShopPage for selecting and purchasing shopping cart items
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    /**
     * Smoothie Boost checkbox
     * Primary: page.locator('#mat-checkbox-21')
     * Alternatives:
     *   page.getByText('Smoothie Boost')
     */
    this.smoothieBoostCheckbox = this.page.locator('#mat-checkbox-21');
    /**
     * Sit & Eat checkbox
     * Primary: page.locator('#mat-checkbox-22')
     * Alternatives:
     *   page.getByText('Sit & Eat')
     */
    this.sitAndEatCheckbox = this.page.locator('#mat-checkbox-22');
    /**
     * Glam Beauty checkbox
     * Primary: page.locator('#mat-checkbox-24')
     * Alternatives:
     *   page.getByText('Glam Beauty')
     */
    this.glamBeautyCheckbox = this.page.locator('#mat-checkbox-24');
    /**
     * Shopping modal Save button
     * Primary: page.locator('button').filter({ hasText: 'Save' })
     * Alternatives:
     *   page.getByRole('button', { name: 'Save' })
     */
    this.saveButton = this.page.locator('button').filter({ hasText: 'Save' });
  }

  /**
   * Select Smoothie Boost item
   * @returns {Promise<OnlineShopPage>}
   */
  async selectSmoothieBoost() {
    await this.smoothieBoostCheckbox.click({ timeout: 30000 });
    return this;
  }
  /**
   * Select Sit & Eat item
   * @returns {Promise<OnlineShopPage>}
   */
  async selectSitAndEat() {
    await this.sitAndEatCheckbox.click({ timeout: 30000 });
    return this;
  }
  /**
   * Select Glam Beauty item
   * @returns {Promise<OnlineShopPage>}
   */
  async selectGlamBeauty() {
    await this.glamBeautyCheckbox.click({ timeout: 30000 });
    return this;
  }
  /**
   * Submit shopping cart selection
   * @returns {Promise<OnlineShopPage>}
   */
  async submitShoppingCart() {
    await this.saveButton.click({ timeout: 30000 });
    return this;
  }
}
