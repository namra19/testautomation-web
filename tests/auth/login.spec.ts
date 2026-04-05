import { LoginPage } from '../../page-objects/LoginPage';
import { test, expect } from '../../fixtures/auth.fixture';
import { URLs } from '../../utils/urls';


test.describe('Login Tests', () => {
    // Verify website is loaded successfully 
    test('Verify home page opens successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.verifyTitle('Single Page Application');
    });

    //Valid login - admin
    test('Admin Login with valid credentials', async ({ loginAs, page }) => {
        await loginAs('adminLogin');
        await expect(page).toHaveURL(URLs.baseURL)
    });

    // Valid login - user 1
    test('User1 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user1Login');
    });

    // Valid login - user 2
    test('User2 Login with valid credentials', async ({ loginAs }) => {
        await loginAs('user2Login');
    });

    //Negative tests for login
    test('Login with invalid credentials', async ({ loginAs }) => {
        await loginAs('invalidEmail');
    });

    test('Login with empty credentials', async ({ loginAs }) => {
        await loginAs('emptyCredentials');
    });

    test('Login with credentials of invalid format', async ({ loginAs }) => {
        await loginAs('invalidFormat');
    });

});
