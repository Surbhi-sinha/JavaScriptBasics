var Spread = GC.Spread;
var Sheets = Spread.Sheets;
var workbook = new Sheets.Workbook('ss', { sheetCount: 3 });

var activeSheet = workbook.getActiveSheet();

// using a new state rule
var activeSheet = workbook.getSheet(0);
var cfs = activeSheet.conditionalFormats;
var ruleType = Sheets.ConditionalFormatting.RuleType.rowStateRule;
var hoverstate = Sheets.RowColumnStates.hover;
var style = new Sheets.Style("yellow");
var ranges = [new Sheets.Range(-1, -1, -1, -1)];
var rule = new Sheets.ConditionalFormatting.StateRule(ruleType, hoverstate, style, ranges);
cfs.addRule(rule);



// Using a ConditionalFormat Class Methods
// var cfs1 = activeSheet.conditionalFormats; //property of the Worksheet.
// var style1 = new Sheets.Style("lightblue"); // creating new style.
// var columnRange = [new Sheets.Range(-1,-1,-1,-1)]; // creatinf new range.
// cfs1.addColumnStateRule(Sheets.RowColumnStates.hover , style1 , columnRange);//adding a column state(rowstate ,  style , range)
//RowColumnStates => hover , active ,  selected , dirty ,edit , updated , inserted , invalid
var cfs2 = activeSheet.conditionalFormats;
var style2 = new Sheets.Style("pink");
var rowRange2 = [new Sheets.Range(-1, -1, -1, -1)];
cfs2.addRowStateRule(Sheets.RowColumnStates.dirty, style2, rowRange2);//adding a row state

// Cell Buttons

// add a basic button with caption
var basicButtonStyle = new Sheets.Style();
basicButtonStyle.cellButtons = [
      {
            caption : 'Insert'
      }
]
activeSheet.setText(2, 3, "Basic button with caption");
activeSheet.setStyle(2, 4, basicButtonStyle);


buttonConfig1 = {
      caption: "left",
      enabled: true,
      buttonBackColor: "#174EA6",
      visibility: GC.Spread.Sheets.ButtonVisibility.always,
};
buttonConfig2 = {
      caption: "left",
      enabled: true,
      hoverBackColor: "#3390FF",
      visibility: GC.Spread.Sheets.ButtonVisibility.onSelected,
};
buttonConfig3 = {
      caption: "Cut",
      imageType: GC.Spread.Sheets.ButtonImageType.custom,
      useButtonStyle: true,
      imageSrc: "https://th.bing.com/th?id=OIP.iqP4hjZte3CkIlTQ_0wQqgHaJj&w=220&h=284&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", //This is not a complete base64 string
};

var customButtonStyle = new Sheets.Style();
customButtonStyle.cellButtons = [buttonConfig1 , buttonConfig2 , buttonConfig3];
activeSheet.setStyle(4,4,customButtonStyle);


// dropdown calculator
var dropdownStyleCommand =new Sheets.Style();
dropdownStyleCommand.cellButtons = [
      {
            imageType : Sheets.ButtonImageType.dropdown,
            useButtonStyle : true,
            command : "openCalculator"
      }
];
activeSheet.setText(2,5 , "Dropdown button with command");

activeSheet.setStyle(2,6 , dropdownStyleCommand);