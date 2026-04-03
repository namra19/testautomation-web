import { test, expect, Browser, chromium, Page } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage'

test.describe('Home Page Tests', async () => {

  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    await homePage.navigate();
  });

  //Test 1 - Verify home page is loaded successfully 
  test('Verify home page opens successfully', async ({ page }) => {
    await homePage.verifyTitle('Single Page Application');
  });

});
