var path = require('path')
var webpack = require('webpack')
var pkg = require('./package.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  hostname: 'kanband',
  entry: {
	    app: ['./app'],
	    //webpack_client: 'webpack-hot-middleware/client',
	    vendor: Object.keys(pkg.dependencies).filter(function(v) {
		// Exclude alt-utils as it won't work with this setup
		// due to the way the package has been designed
		// (no package.json main).
		return v !== 'alt-utils';
	    })
	},
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
     }),
    new ExtractTextPlugin('[name].css')

  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: /app/
      },
      {   test: /\.css$/, 
	    loader: ExtractTextPlugin.extract("style-loader", "css-loader"), 
      }
    ]
  }
}
