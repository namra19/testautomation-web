import { expect, test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { URLs } from '../../utils/urls';
import { users } from '../../utils/testData';

test.describe('Sign Out Tests', () => {

    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ loginAs, page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginAs('adminLogin');
    });

    // Verify user can logout successfully
    test('@smoke User can logout successfully', async ({ page }) => {
        await homePage.clickSignOut();
        await loginPage.getLoginButtonLocator().isVisible();

    });

    // Verify user cannot navigate back to home page after logout
    test('@regression User should not be able to navigate back to the home page after logout', async ({ page }) => {
        await homePage.clickSignOut();
        //User is redirected to login page after clicking back post logout
        await loginPage.getLoginButtonLocator().isVisible();
        //User should not be able to navigate back to the home page after logout
        await page.goBack();
        expect(page.url()).not.toBe(URLs.baseURL);
    });

    // Verify credentials are cleared after logout
    // This test will fail as the app currently does not clear credentials after logout, needs to be fixed in the app
    test('@regression Credentials should be cleared after logout', async ({ page }) => {
        await homePage.clickSignOut();
        await loginPage.getLoginButtonLocator().isVisible();

        const emailInput = await loginPage.getEmailFieldValue();
        const passwordInput = await loginPage.getPasswordFieldValue();

        if (emailInput || passwordInput) {
            console.log('Credentials are NOT cleared after logout')
        }

        expect(emailInput).toBe('');
        expect(passwordInput).toBe('');

    });
});