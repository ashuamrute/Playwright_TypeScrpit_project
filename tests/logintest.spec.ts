import test, { expect, Locator } from "@playwright/test";

test("Login to app Box app", async ({page})=>{
    await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    const email:Locator =page.locator("id=login-email");
    await email.fill("ashishamrute28@gmail.com");
    // await page.locator("id=login-email").fill('ashishamrute28@gmail.com');
    await page.locator("id=login-submit").click();
    await page.locator("id=password-login").fill("Ashish@1986");
    await page.locator("id=login-submit-password").click();
    await page.locator("//button[@data-resin-target='accountmenu']").click();
    await page.locator("a[href='/logout']").click();
    // const text=await page.locator("//*[text()='Box Blog']").innerText();
    await expect(page.locator("//*[text()='Box Blog']")).toHaveText('Box Blog');
    await page.close();

});

