var Spread = GC.Spread;
var Sheets = Spread.Sheets;
var workbook = new Sheets.Workbook('ss', { sheetCount: 2 });

var sheet = workbook.getActiveSheet();

var style = new Sheets.Style();

function TwoCornerFoldCellType() {
      GC.Spread.Sheets.CellTypes.Base.apply(this, arguments);
      // this.color = "orange";
      this.color1 = "blue";
      this.color2 = "red";
      // this.fillStyle = "blue";
      this.size = 10;
}

TwoCornerFoldCellType.prototype = new Sheets.CellTypes.Base();

function drawTriDiag(ctx,a1,a2,a3, b1,b2,b3 ,color){
    ctx.beginPath();
    ctx.moveTo(a2,b2);
    ctx.lineTo(a3,b3);
    ctx.lineTo(a1,b1);
    ctx.closePath();
    ctx.fillStyle = color
    ctx.fill();
}
TwoCornerFoldCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    if (!ctx) {
        return;
    }
    ctx.save();
    // draw inside the cell's boundary
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.beginPath();

//     ctx.fillStyle = this.fillStyle;
        
    var size = this.size;
    //bottom left cornerfold
    var a1 = x , b1 = (y+2.5*h/4);
    var a2 = x,b2 = y+h;
    var a3 = (x+w/8) , b3 = y+h;
    drawTriDiag(ctx , a1,a2,a3,b1,b2,b3 , this.color1);

    //top right cornerfold
    var a4 = x+7*w/8 , b4 = y;
    var a5 = x+w , b5 = y;
    var a6 = x+w , b6 = y+2*h/5;
    drawTriDiag(ctx,a4,a5,a6,b4,b5,b6 , this.color2);

  
    ctx.restore();
};

TwoCornerFoldCellType.prototype
sheet.bind(GC.Spread.Sheets.Events.CellClick, function (sender, args) {
      console.log("Clicked column index: " + args.col);
      console.log("Clicked row index: " + args.row);
  });


sheet.bind(GC.Spread.Sheets.Events.CellChanged, function (e, info) {
      if(info.sheetArea === GC.Spread.Sheets.SheetArea.viewport){
          console.log("Cell index (" + info.row + "," + info.col + ")");
      }
  });  
TwoCornerFoldCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
      var xm = cellRect.x + cellRect.width / 2,
          ym = cellRect.y + cellRect.height / 2,
          size = 10;
      var info = { x: x, y: y, row: context.row, col: context.col, cellRect: cellRect, sheetArea: context.sheetArea };
      if (xm - size <= x && x <= xm + size && ym - size <= y && y <= ym + size) {
          info.isReservedLocation = true;
      }
      return info;
  };

TwoCornerFoldCellType.prototype.activateEditor = function(editorContext){
      if(editorContext ){
            var span1 = editorContext.children[0];
            console.log(span1);
      }
}

var cellType = new GC.Spread.Sheets.CellTypes.Corner();
sheet.getCell(2,0).cellType(cellType)
sheet.getCell(1, 1).cellType(new TwoCornerFoldCellType());


style.decoration = {
      cornerFold: {
            size: 8,
            position: 6,
            color: "black"
      }
}
sheet.setStyle(5, 5, style);