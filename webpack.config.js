'use strict'

var path               = require('path');
var webpack            = require('webpack');

var DEV_SERVER_PORT = 3000;

var isProd = (process.env.NODE_ENV === 'production');

console.log('webpack env: ' + process.env.NODE_ENV);

/* module array helper function */

function getPlugins() {

  var plugins = [];

  if(isProd) {
    console.log('Running production build...');
  } else {
    console.log('Running development build...');
    plugins.push(new webpack.optimize.OccurenceOrderPlugin())
    plugins.push(new webpack.NoErrorsPlugin());
  }

  return plugins;
}

/* main configuration */

module.exports = {
  entry: {
    main: ['./clients/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:' + DEV_SERVER_PORT + '/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'clients')
      }
    ]
  },
  plugins: getPlugins(),
  target: 'web',
  quiet: false,
  noInfo: true,
  stats: {
    chunks: false,
    colors: true
  },
  devtool: !isProd && 'source-map'
};