import { test, expect, request, APIRequestContext } from '@playwright/test';



let reqContext3:APIRequestContext;


test.describe("End to End REST api Tests",{tag:"@matching2"},async()=>{
test.beforeAll('creating request context for complete end to end request', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://api.demoblaze.com',
     extraHTTPHeaders: {
    "accept": "application/json",
    "Content-Type":"application/json"
  }
  });
});

//npx playwright test -g "test3" --project=chromium
test('post_booking', async () => {
  const response = await reqContext3.post('/addtocart',{
    data:{"id":"98970f67-f2e2-65b4-6191-5b5c6b5b1f16",
        "cookie":"user=af4320ca-7304-66ae-0cdd-8f940fa15803",
        "prod_id":2,
        "flag":false
    }
  });
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
});

});