import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../utils/urls';

export class HomePage {
    readonly page: Page;
    readonly contentSection: Locator;
    readonly userIcon: Locator;
    readonly signOut: Locator;
   // readonly contentBody: Locator;
    readonly navigationBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentSection = page.locator('text=Lorem ipsum egestas');
        this.userIcon = page.locator('#user');
        this.signOut = page.getByText('Sign Out')
              this.navigationBar = page.locator('#navigation');
      //  this.signOut = page.locator('text=Logout');
       // this.contentBody = page.locator('div').filter({ hasText: 'Lorem ipsum egestas posuere' })

    }
    //Verify user is logged in
    async verifyUserIsLoggedIn() {
        await expect(this.contentSection).toBeVisible();
    }

      async assertUserLoggedIn(expectedUser: string) {
        await expect(this.page).toHaveURL(URLs.baseURL);
        await expect(this.navigationBar).toBeVisible();
        await expect(this.userIcon).toBeVisible();
    }

    //Click SignOut
    async clickSignOut() {
        await this.userIcon.click();
        await this.signOut.click();
    }

    //Verify content section is visible
    // async verifyContectSection() {
    //     await expect(this.contentBody).toBeVisible();
    // }

     mainContentLocator(): Locator {
    return this.page.locator('text=Lorem ipsum egestas'); 
  }

}