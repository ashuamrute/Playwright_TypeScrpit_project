//getBy methods
//change default timeout period
//switchTo new page
//using iframe elements
//sleep
import { test, expect, Page } from '@playwright/test';

test('test', async ({ page }) => {
   
    // await page.getByRole('button', { name: 'Next' }).click();
     // Triples the test timeout (90 seconds by default)
    test.slow();//2,70,000
     // set timeout to 120 seconds
    // test.setTimeout(120 * 1000);
    await page.goto('https://account.box.com/login');
    await expect(page).toHaveTitle("Box | Login");
    await page.getByLabel('Email Address', { exact: true }).fill('qacult.demo@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Enter Your Password').pressSequentially('testing123');
    await page.getByRole('button', { name: 'Log In' }).click();
    //way to get a new page in a variable
   const page3Promise = page.waitForEvent('popup');
   await page.getByLabel('Notes').click();
   //switching to a new page
   const page3:Page = await page3Promise;
//    await page3.goto('https://app.box.com/notes/1642923457707');
   const frame =  page3.frameLocator('iframe[name="service_iframe"]');
   
   await frame.getByTestId('create-note-button').click();

   await page3.frameLocator('iframe[name="service_iframe"]').getByRole('textbox', { name: 'Add a Title' }).click();
   await page3.frameLocator('iframe[name="service_iframe"]').getByRole('textbox', { name: 'Add a Title' }).fill('test123');
   await page3.frameLocator('iframe[name="service_iframe"]').locator('#options-menu-editbar').getByRole('button').click();
   await page3.frameLocator('iframe[name="service_iframe"]').getByRole('menuitem', { name: 'Delete this note' }).click();
   await page3.frameLocator('iframe[name="service_iframe"]').getByLabel('Clear Notification').click();
   await page3.close();
   await page.getByLabel('Toggle account menu').click();
   await page.getByTestId('account-menu-logout').click();
   await new Promise(resolve => setTimeout(resolve, 3000));
   await page.close();
});