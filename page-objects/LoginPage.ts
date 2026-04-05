import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../utils/urls';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.errorMessage = page.locator('#error')
    }

    //Navigate to the website
    async navigate() {
        await this.page.goto(URLs.baseURL, { waitUntil: 'load' });
    }

    //Verify Page title
    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
    //Verify Login
    async login(useremail: string, password: string) {
        await this.emailInput.fill(useremail);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginPageVisible() {
        await expect(this.loginButton).toBeVisible();
    }

    async assertErrorMessageVisible(expectedText?: string) {
        await expect(this.errorMessage).toBeVisible();
        if (expectedText) {
            await expect(this.errorMessage).toHaveText(expectedText)
        }
    }

}
