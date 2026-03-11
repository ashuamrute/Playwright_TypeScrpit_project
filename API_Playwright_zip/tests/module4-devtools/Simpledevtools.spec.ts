import { chromium, Request, Response } from 'playwright';
import { test, expect, request, APIRequestContext } from '@playwright/test';



let reqContext3: APIRequestContext;
const randomName = "APIFolder" + Math.floor(Math.random() * 9000) + 1000;
let accessToken: any;
test.describe("AccessToken from network tab and then create folder with API", { tag: "@integration" }, async () => {
  
  test('get access token from network', async ({},testInfo) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Listen to network requests
    page.on('request', (request: Request) => {
      console.log(`➡️ [${request.method()}] ${request.url()}`);
    });

    // Listen to network responses
    page.on('response', async (response: Response) => {
      const url = response.url();
      const status = response.status();
      console.log(`⬅️ [${status}] ${url}`);

      try {
        const body = await response.body();
        const responseBody = await response.json();
        console.log(`📦 Body (truncated): ${body.toString().slice(0, 100)}...`);

      } catch (error) {
        console.log(`⚠️ Error reading body from ${url}: ${error}`);
      }
    });

    await page.goto('https://playwright.dev/');
    
    await page.waitForTimeout(5000); // Wait to capture network activity

    await browser.close();
  });

 

});

