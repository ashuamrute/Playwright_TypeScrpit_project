import * as XLSX from 'xlsx';
import * as fs from 'fs';

export function readExcel(filePath: string): any[] {
    // Read the file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Parse the workbook
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Get the sheet data
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}

// Example usage
// const excelData = readExcel('data.xlsx');
// console.log(excelData);