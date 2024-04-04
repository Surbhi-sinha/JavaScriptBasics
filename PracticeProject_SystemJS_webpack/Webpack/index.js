const products = require("./Modules/Products");

console.log("=================INVENTORY===============");

console.log("*******INVENTORY*******");
// console.log("buttonclicked" , products.clicksCount("btn"))
console.log(products.addItem("apple"));
console.log(products.getProductList());
console.log(products.removeItem("icecream"));
console.log(products.removeItem("mango"));
console.log(products.getProductList());
console.log(products.addItem("gauva"));
