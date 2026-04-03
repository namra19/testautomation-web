import { expect, Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';
import { BasePage } from './BasePage';
import { URLs } from '../fixtures/urls';

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    //Navigate to the website
    async navigate() {
        await this.page.goto(URLs.baseURL, { waitUntil: 'load' });
        await this.acceptCookiesIfPresent()
    }

    //Verify Page title
    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
    //Verify Login
    async login(user: string, password: string) {
        await this.page.fill(loginLocators.userInput, user);
        await this.page.fill(loginLocators.passwordInput, password);
        await this.page.click(loginLocators.loginButton);
    }

}
