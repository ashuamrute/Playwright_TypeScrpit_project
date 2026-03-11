//simplest GET request
//Behind the scenes, request fixture will actually call apiRequest.newContext().
// how to provide baseURL - 4 ways
//how to provide headers - 3 ways

import { test, expect, request, APIRequestContext } from '@playwright/test';

let reqContext3:APIRequestContext;
test.beforeAll('creating request context for test3', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://petstore.swagger.io',
     extraHTTPHeaders: {
    'api_key': 'special-key',
    'accept': 'application/json'
  }
  });

});

test('Validate a simple GET request', async ({ request }) => {
  // Make a GET request to a public API endpoint
  const response = await request.get('https://restful-booker.herokuapp.com/booking');

  // Assert that the response status is 200 (OK)
  expect(response.status()).toBe(200);

  // Parse the response body as JSON
  const responseBody = await response.json();
  console.log(responseBody);
let value:string;
for(let i=0;i<responseBody.length;i++){
    value = responseBody[i].bookingid;
    console.log(value);
    const containsNumber = /\d/.test(value);
    expect(containsNumber).toBe(true);
}

});

test('simple GET request with headers', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking',{
    headers:{
      'Accept': 'application/json'
    }
  });

  const responseBody = await response.json();
  console.log(responseBody);
});

//npx playwright test -g "test2" --project=chromium
test('test2', async () => {
  const reqContext:APIRequestContext = await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1'
  }
  });
  const response = await reqContext.get('/api/users?page=2');
  const responseBody = await response.json();
  console.log(responseBody);

});

//npx playwright test -g "test3" --project=chromium
test('test3', async () => {
  const response = await reqContext3.get('/v2/pet/1');
  const responseBody = await response.json();
  console.log(responseBody);

});

// baseURL defined in config.ts file
//npx playwright test -g "test4" --project=chromium
test('test4', async ({request}) => {
  const response = await request.get('/books?type=non-fiction');
  const responseBody = await response.json();
  console.log(responseBody);

});