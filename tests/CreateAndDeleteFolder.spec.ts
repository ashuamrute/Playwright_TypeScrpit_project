import test, { expect, Locator } from "@playwright/test";

test('Create and delete folder', { tag: "@CreateDeleteFol" }, async ({ page }) => {
    // Login Steps
    await page.goto("https://app.box.com");
    await page.locator("id=login-email").fill('ashishamrute28@gmail.com');
    await page.locator("id=login-submit").click();
    // await page.locator('#password-login').pressSequentially("testing123",{delay:400});
    await page.locator("#password-login").fill("Ashish@1986");
    await page.locator("#login-submit-password").click();

    //returns a promise to resolve timeout of certain duration
    //  await new Promise(resolve => setTimeout(resolve, 3000));
    // test.slow    //  triples the test timeout
//  what is slowMo - slows the execution time between each actions, it has to set in config.ts

    // Verify title
    await expect.soft(page).toHaveTitle("Files | Powered by Box");

    // Create folder
    // await page.locator("button[aria-label='New']").waitFor();
    await page.locator("button[aria-label='New']").click();
    await page.locator('//li[@data-target-id="MenuItem-newfolder"]').click();
    const folderName = "Test" + Math.floor(Math.random() * 1000);
    await page.locator("//input[@name='folder-name']").fill(folderName);

    await page.locator("select[name='invite-permission']").selectOption({ value: 'Viewer' });
    // await page.locator('//span[text()="Create"]').click();
    await page.locator("div>button[type='submit']").click();

    // Validate create folder message
    const notify: Locator = page.locator("div.notification.info.wrap");
    await expect(notify).toBeVisible();

    // Select and Delete the Folder
    const rowLocator: Locator = page.locator("//a[text()='" + folderName + "']/ancestor::div[@role='row']");
    await rowLocator.hover();
    const checkBox: Locator = rowLocator.locator("//input[@class='mousetrap']");
    await checkBox.click();
    await page.locator('//button[@data-resin-target="trash"]').click();
    await page.locator('//button//span[text()="Okay"]').click();

    // Validate delete folder message
    const notify1: Locator = page.locator("div.notification.info.wrap");
    await expect(notify).toBeVisible();
    await page.locator("button.close-btn").click();

    // logout
    await page.locator("//button[@data-resin-target='accountmenu']").click();
    await page.locator("a[href='/logout']").click();
    await expect.soft(page.locator("div>h1")).toHaveText("Sign In to Your Account");
    await page.close();
});