import { test, expect, request, APIRequestContext } from '@playwright/test';
import { BookingPayload} from '../../payloads/BookingPayload';


let reqContext3:APIRequestContext;
const bp = new BookingPayload("Rahul","Sharma",10000,true, "2026-01-01", "2026-01-04","Breakfast");
let bookingId:number;
let tokenId:string;

test.describe("End to End REST api Tests",{tag:"@allFeatures"},async()=>{
test.beforeAll('creating request context for complete end to end request', async()=>{
    reqContext3 = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
     extraHTTPHeaders: {
    "accept": "application/json",
    "Content-Type":"application/json"
  }
  });
});

//npx playwright test -g "test3" --project=chromium
test('post_booking', async () => {
  const response = await reqContext3.post('/booking',{
    data:{
    "firstname" : bp.getFirstName(),
    "lastname" : bp.getLastName(),
    "totalprice" : bp.getTotalPrice(),
    "depositpaid" : bp.getDepositPaid(),
    "bookingdates" : {
        "checkin" : bp.getCheckInDate(),
        "checkout" : bp.getCheckoutDate()
    },
    "additionalneeds" : bp.getAdditionalNeeds()
}
  });
  const responseBody = await response.json();
  // console.log("Booking Created:\n "+JSON.stringify(responseBody));
  console.log("Booking Created:\n ");
  console.log(responseBody);
  bookingId = responseBody.bookingid;

});

test('get booking', async () => {
    // console.log(bookingId);
    const response = await reqContext3.get(`/booking/${bookingId}`,{
    headers:{
        
    }
     });
    const responseBody = await response.json();
    console.log(responseBody);
     expect(response.ok()).toBeTruthy();
  
  });

test('generate token', async () => {
  const response = await reqContext3.post('/auth',{
    data:{
    "username":"admin",
    "password":"password123"
}
  });
  const responseBody = await response.json();
  console.log("Token Generated:\n ");
  console.log(responseBody);
  tokenId = responseBody.token;
  // console.log(tokenId);
});

test('partial update', async () => {
   const response = await reqContext3.patch(`/booking/${bookingId}`,{
    headers:{
        "Cookie": "token="+tokenId
    },
    data:{
    "firstname": "yash@magarpattaoffice"
}
     });
  const responseBody = await response.json();
  console.log(responseBody);
  
});


test('delete booking', async () => {
    // console.log(bookingId);
    const response = await reqContext3.delete(`/booking/${bookingId}`,{
    headers:{
         "Cookie": "token="+tokenId
    }
     });
    const responseStatus = response.status();
    console.log(responseStatus);
    //  expect(response.ok()).toBeTruthy();
  
  });

  });