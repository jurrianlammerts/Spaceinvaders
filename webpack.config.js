var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: "./dev/index.ts",
  output: {
    publicPath: "/dist/",
    path: path.join(__dirname, '/dist/'),
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};