var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: false,
  entry: [
    path.join(process.cwd(), 'client/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk_[hash].js',
    publicPath: '/',
    path: path.resolve(process.cwd(), 'public/js')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, '../client')
    }]
  }
}
