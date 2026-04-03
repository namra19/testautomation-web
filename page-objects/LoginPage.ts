import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLs } from '../fixtures/urls';

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
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
    async login(useremail: string, password: string) {
        await this.emailInput.fill(useremail) ;
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
