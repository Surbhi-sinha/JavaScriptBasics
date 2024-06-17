let Spread = GC.Spread;
let Sheets = Spread.Sheets;
let workbook =  new Sheets.Workbook('ss' , {sheetCount : 2});

let activeSheet = workbook.getActiveSheet();
// activeSheet.tables.add("table1" ,0, 0 , 3,5, Sheets.Tables.TableThemes.dark1)

var table = activeSheet.tables.add("table1", 1, 1, 4, 4, GC.Spread.Sheets.Tables.TableThemes.light1);

// Enable table's footer using showFooter method
table.showFooter(true);

// Enable table's useFooterDropDownList to true
table.useFooterDropDownList(true);
// table.showResizeHandle(true);
activeSheet.getCell(1, 1).text("First Name");
activeSheet.getCell(1, 2).text("Last Name");
activeSheet.getCell(1, 3).text("Score");
activeSheet.getCell(1, 4).text("Position");
activeSheet.getCell(2, 1).text("Alexa");
activeSheet.getCell(2, 2).text("Wilder");
activeSheet.getCell(2, 3).text("90");
activeSheet.getCell(2, 4).text("Web Developer");
activeSheet.getCell(3, 1).text("Victor");
activeSheet.getCell(3, 2).text("Wooten");
activeSheet.getCell(3, 3).text("70");
activeSheet.getCell(3, 4).text(".NET Developer");
activeSheet.getCell(4, 1).text("Ifeoma");
activeSheet.getCell(4, 2).text("Mays");
activeSheet.getCell(4, 3).text("85");
activeSheet.getCell(4, 4).text("Sales Manager");
for (var i = 0; i < 3; i++)
      activeSheet.setColumnWidth(i, 90.0, GC.Spread.Sheets.SheetArea.viewport);
      activeSheet.setColumnWidth(4, 120);



//create a table
datas = [
      ["1", "NewYork", "1968/6/8", "80", "180"],
      ["4", "NewYork", "1972/7/3", "72", "168"],
      ["4", "NewYork", "1964/3/2", "71", "179"],
      ["5", "Washington", "1972/8/8","80", "171"],
      ["6", "Washington", "1986/2/2", "89", "161"],
      ["7", "Washington", "2012/2/15", "71", "240"]
  ];
  var table = activeSheet.tables.addFromDataSource("table2", 10, 10, datas);
  dataColumns = ["Name", "City", "Birthday", "Weight", "Height"];
  table.setColumnName(0, dataColumns[0]);
  table.setColumnName(1, dataColumns[1]);
  table.setColumnName(2, dataColumns[2]);
  table.setColumnName(3, dataColumns[3]);
  table.setColumnName(4, dataColumns[4]);
  
  //add a slicer to the sheet and return the slicer instance.
  var slicer = activeSheet.slicers.add("slicer1",table.name(),"Name");
  //change the slicer properties.
  slicer.width(200);
  slicer.height(200);
  slicer.position(new GC.Spread.Sheets.Point(100, 200));
  slicer.style(GC.Spread.Sheets.Slicers.SlicerStyles.dark4());


 // sheet2     

var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"),{sheetCount:3});
var activeSheet2 = spread.getActiveSheet();
        
// Add data
 for (var col = 1; col < 6; col++) {
     for (var row = 2; row < 11; row++) {
        activeSheet2.setValue(row, col, row + col);
     }
 }
var tableStyle = new Sheets.Tables.TableTheme();
var thinBorder = new Sheets.LineBorder("black", Sheets.LineStyle.dotted);
tableStyle.wholeTableStyle(new Sheets.Tables.TableStyle("aliceblue", "green", "bold 10pt arial", thinBorder, thinBorder, thinBorder, thinBorder, thinBorder, thinBorder, GC.Spread.Sheets.TextDecorationType.none));
 
var tStyleInfo = new GC.Spread.Sheets.Tables.TableStyle();
tStyleInfo.backColor = "green";
tStyleInfo.foreColor = "red";
tStyleInfo.borderBottom = new Sheets.LineBorder("green", Sheets.LineStyle.thin);
tStyleInfo.borderLeft = new Sheets.LineBorder("yellow", Sheets.LineStyle.medium);
tStyleInfo.borderTop = new Sheets.LineBorder("green", Sheets.LineStyle.thin);
tStyleInfo.borderRight = new Sheets.LineBorder("green", Sheets.LineStyle.thin);
tStyleInfo.font = "bold 11pt arial";
tableStyle.footerRowStyle(tStyleInfo);
var sTable = activeSheet2.tables.add("Custom", 1, 1, 10, 5, tableStyle);
sTable.showFooter(true);

// Set footer value
sTable.setColumnValue(0, "Total");

// Set footer formula
sTable.setColumnFormula(4, "SUM(F3:F11)");