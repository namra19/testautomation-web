import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly contentSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentSection = page.locator('text=Lorem ipsum egestas');
    }
    //Verify user is logged in
    async verifyUserIsLoggedIn() {
        await expect(this.contentSection).toBeVisible();
    }
}