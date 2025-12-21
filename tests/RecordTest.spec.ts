import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://account.box.com/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('ashishamrute28@gmail.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ashish@1986');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('new-item-menu-button').click();
  await page.getByRole('menuitem', { name: 'Create a new Folder' }).click();
  await page.getByRole('textbox', { name: 'Folder Name' }).fill('Test123');
  await page.getByLabel('PermissionEditorViewer').selectOption('Viewer');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText('"Test123" was created').click();
  await page.getByRole('button', { name: 'Toggle account menu' }).click();
  await page.getByTestId('account-menu-logout').click();
  await page.getByRole('heading', { name: 'Sign In to Your Account' }).click();
});