var Spread = GC.Spread;
var Sheets = Spread.Sheets;
var workbook = new Sheets.Workbook('ss', { sheetCount: 3 });


sheet1 = workbook.getSheet(0);
sheet1.setRowCount(3);
sheet1.setColumnCount(5);
sheet1.options.colHeaderAutoText = GC.Spread.Sheets.HeaderAutoText.blank;
sheet1.options.rowHeaderAutoText = GC.Spread.Sheets.HeaderAutoText.blank;
sheet1.setText(0, 0, "Row1", GC.Spread.Sheets.SheetArea.rowHeader);
sheet1.setText(1, 0, "Row2", GC.Spread.Sheets.SheetArea.rowHeader);
sheet1.setText(2, 0, "Row3", GC.Spread.Sheets.SheetArea.rowHeader);
sheet1.setText(0, 0, "Column1", GC.Spread.Sheets.SheetArea.colHeader);
sheet1.setText(0, 1, "Column2", GC.Spread.Sheets.SheetArea.colHeader);
sheet1.setText(0, 2, "Column3", GC.Spread.Sheets.SheetArea.colHeader);
sheet1.setText(0, 3, "Column4", GC.Spread.Sheets.SheetArea.colHeader);
sheet1.setText(0, 4, "Column5", GC.Spread.Sheets.SheetArea.colHeader);
sheet1.setText(0, 0, "SPREAD-1");
sheet1.setText(1, 0, "SPREAD-2");
sheet1.setText(2, 0, "SPREAD-3");
sheet1.setValue(0, 1, new Date().setFullYear(2006, 8, 1));
sheet1.setValue(1, 1, new Date().setFullYear(2006, 8, 2));
sheet1.setValue(2, 1, new Date().setFullYear(2006, 8, 3));
sheet1.setColumnWidth(1, 90);
sheet1.setValue(0, 2, 123.45);
sheet1.setValue(1, 2, 99.9999);
sheet1.setValue(2, 2, 100);
sheet1.setValue(0, 3, true);
sheet1.setValue(1, 3, false);
sheet1.setValue(2, 3, true);
sheet1.setValue(0, 4, "aaa");
sheet1.setValue(1, 4, "bbb");
sheet1.setValue(2, 4, "ccc");

var button1 = document.getElementById('button1');
button1.addEventListener('click',()=>{
      console.log("shdi")
      window.CSVString = workbook.getSheet(0).getCsv(0, 0, workbook.getSheet(0).getRowCount(), workbook.getSheet(0).getColumnCount(), "\r", ",");
})

var button2 = document.getElementById('button2');
button2.addEventListener('click',()=>{
      console.log("chil")
      workbook.getSheet(1).setCsv(0, 0, window.CSVString, "\r", ",");
})
