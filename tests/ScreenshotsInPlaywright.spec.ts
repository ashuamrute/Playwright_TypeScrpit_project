import test, { expect } from "@playwright/test";

test('Screenshot in playwright',async ({page})=>{
    await page.goto('https://app.box.com');
    await expect(page).toHaveTitle('Box | Login');
    // Elemenet screenshot
    await page.locator('.login-container').screenshot({path:'./images/Screenshots/ElementScreenshot.png'});

    // Page screenshot
    await page.screenshot({path:'./images/Screenshots/PageScreenshot.png'});

    // Full page Screenshot
    await page.screenshot({path:'./images/Screenshots/FullPageScreenshot.png', fullPage:true});

    await page.close();
})