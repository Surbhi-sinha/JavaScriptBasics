let Spread = GC.Spread;
let Sheets = Spread.Sheets;
let workbook = new Sheets.Workbook("ss", { sheetCount: 3 });

var sheet = workbook.getActiveSheet();

sheet.setValue(0,0,12);
sheet.setValue(1,0,132);
sheet.setValue(2,0,172);
sheet.setValue(3,0,124);
sheet.setValue(4,0,1452);
sheet.setValue(0,1,12-50);
sheet.setValue(1,1,132-50);
sheet.setValue(2,1,172-50);
sheet.setValue(3,1,124-50);
sheet.setValue(4,1,1452-50);
// Assume you have some data in cells A1 to B5
sheet.setFormula(0, 2, 'SUMIF(A1:A5, "Nǐ hǎo", B1:B5)');
