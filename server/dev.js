import express              from 'express';

// queryQL
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WeboackHotMiddleware from 'webpack-hot-middleware';
// import proxyMiddleware from 'http-proxy-middleware';
import webpack         from 'webpack';

import path from 'path';

import pathsConfig   from '../config/paths';
import serverConfig  from '../config/server';
import webpackConfig from '../config/webpack.dev.babel';
// import proxyConfig   from '../config/proxy';

const compiler = webpack(webpackConfig, (err, stats) => {

  if (err) {
    throw err;
  }

  console.log(stats.toString({
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }));
});

const devMiddleware = WebpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
});

const hotMiddleware = WeboackHotMiddleware(compiler);

// const proxy = proxyMiddleware(proxyConfig.proxyContext, proxyConfig.proxyOptions);
const app = express();

// queryQL
const schema = buildSchema(`
  type Query {
    id: ID
    msg: String
  }
`);

const root = {
  msg: () => 'Hello, GraphQL',
  id: () => 1
};

// Set path to static files
app.use('/', express.static(path.resolve(__dirname, '../', pathsConfig.folders.dest)));

// queryQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(devMiddleware);
app.use(hotMiddleware);

// Add proxy
// app.use(proxy);

// Return html file for '/clickaine' request
app.get('/*', (req, res, next) => {

  const filename = path.join(compiler.outputPath, 'clickaine.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {

    if (err) {
      return next(err);
    }

    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

// Start server and listen...
app.listen(serverConfig.portDev, serverConfig.host, (err) => {

  if (err) {
    console.log(err);
  }

  console.info('Server has started on ' + serverConfig.host + ':' + serverConfig.portDev);
});
