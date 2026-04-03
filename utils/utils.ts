import { expect, Page, request } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage'
import { users } from '../fixtures/users';
import { URLs } from '../fixtures/urls';


// Generic login function
export async function loginAsUser(page: Page, userKey: keyof typeof users) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const { email, password } = users[userKey];
    await loginPage.login(email, password);
}