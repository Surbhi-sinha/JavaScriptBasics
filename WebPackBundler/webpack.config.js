const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
      //this property defines where the application starts 
      entry :"./src/index.js",

      //this property defines where the file path and the file name which will be used for deploying the bundled file
      output:{
            path:path.join(__dirname , '/dist'),
            filename : 'bundle.js'
      },

      //setup loaders
      module:{
            rules:[{
                  test:/\.js$/,
                  exclude: /node_modules/,
                  use:{
                        loader : 'babel-loader',
                  }
            }]
      },

      //setup plugin to use a HTML file for serving bundled js files
      plugins:[
            new HtmlWebpackPlugin({
                  template:'./src/index.html'
            })
      ]
}