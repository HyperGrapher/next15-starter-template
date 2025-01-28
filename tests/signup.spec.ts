import { test, expect } from '@playwright/test';

test('Sign up user and signout with redirect to home page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Testing' }).click();

    await expect(page.getByTestId('user-count')).toHaveText("Users: 0");
    await expect(page.getByTestId('no-users-msg')).toHaveText("No users found...");

    await page.getByRole('main').getByRole('link', { name: 'Sign Up' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test@email.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('test123456');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page).toHaveURL('http://localhost:3000/test')

    await expect(page.getByTestId('user-0')).toBeVisible();
    await expect(page.getByTestId('user-0')).toHaveText('test@email.com');

    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Build Your SaaS/);
});

