import { expect, test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Session Management Test', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ loginAs, page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginAs('adminLogin');
    });

    // Verify user remains logged in after page refresh
    test('@regression Verify user remains logged in after page refresh', async ({ page }) => {
        //Refresh page
        await page.reload();

        //Verify user is still logged in
        await expect(homePage.getContentSectionLocator()).toBeVisible();
    });

    // Verify user is logged out after session expires
    test('@smoke Verify user is logged out after session expires', async ({ page }) => {
         await expect(homePage.getContentSectionLocator()).toBeVisible();

        //Simulate session expiration
        await page.context().clearCookies();
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        })
        //Refresh
        await page.reload();
        //Verify user is redirected to login page
        await expect(loginPage.getLoginButtonLocator()).toBeVisible();
    });
});


