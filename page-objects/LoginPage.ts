import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../utils/urls';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly heroText: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.errorMessage = page.locator('#error')
        this.heroText = page.locator('text=Automation doesn\'t stop at testing, it\'s just a beginning!');

    }

    //Navigate to the website
    async navigate() {
        await this.page.goto(URLs.baseURL, { waitUntil: 'load' });
    }

    //Verify Login
    async login(useremail: string, password: string) {
        await this.emailInput.fill(useremail);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
    getLoginButtonLocator(): Locator {
        return this.loginButton;
    }

    getErrorMessageLocator(): Locator {
        return this.errorMessage;
    }

    //Get the values from the email and password fields to verify that they are cleared after failed login attempts
    async getEmailFieldValue() {
        return await this.emailInput.inputValue();
    }

    async getPasswordFieldValue() {
        return await this.passwordInput.inputValue();
    }

     getHeroTextLocator(): Locator {
        return this.heroText;
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
