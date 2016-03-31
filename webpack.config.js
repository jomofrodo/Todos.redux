var path = require('path')
var webpack = require('webpack')
var pkg = require('./package.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
	    app: './app',
	    webpack_client: 'webpack-hot-middleware/client',
	    vendor: Object.keys(pkg.dependencies).filter(function(v) {
		// Exclude alt-utils as it won't work with this setup
		// due to the way the package has been designed
		// (no package.json main).
		return v !== 'alt-utils';
	    }),
	    style: path.join(__dirname, 'app/css/main.css')
	},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app','vendor', 'webpack_client', 'style']
     }),
    new ExtractTextPlugin('styles.[chunkhash].css')

  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: /app/
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: /app/
      },
      /*
      {   test: /\.css$/, 
	    loader: ExtractTextPlugin.extract("style-loader", "css"), 
	    include: /app/
      }*/
    ]
  }
}
