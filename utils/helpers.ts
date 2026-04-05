import { expect, Page, request } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage'
import { users } from './testData';
import { URLs } from './urls';


// Generic login function
export async function loginAsUser(page: Page, userKey: keyof typeof users) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const { email, password } = users[userKey];
    await loginPage.login(email, password);
}