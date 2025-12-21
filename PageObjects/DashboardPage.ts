export class DashboardPage {

    page: any;
    productslist: any
    successConfirm: any
    cartCount: any
    addtocartBtn: any
    ProductDisplay: any

    constructor(page: any) {
        this.page = page
        this.productslist = page.locator('div.card-body')
        this.successConfirm = page.locator('#toast-container');
        this.cartCount = page.locator('button.btn-custom label')
        this.addtocartBtn = page.getByRole('button', { name: 'Add to Cart' })
        this.ProductDisplay = page.locator('div h2')
    }

    async SearchProduct(Productname: string) {
        const Count = await this.productslist.count()
        for (let i = 0; i < Count; i++) {
            const Product = await this.productslist.nth(i).locator('b').textContent()
            if (Product === Productname) {
                await this.productslist.nth(i).getByRole('button', { name: ' Add to cart' }).click()
                break
            }
        }
        await this.successConfirm.waitFor()
    }

    async SearchandViewProduct(Productname: string) {
        const Count = await this.productslist.count()
        for (let i = 0; i < Count; i++) {
            const Product = await this.productslist.nth(i).locator('b').textContent()
            if (Product === Productname) {
                await this.productslist.nth(i).getByRole('button', { name: ' View' }).click()
                break
            }
        }

    }


}
