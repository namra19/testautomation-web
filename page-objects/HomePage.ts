import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly contentSection: Locator;
    readonly userIcon: Locator;
    readonly signOut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentSection = page.locator('text=Lorem ipsum egestas');
        this.userIcon = page.locator('#user');
        this.signOut = page.getByText('Sign Out')
    }
    //Verify user is logged in
    async verifyUserIsLoggedIn() {
        await expect(this.contentSection).toBeVisible();
    }

    //Click SignOut
    async clickSignOut() {
        await this.userIcon.click();
        await this.signOut.click();
    }

}