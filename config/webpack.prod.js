const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

const webpackProd = {
  entry: webpackBase._entry,
  output: {
    filename: 'scripts/[name].[chunkhash:5].js',
    path: config.buildDir + '/assert/',
  },
  module: webpackBase._module,
  devtool: false,
  plugins: [
    ...webpackBase._plugins,
    new ExtractTextPlugin({ filename: 'styles/[name].[chunkhash:5].css', disable: false, allChunks: true }),
    new HtmlWebpackPlugin({
      template: config.srcDir + '/index.html',
      filename: config.buildDir + '/views/index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeComments: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ]
}

module.exports = webpackProd
