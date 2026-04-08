import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../utils/urls';

export class HomePage {
  readonly page: Page;
  readonly contentSection: Locator;
  readonly userIcon: Locator;
  readonly signOut: Locator;
  readonly navigationBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contentSection = page.locator('text=Lorem ipsum egestas');
    this.userIcon = page.locator('#user');
    this.signOut = page.getByText('Sign Out')
    this.navigationBar = page.locator('#navigation');

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

  getContentSectionLocator(): Locator {
    return this.contentSection;
  }
  getHomePageLocator(): Locator {
    return this.contentSection
  }

  getNavigationBarLocator(): Locator {
    return this.navigationBar;
  }

  getUserIconLocator(): Locator {
    return this.userIcon;
  }

  //Click SignOut
  async clickSignOut() {
    await this.userIcon.click();
    await this.signOut.click();
  }

  getMainContentLocator(): Locator {
    return this.page.locator('text=Lorem ipsum egestas');
  }

}