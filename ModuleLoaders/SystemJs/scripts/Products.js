var products = ["soap", "oil", "cookies", "chips", "icecream"];

function addItem(item){
    if(products.includes(item) == false){
        products.push(item);
        return (`item: ${item} added to the Product list`);
    }else{
        return (`item: ${item} already added to the Product list`);
    }
}

function getProductList(){
    return (`total items : ${products.length} and products are : ` , products);
}

function removeItem(item){
    
    var index = products.indexOf(item)
    if(index !== -1){
        products.splice(index , 1);
        return (`item: ${item} removed from the Product list`);
    }else{
        return (`item: ${item} not present in the Product list`);
    }
}

// common js (server)
exports = {
    addItem , getProductList , removeItem
}

// AMD format (Browser)
// define( function() {
//         return{
//             addItem , getProductList , removeItem
//         }
// }); 