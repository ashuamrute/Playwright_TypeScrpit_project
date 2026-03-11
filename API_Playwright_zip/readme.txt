Install playwright and then
For API project install these dependencies in package.json
npm install xlsx
npm install -D @types/xlsx # for TypeScript support
npm install fast-xml-parser
npm install -D allure-playwright --save-dev
npm install allure-commandline --save-dev

copy following folders
/payloads
/testdata
/tests
/utils

and replace playwright.config.ts