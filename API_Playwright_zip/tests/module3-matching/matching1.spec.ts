import { test, expect, request, APIRequestContext } from '@playwright/test';
import { BookingPayload} from '../../payloads/BookingPayload';


let reqContext3:APIRequestContext;
const bp = new BookingPayload("Rahul","Sharma",10000,true, "2026-01-01", "2026-01-04","Breakfast");
// let bookingId:number;
// let tokenId:string;

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
//   bookingId = responseBody.bookingid;
expect(responseBody.booking).toMatchObject({
    firstname: 'Rahul',
    lastname: 'Sharma',
    totalprice: 10000,
    depositpaid: true,
    bookingdates: { checkin: '2026-01-01', checkout: '2026-01-04' },
    additionalneeds: 'Breakfast'
  });

  expect(responseBody.booking.bookingdates.checkin).toEqual( "2026-01-01");
});

});