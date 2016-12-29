const webpackBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

const webpackDev = {
  entry: webpackBase._entry,
  output: webpackBase._output,
  module: webpackBase._module,
  devtool: webpackBase._devtool,
  plugins: [
    new HtmlWebpackPlugin({
      template: config.srcDir + '/index.html',
      filename: config.buildDir + '/views/index.html'
    }),
    ...webpackBase._plugins,
  ],
  watch: true,
}

module.exports = webpackDev
