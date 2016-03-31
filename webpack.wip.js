const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
if(!TARGET) TARGET = "build";

const PATHS = {
	app: path.join(__dirname, 'app'),
	dist: path.join(__dirname, 'dist'),
	style: path.join(__dirname, 'app/css/main.css')
};

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
	        'webpack-hot-middleware/client',
	        './app/index'
	        ],
	output: {
	    path: PATHS.dist,
	    filename: (TARGET === 'build' || TARGET === 'stats')?'[name].[hash].js':'bundle.js',
	    publicPath: PATHS.static
	},

	plugins: [

	          new webpack.optimize.OccurenceOrderPlugin(),
	          new webpack.HotModuleReplacementPlugin(),

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
	                        }
	                        ]
	          }
}
if(TARGET==='build'){
    module.exports = merge(module.exports,{
	plugins: [
        	 new CleanPlugin([PATHS.dist]),
                 new ExtractTextPlugin('styles.[chunkhash].css'),
	          // Extract vendor and manifest files
	          new webpack.optimize.CommonsChunkPlugin({
	              names: ['vendor', 'manifest']
	          }),
	         new webpack.DefinePlugin({
	              'process.env.NODE_ENV': '"production"'
	          }),
	          new webpack.optimize.UglifyJsPlugin({
	              compress: {
	        	  warnings: false
	              }
	          })    
	       ],
	entry: {
	    app: PATHS.app,
	    webpack_client: 'webpack-hot-middleware/client',
	    vendor: Object.keys(pkg.dependencies).filter(function(v) {
		// Exclude alt-utils as it won't work with this setup
		// due to the way the package has been designed
		// (no package.json main).
		return v !== 'alt-utils';
	    }),
	    style: PATHS.style 
	}
    });
}
