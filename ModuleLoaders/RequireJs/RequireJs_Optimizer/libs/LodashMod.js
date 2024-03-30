require(['lodashMod'] , function(lodash){
      const currSum  = lodash.add(7,4);
      var arr = [1,2,3,4,5];
      const val = lodash.isArray(arr);
      console.log(currSum , val)
})

