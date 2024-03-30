// using Object.create() method

const Animal ={
      type : "Default Name",
      displayType(){
            console.log(this.type);
      }
}

const Bird = Object.create(Animal);
Bird.displayType();


const Fish = Object.create(Animal);
Fish.type = "Aquatic animal";
Fish.displayType();

const bike ={
      type : "honda",
      year : 2015,
      model : "hero delux"
}
console.log(bike.type + " , " +  bike["model"])

bike.random = "this was randomly added";
bike["String"] = "highway";
bike['String2'] = "highway";
console.log(bike);