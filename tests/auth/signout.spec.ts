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
    test('@smoke User can logout successfully', async ({ loginAs, page }) => {
        await homePage.clickSignOut();
        await loginPage.assertLoginPageVisible();

    });

    test('@regression User stays on login page after clicking back post logout', async ({ page }) => {
        await homePage.clickSignOut();
        await page.goBack();
        //Todo Add expect to be login url
       expect(page.url()).not.toBe(URLs.baseURL);    
    });

     test('@regression Credentials should be cleared after logout', async ({ page }) => {
        await homePage.clickSignOut();
        await loginPage.assertLoginPageVisible();

        //Assert email and password fields are empty
        const emailInput = await loginPage.getEmailFieldValue();
        const passwordInput = await loginPage.getPasswordFieldValue();

        if (emailInput || passwordInput ) {
            console.log ('Credentials are NOT cleared after logout')
        }

        expect(emailInput).toBe('');
        expect(passwordInput).toBe('');
       
    });
});