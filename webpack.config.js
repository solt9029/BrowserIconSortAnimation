var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    index: __dirname + '/src/js/index.js',
    proposed: __dirname + '/src/js/proposed.js',
    reflow: __dirname + '/src/js/reflow.js',
    scaling: __dirname + '/src/js/scaling.js',
    hybrid: __dirname + '/src/js/hybrid.js'
  },
  output: {
    path: __dirname+"/dist/js",
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: __dirname+"/dist",
    port: 8080
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader","css-loader"]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader","css-loader","sass-loader"]
      },
      { 
        test: /\.svg$/, 
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      { 
        test: /\.woff$/, 
        loader: 'url-loader?mimetype=application/font-woff' 
      },
      { 
        test: /\.woff2$/, 
        loader: 'url-loader?mimetype=application/font-woff' 
      },
      { 
        test: /\.eot$/, 
        loader: 'url-loader?mimetype=application/font-woff' 
      },
      { 
        test: /\.ttf$/, 
        loader: 'url-loader?mimetype=application/font-woff' 
      },
      { 
        test: /\.png$/, 
        loader: 'url-loader?mimetype=image/png' 
      }
    ]
  }
};