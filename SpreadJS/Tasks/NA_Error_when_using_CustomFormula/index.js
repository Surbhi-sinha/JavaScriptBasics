let Spread = GC.Spread;
let Sheets = Spread.Sheets;

let workbook = new Sheets.Workbook('ss' , {sheetCount : 3});

let activeSheet = workbook.getActiveSheet();
let sheet1 = workbook.getSheet(0);
let sheet2 = workbook.getSheet(1);
let sheet3 = workbook.getSheet(2);
sheet1.setValue(4,4,12);
sheet1.setValue(4,7 ,12);
sheet1.setValue(4,8 ,12);
for(let value = 0 ; value < 5 ; value++) {
      sheet1.setValue( value,0  , value+3);
}
for(let value = 0 ; value < 5 ; value++) {
      sheet2.setValue( value,5 , value+4);
}
for(let value = 0 ; value < 5 ; value++) {
      sheet3.setValue( value,6 , value+10);
}
sheet1.getCell(5,5).formula( "=SUMIF(Sheet1!A:A , E5 , Sheet2!F:F)" , true)
sheet1.getCell(5,6).formula( "=ROUND(IF(H5,(SUMIF(Sheet1!A:A,E5,Sheet2!F:F)+SUMIF(Sheet1!A:A,E5,Sheet2!F:F))/H5/I5,0),2)")

console.log(`Sheet1!A:A`)
console.log(sheet1.getCell(5,5).formula( "=SUMIF(Sheet1!A:A , E5 , Sheet2!F:F)" , true))


// getRange(0, 0, 1, 1)
sheet1.getRange(0,3,4,1).formula(`=SUMIF(Sheet1!A:A,">5",Sheet2!F:F`);