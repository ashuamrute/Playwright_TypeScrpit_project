import { test, expect, request } from '@playwright/test';
import {XMLParser} from 'fast-xml-parser'

test.describe("All SOAP API Tests",{tag:"@allFeatures"},async()=>{
test('SOAP Add Operation', async ({ request }) => {
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Add xmlns="http://tempuri.org/">
          <intA>100</intA>
          <intB>200</intB>
        </Add>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await request.post('http://www.dneonline.com/calculator.asmx', {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/Add'
    },
    data: soapEnvelope
  });

  const body = await response.text();
//   console.log(body); // You can parse this using fast-xml-parser
  expect(response.ok()).toBeTruthy();

  const parser = new XMLParser();
let jsonObj = parser.parse(body);

// console.log(JSON.stringify(jsonObj, null, 2));
const result=jsonObj["soap:Envelope"]["soap:Body"].AddResponse.AddResult;
console.log("The result of addition is: "+result);
});


test('SOAP Subtract Operation', async ({ request }) => {
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Subtract xmlns="http://tempuri.org/">
            <intA>500</intA>
            <intB>300</intB>
        </Subtract>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await request.post('http://www.dneonline.com/calculator.asmx', {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/Subtract'
    },
    data: soapEnvelope
  });

  const body = await response.text();
//   console.log(body); // You can parse this using fast-xml-parser
  expect(response.ok()).toBeTruthy();

  const parser = new XMLParser();
let jsonObj = parser.parse(body);

//console.log(JSON.stringify(jsonObj, null, 2));
const result=jsonObj["soap:Envelope"]["soap:Body"].SubtractResponse.SubtractResult;
console.log("The result of subtraction is: "+result);
});

test('SOAP Multiply Operation', async ({ request }) => {
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
         <Multiply xmlns="http://tempuri.org/">
      <intA>100</intA>
      <intB>6</intB>
    </Multiply>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await request.post('http://www.dneonline.com/calculator.asmx', {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/Multiply'
    },
    data: soapEnvelope
  });

  const body = await response.text();
//   console.log(body); // You can parse this using fast-xml-parser
  expect(response.ok()).toBeTruthy();

  const parser = new XMLParser();
let jsonObj = parser.parse(body);

// console.log(JSON.stringify(jsonObj, null, 2));
const result=jsonObj["soap:Envelope"]["soap:Body"].MultiplyResponse.MultiplyResult;
console.log("The result of multiplication is: "+result);
});

test('SOAP division Operation', async ({ request }) => {
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
         <Divide  xmlns="http://tempuri.org/">
      <intA>900</intA>
      <intB>9</intB>
    </Divide>
      </soap:Body>
    </soap:Envelope>
  `;

  const response = await request.post('http://www.dneonline.com/calculator.asmx', {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/Divide'
    },
    data: soapEnvelope
  });

  const body = await response.text();
//   console.log(body); // You can parse this using fast-xml-parser
  expect(response.ok()).toBeTruthy();

  const parser = new XMLParser();
let jsonObj = parser.parse(body);

// console.log(JSON.stringify(jsonObj, null, 2));
const result=jsonObj["soap:Envelope"]["soap:Body"].DivideResponse.DivideResult;
console.log("The result of division is: "+result);
});

});