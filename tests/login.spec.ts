import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { users } from '../fixtures/users';
import { URLs } from '../fixtures/urls';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ context, page }) => {
        loginPage = new LoginPage(page);
          await context.clearCookies();
        await loginPage.navigate();
    });

    // Verify website is loaded successfully 
    test('Verify home page opens successfully', async ({ page }) => {
        await loginPage.verifyTitle('Single Page Application');
    });

    //Valid login - admin
    test('Admin Login with valid credentials', async ({ page }) => {
        await loginPage.login(
            users.adminLogin.email,
            users.adminLogin.password
        );
        await expect(page).toHaveURL(URLs.baseURL);
    });

    test('User1 Login with valid credentials', async ({ page }) => {
        await loginPage.login(
            users.user1Login.email,
            users.user1Login.password
        );
    });

    test('User2 Login with valid credentials', async ({ page }) => {
        await loginPage.login(
            users.user2Login.email,
            users.user2Login.password
        );
    });

    //Invalid login
    test('Login with invalid credentials', async ({ page }) => {
        await loginPage.login(
            users.invalidEmail.email,
            users.invalidPassword.password
        );
    });

    test('Login with empty credentials', async ({ page }) => {
        await loginPage.login(
            users.emptyCredentials.email,
            users.emptyCredentials.password
        );
    });

    test('Login with credentials of invalid format', async ({ page }) => {
        await loginPage.login(
            users.invalidFormat.email,
            users.invalidFormat.password
        );
    });

    
});