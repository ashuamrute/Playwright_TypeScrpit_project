import { test, expect, request, APIRequestContext } from '@playwright/test';
import {XMLParser} from 'fast-xml-parser'
test.describe("Hybrid SOAP and REST api Tests",{tag:"@allFeatures"},async()=>{
test('SOAP API Request to get Country Capital Operation', async ({ request }) => {
  const soapEnvelope = `
   <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
      <sCountryISOCode>IN</sCountryISOCode>
    </FullCountryInfo>
  </soap:Body>
</soap:Envelope>
  `;

  const response = await request.post('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8'
    },
    data: soapEnvelope
  });

  const body = await response.text();
//   console.log(body); // You can parse this using fast-xml-parser
  expect(response.ok()).toBeTruthy();

  const parser = new XMLParser();
let jsonObj = parser.parse(body);

// console.log(JSON.stringify(jsonObj, null, 2));
const result=jsonObj["soap:Envelope"]["soap:Body"]["m:FullCountryInfoResponse"]["m:FullCountryInfoResult"]["m:sCapitalCity"];
console.log("The capital city is: "+result);
});

test('REST API POST Request to create new user', async () => {
  const reqContext:APIRequestContext = await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1'
  }
  });
  const response = await reqContext.post('/api/users',{
    data: {
    "name": "vijay",
    "job": "leader"
}
  });
  const responseBody = await response.json();
  console.log(responseBody);

});

});