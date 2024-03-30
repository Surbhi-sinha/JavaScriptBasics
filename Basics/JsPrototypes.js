function vehicle(vehicleType){ // vehicle constructor
      this.vehicleType = vehicleType;
}
vehicle.prototype.canMove = function(){
      console.log("I am moving");
}
vehicle.prototype.canStop = function(){
      console.log("I am stopping");
}
vehicle.prototype.canTake = function(){
      console.log("I am taking passengers");
}


function Bus(make){
      vehicle.call(this,"bus");
      this.make = make;
}
Bus.prototype = Object.create(vehicle.prototype);
Bus.prototype.noOfWheels = 6;
Bus.prototype.accelarator = function(){
      console.log("Bus is accelarating");
}
Bus.prototype.brake = function(){
      console.log("Bus is stopping");
}


function Car(make){
      vehicle.call(this , "car");
      this.make = make;
}
Car.prototype = Object.create(vehicle.prototype);
Car.prototype.noOfWheels = 4;
Car.prototype.accelarator = function(){
      console.log("Car is accelarating");
}
Car.prototype.brake = function(){
      console.log("Car is stopping");
}


class Bike {
      constructor(make) {
            vehicle.call(this, "bike");
            this.make = make;
      }
      noOfWheels = 2;
      accelarator() {
            console.log("Bike is accelarating");
      }
      brake() {
            console.log("Bike is stopping");
      }
}
// Bike.prototype.noOfWheels = 2;
Bike.prototype = Object.create(vehicle.prototype);


var MyBus = new Bus('Mercedes');
var myCar = new Car("BMW");
var myBike = new Bike("honda");

// ECMA2015 CLASS
class MyClass {
      constructor(firstName){
            this.firstName = firstName;
      }
      lastName = "sinha"
      getFirstName() {
            console.log(this.firstName);
      }
      getLastName(){
            console.log(this.lastName);
      }
      getFullName(){
            console.log(this.firstName + " " + this.lastName)
      }
}

var person = new MyClass("john");
person.getFullName();