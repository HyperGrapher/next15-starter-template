import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Next.js SaaS Starter');
});

test('Sign up link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the sign up link.
  await page.getByRole('link', { name: 'Sign Up' }).click();

  await expect(page).toHaveURL('http://localhost:3000/sign-up')


  // Expects page to have a heading with the name:
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
});
