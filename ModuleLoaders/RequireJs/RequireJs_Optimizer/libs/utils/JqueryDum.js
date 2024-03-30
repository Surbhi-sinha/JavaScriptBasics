define([
      'location',
      'products',
      'LodashMod'
], function(location, product,lodashMod) {

      var locationFromModule = document.createElement('div')
      locationFromModule.textContent = location
      var productFromModule = document.createElement('div')
      productFromModule.textContent = product.getProductList();
      var lodashMod = document.createElement('div');
      lodashMod.textContent = lodashMod.currSum ;
      
      document.querySelector('.firstPara').append(locationFromModule);
      document.querySelector('.secondPara').append(productFromModule);
      document.querySelector('.secondPara').append(lodashMod);
      console.log(product);
      console.log(location);
});