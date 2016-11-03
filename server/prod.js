import express         from 'express';
import cookieParser    from 'cookie-parser';
// import proxyMiddleware from 'http-proxy-middleware';
import webpack         from 'webpack';

import path from 'path';

import pathsConfig   from '../config/paths';
import serverConfig  from '../config/server';
import webpackConfig from '../config/webpack.prod.babel';
// import proxyConfig   from '../config/proxy';

const landingUrl = (process.env.SERVER_HOST) ?
  ('http://' + process.env.SERVER_HOST + process.env.LANDING_URL)
  :
  (process.env.LANDING_URL);

const PORT = process.env.FRONTEND_HTTP_BIND_PORT || 5005;

const compiler = webpack(webpackConfig, (err, stats) => {

  if (err) {
    throw err;
  }

  console.log('Build finished successfully!');
  console.log(stats.toString({
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }));
});

// const proxy    = proxyMiddleware(proxyConfig.proxyContext, proxyConfig.proxyOptions);
const app = express();

// Set path to static files
app.use('/', express.static(path.resolve(__dirname, '../', pathsConfig.folders.dest)));

// Parse cookies
app.use(cookieParser());

// Add proxy
// app.use(proxy);

// Return html file for '/clickaine' request
app.get('/', (req, res) => {
  if (req.cookies.accessToken && req.cookies.refreshToken) {
    res.sendFile(path.resolve(__dirname, '../', pathsConfig.folders.dest, 'clickaine.html'));
  } else {
    res.sendFile(path.resolve(__dirname, '../', pathsConfig.folders.dest, 'clickaine.html'));
    // res.redirect(landingUrl);
  }
});

// Start server and listen...
// app.listen(serverConfig.port, serverConfig.host, (err) => {
app.listen(PORT, serverConfig.host, (err) => {

  if (err) {
    console.log(err);
  }

  console.info('Server has started on ' + serverConfig.host + ':' + serverConfig.port);
});
