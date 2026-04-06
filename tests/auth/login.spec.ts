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

    //check assertion in test and page objects
    
    //Valid login - admin
    test('@smoke Admin Login with valid credentials', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        await expect(page).toHaveURL(URLs.baseURL)
    });

    // Valid login - user 1 
    test('@regression User1 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user1Login');
        //Todo add expect
    });

    // Valid login - user 2
    test('@regression User2 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user2Login');
        //Todo add expect
    });

    //Negative tests for login
    test('@regression Login with invalid credentials', async ({ loginAs }) => {
        await loginAs('invalidEmail');
        //Todo add expect
    });

    test('@regression Login with empty credentials', async ({ loginAs }) => {
        await loginAs('emptyCredentials');
        //Todo add expect
    });

    test('@regression Login with credentials of invalid format', async ({ loginAs }) => {
        await loginAs('invalidFormat');
        //Todo add expect
    });

});
