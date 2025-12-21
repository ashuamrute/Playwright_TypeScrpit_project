import test, { chromium, firefox, webkit } from "@playwright/test";

test('Create a fixture to launch chromium',async ()=>{
    const browser = await chromium.launch({
        headless:false
    });
    const bContext = await browser.newContext();
    const page = await bContext.newPage();
    await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

// Firefox 
test('Create a fixture firefox',async ()=>{
    const browser = await firefox.launch({
        headless:false
    });
    const bContext = await browser.newContext();
    const page = await bContext.newPage();
    await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

// Webkit

 
test('Create a fixture webkit',async ()=>{
    const browser = await webkit.launch({
        headless:false
    });
    const bContext = await browser.newContext();
    const page = await bContext.newPage();
    await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

test('Browser fixture', async({browser})=>{
const bContext = await browser.newContext();   
const page = await bContext.newPage();
await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

test('Context fixture', async({context})=>{
const page = await context.newPage();
await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

test('Page fixture', async({page})=>{
await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(title);
    await page.close();
});

test('BrowserName fixture', async ({browserName})=>{
    let browser:any = null;

    if(browserName =='chromium'){
        browser = await chromium.launch({headless:false});
    } else if(browserName =='firefox'){
        browser = await firefox.launch({headless:false});
    } else if(browserName =='webkit'){
        browser = await webkit.launch({headless:false});
    }else if(browserName =='MSEdge'){
        browser = await chromium.launch({headless:false, 
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});
    }
    const context = await browser.newContext();
    const page = await context.newPage();
   
    await page.goto("https://app.box.com");
    const title= await page.title();
    console.log(`Title in ${browserName}: ${title}`);
    await page.close();
    await browser.close();
});
