import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  contentSection = this.page.locator('text=Lorem ipsum');

  async assertUserLoggedIn() {
    await expect(this.contentSection).toBeVisible();
  }
}