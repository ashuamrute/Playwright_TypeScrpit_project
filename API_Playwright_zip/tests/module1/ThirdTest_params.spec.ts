import { test, expect, request, APIRequestContext } from '@playwright/test';

let reqContext3:APIRequestContext;
test.beforeAll('creating request context for test3', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1'
  }
  });
});

test('path params1', async () => {
    const response = await reqContext3.get('/api/users/2');
    const responseBody = await response.json();
    console.log(responseBody);
  
  });

  test('path params2', async ({request}) => {
    const userId = 1;
  const response = await request.get(`https://reqres.in/api/users/${userId}`,{
    headers:{
        'x-api-key': 'reqres-free-v1'
    }
  });
 const responseBody = await response.json();
    console.log(responseBody);
  expect(response.ok()).toBeTruthy();
  const user = await response.json();
  expect(user.data.id).toBe(userId);
  // Further assertions on user data
  
  });

  test('query params', async () => {
    const response = await reqContext3.get('/api/users',{
        params:{
            'page': 2,
            'per_page': 7
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
     expect(response.ok()).toBeTruthy();
  
  });