

export class BookingPayload{
    private readonly firstName:string;
    private readonly lastName:string;
    private readonly totalprice:number;
    private readonly depositpaid:boolean;
    private readonly checkin:string;
    private readonly checkout:string;
    private readonly addneeds:string;
    private bookingId:string="";


    constructor(fn:string, ln:string, tp:number, dp:boolean, cin:string, cout:string, needs:string){
        this.firstName=fn;
        this.lastName=ln;
        this.totalprice=tp;
        this.depositpaid=dp;
        this.checkin=cin;
        this.checkout=cout;
        this.addneeds=needs;
    }

    getFirstName():string{
        return this.firstName;
    }

    getLastName():string{
        return this.lastName;
    }

    getTotalPrice():number{
        return this.totalprice;
    }

    getDepositPaid():boolean{
        return this.depositpaid;
    }

    getCheckInDate():string{
        return this.checkin;
    }

    getCheckoutDate():string{
        return this.checkout;
    }

    getAdditionalNeeds():string{
        return this.addneeds;
    }

    setBookingId(id:string):void{
        this.bookingId=id;
    }

    getBookingId():string{
        return this.bookingId;
    }
}