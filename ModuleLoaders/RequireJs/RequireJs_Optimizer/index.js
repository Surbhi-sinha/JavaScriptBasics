// require(["Location" , "products"] , function(Location , products) {

// })

// // require function simply loads the files(modules)


// since the main Entry point to the application is this index.js file it is the config file(other naming convetions could be Main.js/config.js/Index.js ) we are keeping it here as index.js but it would be good to keep it as "config.js"

// here we will write the configurations file

// config.js(aka index.js here)

require.config({
      baseUrl : 'libs', // it should be baseUrl not other like baseURL. case sensitive
      paths:{
            location : "Location",
            products : "Products",
            lodashMod : "lodash.min",
            bootstrap : "../node_modules/bootstrap/dist/js/bootstrap.min",
            popper : "../node_modules/@popperjs/core/dist/umd/popper.min",
            jquery : "jquery/dist/jquery"
      } ,
      // packages :[{
      //       name : "lodash",
      //       location : "../node_modules/lodash",
      //       main : "lodash.min"
      // }]
      // Map :{
      //        location : "libs/Location",
      //       products : "libs/Products"
      // }C:\Users\SURBHI SINHA\Documents\JS_training\ModuleLoaders\RequireJs\RequireJs_Optimizer\node_modules\@popperjs\core\dist\umd\popper.min.js
})