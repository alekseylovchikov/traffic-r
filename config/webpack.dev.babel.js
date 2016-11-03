import path    from 'path';
import webpack from 'webpack';

import autoprefixer from 'autoprefixer';

import CleanWebpackPlugin    from 'clean-webpack-plugin';
import HtmlWebpackPlugin     from 'html-webpack-plugin';
import ExtractTextPlugin     from 'extract-text-webpack-plugin';
import VendorChunkPlugin     from 'webpack-vendor-chunk-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import BrowserSyncPlugin     from 'browser-sync-webpack-plugin';

import paths  from './paths';
import server from './server';

const projectRoot = path.resolve(__dirname, '../');

const serverHost = (process.env.SERVER_HOST) ? JSON.stringify(process.env.SERVER_HOST) : null;

const apiUrl = JSON.stringify(process.env.API_URL);
const wsUrl  = JSON.stringify(process.env.WS_URL);

const landingUrl = JSON.stringify('http://' + process.env.SERVER_HOST + process.env.LANDING_URL);
const accountUrl = JSON.stringify('http://' + process.env.SERVER_HOST + process.env.ACCOUNT_URL);

const css = new ExtractTextPlugin('css/clickaine.css');

export default {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../', paths.folders.source + '/' + paths.folders.scripts + '/index')
    ],
    vendor: [
      'webpack-hot-middleware/client',
      'react', 'react-dom', 'react-addons-update',
      'redux', 'redux-thunk', 'react-redux',
      'react-scrollbar',
      'd3', 'classnames', 'axios',
      'redux-devtools', 'redux-devtools-dock-monitor', 'redux-devtools-inspector', 'redux-devtools-log-monitor'
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../', paths.folders.dest),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '../', paths.folders.source),
          path.join(__dirname, '../config')
        ],
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js?/,
        include: [
          path.join(__dirname, '../', paths.folders.source, paths.folders.scripts),
          path.join(__dirname, '../config')
        ],
        loader: 'babel',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.images),
        // loader: 'file-loader?name=clickaine/img/[name].[ext]'
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.fonts),
        loader: 'file-loader?name=clickaine/fonts/[name].[ext]'
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../', paths.folders.source, paths.folders.styles),
        loader: 'style-loader!css-loader!postcss-loader!sass-loader!'
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
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename : 'clickaine.html',
      template : path.join(__dirname, '../', paths.folders.source, paths.folders.html, 'clickaine.html'),
      inject   : true,
      cache    : false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new VendorChunkPlugin('vendor'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin(),
    new BrowserSyncPlugin({
      host: server.host,
      port: server.portBrowserSync,
      proxy: server.host + ':' + server.portDev,
      open: false,
      ui: {
        port: server.portBrowserSyncUI
      },
      notify: false
    }, {
      reload: false
    }),
    css
  ]
};
