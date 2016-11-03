import path    from 'path';
import webpack from 'webpack';

import autoprefixer from 'autoprefixer';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import VendorChunkPlugin  from 'webpack-vendor-chunk-plugin';

import paths  from './paths';
import server from './server';

const projectRoot = path.resolve(__dirname, '../');

const serverHost = (process.env.SERVER_HOST) ?
  JSON.stringify(process.env.SERVER_HOST)
  :
  null;

const apiUrl = JSON.stringify(process.env.API_URL);
const wsUrl  = JSON.stringify(process.env.WS_URL);

const landingUrl = JSON.stringify(process.env.LANDING_URL);
const accountUrl = JSON.stringify(process.env.ACCOUNT_URL);

const css = new ExtractTextPlugin('css/clickaine.css');

export default {
  context: path.join(__dirname, '../src'),
  entry: {
    app: path.resolve(__dirname, '../', paths.folders.source + '/' + paths.folders.scripts + '/index.js'),
    vendor: [
      'react', 'react-dom', 'react-addons-update',
      'redux', 'redux-thunk', 'react-redux',
      'react-scrollbar',
      'd3', 'classnames', 'axios'
      ]
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../', paths.folders.dest)
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '../', paths.folders.source, paths.folders.scripts),
          path.join(__dirname, '../config')
        ],
        loader: 'babel'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.images),
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.fonts),
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /clickaine\.scss$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.styles),
        loader: css.extract('style', 'css!postcss!sass')
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV    : JSON.stringify(process.env.NODE_ENV),
      SERVER_HOST : serverHost,
      API_URL     : apiUrl,
      WS_URL      : wsUrl,
      ACCOUNT_URL : accountUrl,
      LANDING_URL : landingUrl
    }),
    new CleanWebpackPlugin([paths.folders.dest], {
      root: projectRoot,
      verbose: false,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename : 'clickaine.html',
      template : path.join(__dirname, '../', paths.folders.source, paths.folders.html, 'clickaine.html'),
      inject   : true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new VendorChunkPlugin('vendor'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
    }),
    css
  ]
};
