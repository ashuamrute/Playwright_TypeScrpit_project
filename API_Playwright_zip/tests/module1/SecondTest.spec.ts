import { test, expect } from '@playwright/test';

test.use({
  extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1'
  }
});

test('Validate a second GET request', async ({ request }) => {
    
    const response = await request.get('https://reqres.in/api/users?page=2');
    const responseBody = await response.json();
  console.log(responseBody);
});