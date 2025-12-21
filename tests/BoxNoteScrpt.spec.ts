import test, { FrameLocator, Page } from "@playwright/test";

test('Box note Script', {tag:"@Note"},async ({ page }) => {
    await page.goto("https://app.box.com");
    await page.locator("id=login-email").fill('ashishamrute28@gmail.com');
    await page.click("id=login-submit");
    // await page.locator('#password-login').pressSequentially("testing123",{delay:400});
    await page.locator("#password-login").fill("Ashish@1986");
    await page.locator("#login-submit-password").click({timeout:5000});

    // Start waiting for popup before clicking

    // const popupPromise = page.waitForEvent('popup');
    //    await page.getByLabel('Notes').click();

    const popupPromise = page.waitForEvent('popup');
    await page.getByLabel('Notes').click();
    // await page.locator('[data-resin-target="boxnotes"]').click();


    //switching to a new page
    const page1 = await popupPromise;
    const frameElement: FrameLocator = page1.frameLocator('iframe[name="service_iframe"]');
    await frameElement.getByTestId('create-note-button').waitFor();
    await frameElement.getByTestId('create-note-button').click();
    await frameElement.getByPlaceholder('Add a Title').click();
    await frameElement.getByPlaceholder('Add a Title').clear();
    await frameElement.getByPlaceholder('Add a Title').fill('My Notes');
    await frameElement.getByTestId('options-menu-trigger').click();
    await frameElement.getByText('Delete this note').hover();
    await frameElement.getByText('Delete this note').click();
    await frameElement.getByTestId('notification').isVisible();
    await frameElement.getByLabel('Clear Notification').click();


});