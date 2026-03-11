import { chromium, Request, Response } from 'playwright';
import { test, expect, request, APIRequestContext } from '@playwright/test';



let reqContext3: APIRequestContext;
const randomName = "APIFolder" + Math.floor(Math.random() * 9000) + 1000;
let accessToken: any;
test.describe("AccessToken from network tab and then create folder with API", { tag: "@integration" }, async () => {
  
  test.beforeAll('creating request context for Box Create folder request', async()=>{
      reqContext3 = await request.newContext({
      baseURL: 'https://api.box.com',
       extraHTTPHeaders: {
      "accept": "*/*",
      "Content-Type":"application/json"
    }
    });
  });
  
  test('get access token from network', async ({},testInfo) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Listen to network requests
    page.on('request', (request: Request) => {
      // console.log(`➡️ [${request.method()}] ${request.url()}`);
    });

    // Listen to network responses
    page.on('response', async (response: Response) => {
      const url = response.url();
      const status = response.status();
      // console.log(`⬅️ [${status}] ${url}`);

      try {
        const body = await response.body();
        const responseBody = await response.json();
        if (url == 'https://app.box.com/index.php?rm=dev_console_generate_devtoken') {
          accessToken = responseBody.data.devToken.token;
          console.log("token: " + accessToken);
        }
        // console.log(`📦 Body (truncated): ${body.toString().slice(0, 100)}...`);

      } catch (error) {
        // console.log(`⚠️ Error reading body from ${url}: ${error}`);
      }
    });

    await page.goto('https://account.box.com/login');
    await expect(page).toHaveTitle("Box | Login");
    await page.getByLabel('Email Address', { exact: true }).fill('pfighter@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Enter Your Password').pressSequentially('axa12345');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.locator("//span[text()='Dev Console']").click();
    await page.locator("//span[contains(@class,'CollapsibleSidebarMenuItem')]/span[text()='My Platform Apps']").click();
    await page.locator("//div[text()='IgorAccountActualApp']").click();
    await page.locator("//div/span[text()='Configuration']").click();
    if (await page.locator("//input[@name='devToken']").isVisible()) {
      await page.locator("//button[.='Revoke']").click();
      await page.locator("//button[.='Revoke'][contains(@class,'devcon-btn-delete')]").click();
      const ss = await page.screenshot();
      testInfo.attach('revoked',{
        body: ss,
        contentType: 'image/png',
      });
    }
    await page.locator("//button/span/span[text()='Generate Developer Token']").click();
    const st = await page.screenshot();
      testInfo.attach('token generated',{
        body: st,
        contentType: 'image/png',
      });
    await page.waitForTimeout(5000); // Wait to capture network activity

    await browser.close();
  });

  test('post_folder', async () => {
    const response = await reqContext3.post('/2.0/folders',{
      headers:{
          "Authorization": 'Bearer '+accessToken
      },
      data:{
    "name": randomName,
    "parent": {
      "id": "0"
    }
  }
    });
   const responseBody = await response.json();
  
    console.log("Folder Created:\n ");
    console.log(responseBody);
   expect(response.status()).toBe(201);
  });

});

