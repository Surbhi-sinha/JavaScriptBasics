class Chair{
      constructor(color ,seatHeight, recliningAngle , backSupport , headSupport , padding , armRest,seatSize , isHeightAdjustable , isMovable){
            this.color = color;
            this.seatSize = seatSize;
            this.recliningAngle = recliningAngle;
            this.backSupport = backSupport;
            this.headSupport = headSupport;
            this.padding = padding;
            this.armRest = armRest;
            this.seatHeight = seatHeight;
            this.isHeightAdjustable = isHeightAdjustable;
            this.isMovable = isMovable;
      }
      adjustableHeight(){};
      adjustAngle(){};
      moveChair(){};
}

const newChair = new Chair("blue" , 20 , 30, "20 deg" , true , false , 20 , 21 , false , true);
console.dir("chair Prototype" , Chair);
console.log("Chair Object" , newChair);

// abstract functions and inheritance
class OfficeChair extends Chair{
      constructor(color , isHeightAdjustable , seatHeight , recliningAngle){
            super();
            this.type = "Office Chair";
            this.color = color;
            this.isHeightAdjustable = isHeightAdjustable;
            this.seatHeight = seatHeight;
            this.recliningAngle = recliningAngle;
      }

      adjustableHeight (height){
            if(height > this.seatHeight){
                  console.log(`Chair height changed to ${height}`);
            }else{
                  console.log(`Height cannot be decreased more than the seat height ${this.seatHeight}`)
            }
      }
      moveChair(X,Y){
            console.log(`Chair moved to co-ordinates = (${X},${Y})`)
      }
}

//STATIC KEYWORD IN js
// the static keyword in js helps us define functions and properties in the class that cannot be called buy the instance of the object.