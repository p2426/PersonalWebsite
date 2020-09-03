const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main/init.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "development",
    module: {
         rules: [
             {
                 test: /\.js$/,
				 exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['@babel/preset-env']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
	 watch: true,
};