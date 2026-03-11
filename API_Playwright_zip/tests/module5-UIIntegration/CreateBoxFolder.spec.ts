import { test, expect, request, APIRequestContext } from '@playwright/test';



let reqContext3:APIRequestContext;
let accessToken:any;
const randomName = "APIFolder" + Math.floor(Math.random() * 9000) + 1000;


test.describe("UI automation with Box Create Folder api Tests",{tag:"@integration"},async()=>{

test.beforeAll('creating request context for Box Create folder request', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://api.box.com',
     extraHTTPHeaders: {
    "accept": "*/*",
    "Content-Type":"application/json"
  }
  });
});


test('Get access token from UI', async ({ page },testInfo) => {
   
    // await page.getByRole('button', { name: 'Next' }).click();
     // Triples the test timeout (90 seconds by default)
    // test.slow();//2,70,000
     // set timeout to 120 seconds
    // test.setTimeout(120 * 1000);
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
   
   if(await page.locator("//input[@name='devToken']").isVisible()){
    console.log("No need to click button, token directly available");
    const element  = page.locator("//input[@name='devToken']");
    accessToken = await element.getAttribute('value');
   }
   else{
    console.log("token available after clicking button");
    await page.locator("//button/span/span[text()='Generate Developer Token']").click();
    const element  = page.locator("//input[@name='devToken']");
    accessToken = await element.getAttribute('value');
   }
     const st = await page.screenshot();
      testInfo.attach('token generated and copied',{
        body: st,
        contentType: 'image/png',
      });
    console.log(accessToken);
    await page.close();
});

//npx playwright test -g "test3" --project=chromium
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