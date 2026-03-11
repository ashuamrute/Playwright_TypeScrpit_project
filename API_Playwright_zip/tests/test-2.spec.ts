import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://account.box.com/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('pfighter');
  await page.getByRole('textbox', { name: 'Email Address' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Email Address' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('pfighter@gmail.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('axa12345');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Notes' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://app.box.com/notes/1983809896763');
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('create-note-button').click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('textbox', { name: 'Add a Title' }).click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('textbox', { name: 'Add a Title' }).fill('notes123');
  await page1.locator('iframe[name="service_iframe"]').contentFrame().locator('div').filter({ hasText: /^New$/ }).nth(1).click({
    button: 'right'
  });
  await page1.locator('iframe[name="service_iframe"]').contentFrame().locator('div').filter({ hasText: /^New$/ }).nth(1).click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('options-menu-trigger').click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('menuitem', { name: 'Delete this note' }).click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().locator('.ProseMirror').first().click();
  await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('button', { name: 'Clear Notification' }).click();
  await page1.close();
  await page.getByRole('button', { name: 'Toggle account menu' }).click();
  await page.getByTestId('account-menu-logout').click();
  await expect(page.getByRole('heading')).toContainText('Sign In to Your Account');
  await expect(page.getByRole('heading')).toContainText('Sign In to Your Account');
});