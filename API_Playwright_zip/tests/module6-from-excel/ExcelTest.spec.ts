import { test, expect } from '@playwright/test';
import { readExcel } from '../../utils/excelUtils.ts'

// Define the type for your Excel data
type ApiPayloadRow = {
  name: string;
  job: string;
  // Add other columns as needed
};

test.use({
  extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1'
  }
});

test('API Tests using Excel Data',{tag:"@excel"}, async({ request }) => {
  const testData = readExcel('testdata/data1.xlsx') as ApiPayloadRow[]; // Make sure you have a data.xlsx file

  for (const data of testData) {
    console.log(data.name);
    console.log(data.job);
    const response = await request.post('https://reqres.in/api/users',{
    data:{
    "name":data.name,
    "job":data.job
    }
  });
  const responseBody = await response.json();
  console.log(responseBody);
}
});
