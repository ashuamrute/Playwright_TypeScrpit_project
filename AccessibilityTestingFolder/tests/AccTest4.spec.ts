import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import { writeFile } from 'fs/promises';
import { createHtmlReport } from 'axe-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

test.describe('bbc page', () => { // 2
  test('accessibility issues',{tag:"@access4"}, async ({ page },testInfo) => {
    await page.goto('https://bbc.co.uk'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();  // 4
    const timestamp: string = new Date().toISOString().replace(/[:.]/g, '-');

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });

      const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "YashHomepage"
      },
    });
    const filename:string = `accessibility-report-${timestamp}.html`;
        let newPath = __dirname.replace('tests', ''); // Normalize path for cross-platform compatibility
        newPath = path.join(newPath, 'build/reports'); // Ensure reports directory exist
        const filepath: string = path.join(newPath, filename);

        fs.writeFileSync(filepath, reportHTML);
        
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});