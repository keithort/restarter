const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./webpack.base')

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  PUBLIC_PATH
} = CONFIG

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    CLIENT_ENTRY
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true,
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: CLIENT_ENTRY
    }]
  }
};