var Spread = GC.Spread;
var Sheets = Spread.Sheets;
var workbook = new Sheets.Workbook('ss', { sheetCount: 3 });


// workbook.savePDF(function (blob) {
//       var fileName = $('#fileName').val() || 'download';
//       saveAs(blob, fileName + '.pdf');
//   }, function (error) {
//       console.log(error);
//   }, {
//       title: 'Test Title',
//       author: 'Test Author',
//       subject: 'Test Subject',
//       keywords: 'Test Keywords',
//       creator: 'test Creator'
//   });

var sheet = workbook.getSheet(0);
var printInfo = sheet.printInfo();
printInfo.showGridLine(false);
printInfo.showRowHeader(GC.Spread.Sheets.Print.PrintVisibilityType.show);
printInfo.showColumnHeader(GC.Spread.Sheets.Print.PrintVisibilityType.show);

var activeSheet = workbook.getSheet(0);

var dataArray = [
    ["", '2012', '2013', '2014', '2015', '2016', '2017'],
    ["Chrome", 0.3782, 0.4663, 0.4966, 0.5689, 0.6230, 0.6360],
    ["FireFox", 0.2284, 0.2030, 0.1801, 0.1560, 0.1531, 0.1304],
    ["IE", 0.3214, 0.2491, 0.2455, 0.1652, 0.1073, 0.0834],
];
activeSheet.setArray(0, 0, dataArray);

var chart = activeSheet.charts.add('line', GC.Spread.Sheets.Charts.ChartType.bar, 0, 100, 400, 300, 'A1:D4')
var legend = chart.legend();
legend.visible = true;
chart.legend(legend);
chart.title({ text: "Bar Chart" });

// print to PDF in black & white
var printInfo = new GC.Spread.Sheets.Print.PrintInfo();
printInfo.blackAndWhite(true);
printInfo.savePDF = true;
activeSheet.printInfo(printInfo);
spread.print(0);