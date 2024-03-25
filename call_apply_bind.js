// call
function Car(type, fuelType) {
      this.type = type;
      this.fuelType = fuelType;
}
// function setBrand(brand) {
//       Car.call(this, "convertible", "petrol");
//       this.brand = brand;
//       console.log("car details = ", this);
// }
// function definePrice(price) {
//       Car.call(this, "convertible", "diesel");
//       this.price = price;
//       console.log("car price = ", this);
// }
var newBrand = new setBrand("brand1");
var newCarPrice = new definePrice(13213213);

console.log(newBrand, newCarPrice);

// apply
// apply function is very similar to the call function the difference is only that in the apply function is that we can pass an array as arguement;

//syntax = func.apply(thisObj , arguementArray);

// thisObj = is the object or value that need to be replaced
// arguementArray = array od the arguement,arrayobj or the arguement keywork itself.


//array arguements can be passed by 3 methods:-
// 1. func.apply(thisObj , [args1 , arge2 , args3 , ...])
// 2. func.apply(thisObj , new Array(args1 , args2));
// 3. func.apply(thisObj , arguements);

function setBrand(brand) {
      Car.call(this, ["convertible", "petrol"]);
      this.brand = brand;
      console.log("car details from the apply = ", this);
}
function definePrice(price) {
      Car.call(this, new Array("convertible", "diesel"));
      this.price = price;
      console.log("car price from the apply function = ", this);
}

// how to use the Arguement function 

function addUp(){
      const args = Array.from(arguments);
      this.x = args.reduce((prev , curr) => prev+curr , 0);
      console.log("this.x = ",this.x);
}

function driverFunction(){
      const obj = {
            inps :[1,2,3,4,5]
      }
      addUp.apply(obj , obj.inps);
}
driverFunction();

// Bind function
// Bind function creates a copy of a function with a new value to the this present inside the calling function.
// func.bind(thisObj , arg1 , arg2 , arg3 ,... , argN);

//func = function that need to be invoked with a different this object.
// thisObj = the object or value needs to be replaced with the this keyword present inside the function func;
// args1 , arg2 , arg3 ... can be one args

// the bind function then returns a new function that consists of a new context to this variable present inside the calling function

