import { expect, test } from '../../fixtures/auth.fixture';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { URLs } from '../../utils/urls';

test.describe('Sign Out Tests', () => {

    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ loginAs, page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginAs('adminLogin');
    });

    // Verify user can logout successfully
    test('User can logout successfully', async ({ loginAs, page }) => {
        await homePage.clickSignOut();
        await loginPage.assertLoginPageVisible();

    });

    test('User stays on login page after clicking back post logout', async ({ page }) => {
        await homePage.clickSignOut();
        await page.goBack();
       expect(page.url()).not.toBe(URLs.baseURL);

    
    });
});