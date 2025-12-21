import { test, expect, Locator } from "@playwright/test";

test('Create Delete Bookmark page', {tag:["@CreateDelFolder","@Folder"]},async ({page}) => {
    await page.goto("https://app.box.com");
    await page.locator("id=login-email").fill('ashishamrute28@gmail.com');
    await page.locator("id=login-submit").click();
    // await page.locator('#password-login').pressSequentially("testing123",{delay:400});
    await page.locator("#password-login").fill("Ashish@1986");
    await page.locator("#login-submit-password").click();

    // Verify title
    await expect.soft(page).toHaveTitle("Box");
    // Create folder
    await page.getByLabel('New').click();
    await page.getByLabel('Create a new Bookmark').click();
    const BookmarkName = "MyBookmark" + Math.floor(Math.random() * 1000);
    await page.locator("//input[@name='url']").fill(BookmarkName);
    await page.getByRole('button', { name: 'Create' }).click();
    // await page.getByText('Create').click();

    // Validate create folder message
    const notify: Locator = page.locator("div.notification.info.wrap");
    await expect(notify).toBeVisible();

    // Select and Delete the Folder
    const rowLocator: Locator = page.locator("//a[text()='" + BookmarkName + "']/ancestor::div[@role='row']");
    await rowLocator.hover();
    const checkBox: Locator = rowLocator.locator("//input[@class='mousetrap']");
    await checkBox.click();
    await page.getByLabel('Trash').click();
    await page.getByText('Okay').click();

    // Validate delete folder message
    const notify1: Locator = page.locator("div.notification.info.wrap");
    await expect(notify).toBeVisible();
    await page.getByLabel('Clear Notification').click();

    // logout
    await page.getByLabel('Toggle account menu').click();
    await page.getByTestId('account-menu-logout').click();
    await page.close();

});