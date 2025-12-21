import { test, expect, Locator } from "@playwright/test";

test('Box create delete folder', { tag: "@smoke1" }, async ({page}) => {
    const folderName = "Test" + Math.floor(Math.random() * 1000);

    await test.step('Navigate to app', async () => {
        await page.goto('https://account.box.com/login');
    });

    await test.step('Login', async () => {
        await page.locator("id=login-email").fill('ashishamrute28@gmail.com');
        await page.locator("id=login-submit").click();
        await page.locator("#password-login").fill("Ashish@1986");
    });
    
    await test.step('Clicked on submit button', async () => {
        await page.locator("#login-submit-password").click();
    });

    await test.step('Verify Title', async () => {
        console.log(await page.title());
        await expect.soft(page).toHaveTitle(/Box/);
    });

    await test.step('Click on new button', async () => {
        await page.locator("button[aria-label='New']").click();
        
    });
    await test.step('Select folder', async () => {
       await page.locator("//span[text()='Folder']").click();
   
    });
    await test.step('Enter folder name', async () => {   
        await page.locator("//input[@name='folder-name']").fill(folderName);
    });
    await  test.step('Select Viwer from dropdown', async () => {
        await page.locator("select[name='invite-permission']").selectOption({ value: 'Viewer' });
        
    });
     await test.step('Click on create button', async () => {
       await page.locator('//span[text()="Create"]').click();
        // await page.locator("div>button[type='submit']").click();
    });

    await test.step('Validate folder message', async () => {
     const notify = page.locator("div.notification.info.wrap");
        await expect(notify).toBeVisible();
    });

    await test.step('Select the Folder', async () => {
        const rowLocator: Locator = page.locator("//a[text()='" + folderName + "']/ancestor::div[@role='row']");
        await rowLocator.hover();
        const checkBox: Locator = rowLocator.locator("//input[@class='mousetrap']");
        await checkBox.click();
    });
    await test.step('Delete folder', async () => {
    await page.locator('//button[@data-resin-target="trash"]').click();
    });

    await test.step('Select okay from confirmation', async () => {
    await page.locator('//button//span[text()="Okay"]').click();
    });

    await test.step('Select account menu', async () => {
        await page.locator("//button[@data-resin-target='accountmenu']").click();        
    });
    await test.step('click on logout', async () => {
        await page.locator("a[href='/logout']").click();
               
    });
    await test.step('Verify Sign in page', async () => {
        await expect.soft(page.locator("div>h1")).toHaveText("Sign In to Your Account");       
    });
    await test.step('Close the page', async () => {
        await page.close();        
    });
});