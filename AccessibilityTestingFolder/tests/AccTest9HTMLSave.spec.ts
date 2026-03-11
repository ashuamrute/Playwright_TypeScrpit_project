import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import * as fs from 'fs';
import * as path from 'path';
import { createHtmlReport } from 'axe-html-reporter';

test('has title',{tag:"@access9"}, async ({ page }) => {
  await page.goto('https://playwright.dev/');
   const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();  // 4


const timestamp: string = new Date().toISOString().replace(/[:.]/g, '-');

      const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "PlaywrightHomepage"
      },
    });
    
    const filename:string = `accessibility-report-${timestamp}.html`;
    console.log(`File Name: ${filename}`);
    let newPath = __dirname.replace('tests', ''); // Normalize path for cross-platform compatibility
    console.log(`New Path: ${newPath}`);
    newPath = path.join(newPath, 'build/reports'); // Ensure reports directory exist
    console.log(`New Path: ${newPath}`);
    const filepath: string = path.join(newPath, filename);
    console.log(`File Path: ${filepath}`);
    
    fs.writeFileSync(filepath, reportHTML);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


