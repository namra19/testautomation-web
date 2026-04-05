import { LoginPage } from '../../page-objects/LoginPage';
import { test, expect } from '../../fixtures/auth.fixture';
import { URLs } from '../../utils/urls';


test.describe.parallel('Login Tests', () => {
    // Verify website is loaded successfully 
    test('@smoke Verify home page opens successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.verifyTitle('Single Page Application');
    });

    //Valid login - admin
    test('@smoke Admin Login with valid credentials', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        await expect(page).toHaveURL(URLs.baseURL)
    });

    // Valid login - user 1 
    test('@regression User1 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user1Login');
    });

    // Valid login - user 2
    test('@regression User2 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user2Login');
    });

    //Negative tests for login
    test('@regression Login with invalid credentials', async ({ loginAs }) => {
        await loginAs('invalidEmail');
    });

    test('@regression Login with empty credentials', async ({ loginAs }) => {
        await loginAs('emptyCredentials');
    });

    test('@regression Login with credentials of invalid format', async ({ loginAs }) => {
        await loginAs('invalidFormat');
    });

});
