export class LoginPage 
{
    page: any;
    username: any;
    password: any;
    loginButton: any;
    HomePageIndetifier : any;
    ErrorMassgae :any;

    constructor(page:any){

        this.page = page
        this.username = page.getByPlaceholder('email@example.com')
        this.password = page.locator('#userPassword')
        this.loginButton = page.locator('#login')
        this.HomePageIndetifier = page.getByRole('button',{name:'HOME'})
        this.ErrorMassgae = page.locator('#toast-container')

    }
    async LaunchApp(url:string){
        await this.page.goto(url)
    }

    async validLogin(username:String,password:String){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await this.HomePageIndetifier.waitFor()
    }

    async InvalidLogin(username:String,password:String){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await this.ErrorMassgae.waitFor() 

    }

}
