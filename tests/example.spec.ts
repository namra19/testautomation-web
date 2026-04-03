import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  page.pause()

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Single Page Application/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

