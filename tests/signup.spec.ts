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

    await expect(page).toHaveURL('http://localhost:3000/test');

    await expect(page.getByTestId('user-0')).toBeVisible();
    await expect(page.getByTestId('user-0')).toHaveText('test@email.com');
    await expect(page.getByTestId('user-count')).toHaveText("Users: 1");
    await expect(page.getByTestId('auth-email')).toHaveText('test@email.com');



    await page.getByTestId('logout').click();
    await page.waitForURL('http://localhost:3000')
    await expect(page).toHaveURL('http://localhost:3000');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Build Your SaaS/);
});

test('Test translations to have correct value', async ({ page }) => {

    await page.goto('http://localhost:3000/test');

    await expect(page.getByTestId('intl-title')).toHaveText('This is English Title');

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Türkçe' }).click();
    await expect(page.getByTestId('intl-title')).toHaveText('Türkçe uygulama başlığı');
})


test('Test user login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await page.getByRole('link', { name: 'Sign in to existing account' }).click();

    await expect(page).toHaveURL('http://localhost:3000/login');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test@email.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('test123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL('http://localhost:3000/test');

    await expect(page.getByTestId('auth-email')).toHaveText('test@email.com');

});

test('Test delete users', async ({ page }) => {
    await page.goto('http://localhost:3000/test');

    await expect(page.getByTestId('user-count')).toHaveText("Users: 1");
    await page.getByRole('button', { name: 'Delete Users' }).click();
    await expect(page.getByTestId('user-count')).toHaveText("Users: 0");
    await expect(page.getByTestId('user-0')).not.toBeVisible();

})