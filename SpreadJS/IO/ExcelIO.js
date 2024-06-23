// var Spread = GC.Spread;
// var Sheets = Spread.Sheets;
// var workbook = new Sheets.Workbook('ss', { sheetCount: 3 });


var workbook, excelIO;
window.onload = function () {
      workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
      excelIO = new GC.Spread.Excel.IO();
}
function ImportFile() {
      console.log("import clicked")
      var excelFile = document.getElementById("fileDemo").files[0];
      excelIO.open(excelFile, function (json) {
            var workbookObj = json;
            workbook.fromJSON(workbookObj);
      }, function (e) {
            console.log(e);
      });
}
function ExportFile() {
      console.log("export clicked");
      var fileName = document.getElementById("exportFileName").value;
      if (fileName.substr(-5, 5) !== '.xlsx') {
            console.log("inside if ")
            alert("test");
            fileName += '.xlsx';
      }
      var json = JSON.stringify(workbook.toJSON());
      console.log(json)
      excelIO.save(json, function (blob) {
            saveAs(blob, fileName);
      }, function (e) {
            console.log(e);
      });
}

// function ExportFile()
// { 
// var fileName = document.getElementById("exportFileName").value; 
// if (fileName.substr(-5, 5) !== '.xlsx') 
// { fileName += '.xlsx'; } 
// workbook.save(sjs, function (blob)  {
//     saveAs(blob, fileName);
// }, function (e) { 
//     console.log(e);
// });}