import { test, expect, request, APIRequestContext } from '@playwright/test';
import BookingData  from '../../testdata/bookingdata.json'


let reqContext3:APIRequestContext;
let bookingId:number;
let tokenId:string;

test.describe("End to End REST api Tests",{tag:"@matching"},async()=>{
test.beforeAll('creating request context for complete end to end request', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
     extraHTTPHeaders: {
    "accept": "application/json",
    "Content-Type":"application/json"
  }
  });
});

//npx playwright test -g "post_booking" --project=chromium
test('post_booking', async () => {
  const response = await reqContext3.post('/booking',{
    data:BookingData.postcalldata
  });
  const responseBody = await response.json();
  // console.log("Booking Created:\n "+JSON.stringify(responseBody));
  console.log("Booking Created:\n ");
  console.log(responseBody);
//   bookingId = responseBody.bookingid;
expect(responseBody.booking).toMatchObject(BookingData.postcalldata);

  expect(responseBody.booking.bookingdates.checkin).toEqual( BookingData.postcalldata.bookingdates.checkin);
});

});