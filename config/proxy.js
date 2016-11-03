const gatewayUrl = (process.env.GATEWAY_PORT) ?
  ('http://' + process.env.GATEWAY_HOST + ':' + process.env.GATEWAY_PORT)
  :
  ('http://' + process.env.GATEWAY_HOST);

const quoteUrl   = (process.env.QUOTE_SERVICE_PORT) ?
  ('http://' + process.env.QUOTE_SERVICE_HOST + ':' + process.env.QUOTE_SERVICE_PORT)
  :
  ('http://' + process.env.QUOTE_SERVICE_HOST);

// Add paths for proxy
const proxyContext = ['/api'];

// Rewrite our paths to match paths in external apis
const proxyPathRewrite = {
  '^/api/auth'        : '/auth',
  '^/api/distributor' : '/distributor',
  '^/api/candles'     : '/candles',
  '^/api/bets/post'   : '/bidder',
  '^/api/bets/get'    : '/history',
  '^/api/profit'      : '/profit',
  '^/api/wallet'      : '/wallet',

  '^/api/websockets'  : '/'
};

// Forward routes to servers
const proxyTable = {

  // Candles
  '/api/websockets' : quoteUrl,

  // Candles history
  '/api/candles'    : quoteUrl,

};

// Configure proxy
const proxyOptions = {
  target       : gatewayUrl,
  changeOrigin : true,
  ws           : true,
  pathRewrite  : proxyPathRewrite,
  router       : proxyTable,
  logLevel     : (process.env.NODE_ENV === 'production' ? 'error' : 'debug')
};

export default {
  proxyContext : proxyContext,
  proxyOptions : proxyOptions
};
