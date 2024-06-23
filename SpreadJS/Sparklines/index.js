var spread = new GC.Spread.Sheets.Workbook(document.getElementById('ss'), { sheetCount: 3 });
var activeSheet = spread.getActiveSheet();

// set data
activeSheet.addSpan(0, 0, 1, 5);
activeSheet.getCell(0, 0, GC.Spread.Sheets.SheetArea.viewport).value("Fortnightly sales analysis").font("20px Arial").hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center);
var table1 = activeSheet.tables.add("table1", 1, 0, 16, 5, GC.Spread.Sheets.Tables.TableThemes.medium3);
table1.filterButtonVisible(false);
activeSheet.setValue(1, 0, "Dates");
activeSheet.setValue(1, 1, "Sales($)");
activeSheet.setValue(1, 2, "Diagram 1");
activeSheet.setValue(1, 3, "Diagram 2");
activeSheet.setValue(1, 4, "Diagram 3");
activeSheet.getRange("A2:E2").hAlign(GC.Spread.Sheets.HorizontalAlign.center);

// set date
var now = new Date();
var daysOfYear = [];
for (var d = new Date(2021, 0, -1); d <= now; d.setDate(d.getDate() + 1)) {
    daysOfYear.push(new Date(d));
}
for (var i = 2; i < 17; i++) {
    activeSheet.setValue(i, 0, daysOfYear[i]);
}

// set values
activeSheet.getRange(-1, 0, -1, 1).formatter("dddd dd/mm/yyyy");
activeSheet.setValue(2, 1, 102800);
activeSheet.setValue(3, 1, 920234);
activeSheet.setValue(4, 1, 450235);
activeSheet.setValue(5, 1, 100786);
activeSheet.setValue(6, 1, 30594);
activeSheet.setValue(7, 1, 104355);
activeSheet.setValue(8, 1, 255476);
activeSheet.setValue(9, 1, 60345);
activeSheet.setValue(10, 1, 503453);
activeSheet.setValue(11, 1, 906843);
activeSheet.setValue(12, 1, 800399);
activeSheet.setValue(13, 1, 880824);
activeSheet.setValue(14, 1, 403895);
activeSheet.setValue(15, 1, 345802);
activeSheet.setValue(16, 1, 619000);

var data = new GC.Spread.Sheets.Range(2, 1, 15, 1);

// add setting for sparkline to be created
var setting = new GC.Spread.Sheets.Sparklines.SparklineSetting();
setting.options.showMarkers = true;
setting.options.lineWeight = 3;
setting.options.displayXAxis = true;
setting.options.showFirst = true;
setting.options.showLast = true;
setting.options.showLow = true;
setting.options.showHigh = true;
setting.options.showNegative = true;
setting.options.seriesColor = "Text 2 1";
setting.options.firstMarkerColor = "Text 2 3";
setting.options.negativeColor = "Accent 2 1";
setting.options.markersColor = "Accent 3 1";
setting.options.lowMarkerColor = "Accent 4 1";
setting.options.highMarkerColor = "Accent 6 1";
setting.options.lastMarkerColor = "Accent 6 6";
setting.options.axisColor = "Text 1 1";

// LINESPARKLINE
activeSheet.setSparkline(2, 2, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.line
    , setting
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
);
// COLUMNSPARKLINE
activeSheet.setSparkline(2, 3, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.column
    , setting
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
);
// WINLOSSSPARKLINE
activeSheet.setSparkline(2, 4, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.winloss
    , setting
    , GC.Spread.Sheets.Sparklines.DataOrientation.vertical
);



activeSheet = spread.setActiveSheet('Sheet2')
activeSheet.setValue(0, 0, "Data Range is A2-A9");
activeSheet.setValue(1, 0, 1);
activeSheet.setValue(2, 0, -2);
activeSheet.setValue(3, 0, -1);
activeSheet.setValue(4, 0, 6);
activeSheet.setValue(5, 0, 4);
activeSheet.setValue(6, 0, -4);
activeSheet.setValue(7, 0, 3);
activeSheet.setValue(8, 0, 8);
activeSheet.setValue(0, 2, "Date axis range is C2-C9");
activeSheet.setValue(1, 2, '2011/1/5');
activeSheet.setValue(2, 2, '2011/1/1');
activeSheet.setValue(3, 2, '2011/2/11');
activeSheet.setValue(4, 2, '2011/3/1');
activeSheet.setValue(5, 2, '2011/2/1');
activeSheet.setValue(6, 2, '2011/2/3');
activeSheet.setValue(7, 2, '2011/3/6');
activeSheet.setValue(8, 2, '2011/2/19');
var data = new GC.Spread.Sheets.Range(1, 0, 8, 1);
var dateAxis = new GC.Spread.Sheets.Range(1, 2, 8, 1);
var setting = new GC.Spread.Sheets.Sparklines.SparklineSetting();
setting.options.showMarkers = true;
setting.options.lineWeight = 3;
setting.options.displayXAxis = true;
setting.options.showFirst = true;
setting.options.showLast = true;
setting.options.showLow = true;
setting.options.showHigh = true;
setting.options.showNegative = true;
setting.options.seriesColor = "Text 2 1";
setting.options.firstMarkerColor = "Text 2 3";
setting.options.negativeColor = "Accent 2 1";
setting.options.markersColor = "Accent 3 1";
setting.options.lowMarkerColor = "Accent 4 1";
setting.options.highMarkerColor = "Accent 6 1";
setting.options.lastMarkerColor = "Accent 6 6";
setting.options.axisColor = "Text 1 1";
activeSheet.addSpan(11, 0, 1, 3, null)
activeSheet.setText(11, 0, "Sparkline with dateAxis:", null);
activeSheet.setText(12, 0, "(1) Line", null);
activeSheet.setText(12, 3, "(2)Column", null);
activeSheet.setText(12, 6, "(3)Winloss", null);
//line
activeSheet.addSpan(14, 0, 4, 3, null);
activeSheet.setSparkline(14, 0, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.line
    , setting
    , dateAxis
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
);
//column
activeSheet.addSpan(14, 3, 4, 3, null);
activeSheet.setSparkline(14, 3, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.column
    , setting
    , dateAxis
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
);
//winloss
activeSheet.addSpan(14, 6, 4, 3, null);
activeSheet.setSparkline(14, 6, data
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
    , GC.Spread.Sheets.Sparklines.SparklineType.winloss
    , setting
    , dateAxis
    , GC.Spread.Sheets.Sparklines.DataOrientation.Vertical
);



// initializing Spread
var spread = new GC.Spread.Sheets.Workbook(document.getElementById('ss'), { sheetCount: 1 });
// get the activesheet
var activeSheet = spread.getSheet(0);

activeSheet.setValue(0, 0, .3);
activeSheet.setValue(1, 0, -0.3);
activeSheet.setValue(2, 0, 2);

activeSheet.setFormula(0, 1, '=HBARSPARKLINE(A1,"red", FALSE, 0.5)');
activeSheet.setFormula(1, 1, '=HBARSPARKLINE(A2,"blue")');
activeSheet.setFormula(2, 1, '=HBARSPARKLINE(A3,"green", TRUE, A3)');

for (var i = 0; i < 4; i++) {
  activeSheet.setRowHeight(i, 40);
}
activeSheet.setColumnWidth(0, 80);
activeSheet.setColumnWidth(1, 200);