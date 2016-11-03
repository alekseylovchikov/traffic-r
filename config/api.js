const location = window.location;

const gatewayProtocol = (location.protocol === 'https') ? 'https://' : 'http://';
const socketsProtocol = (location.protocol === 'https') ? 'wss://'   : 'ws://';

const gatewayUrl = gatewayProtocol + ((SERVER_HOST) ? SERVER_HOST : location.host) + API_URL;
const socketsUrl = socketsProtocol + ((SERVER_HOST) ? SERVER_HOST : location.host) + WS_URL;

const api = {

  // Auth
  USER_LOGIN_BY_EMAIL       : gatewayUrl + '/auth/login/email',
  USER_LOGOUT               : gatewayUrl + '/auth/logout',
  USER_REFRESH_TOKEN        : gatewayUrl + '/auth/refresh',

  // Account
  ACCOUNT_GET_DATA          : gatewayUrl + '/account',
  ACCOUNT_SET_DATA          : gatewayUrl + '/account',

  // Bonuses
  GET_BONUSES               : gatewayUrl + '/bonus',

  // Data
  DATA_GET_TOKEN            : gatewayUrl + '/distributor/candles/token',
  DATA_UPDATE_SET           : gatewayUrl + '/distributor/candles',
  DATA_GET_HISTORY          : gatewayUrl + '/distributor/candles',

  // Assets
  GET_ASSETS_DATA           : gatewayUrl + '/profit',

  // Wallet
  WALLET_GET_DATA           : gatewayUrl + '/wallet',
  WALLET_SET_ACTIVE_BALANCE : gatewayUrl + '/wallet/active/balance',

  // Bets
  GET_BETS                  : gatewayUrl + '/history/bets',
  CHECK_BETS                : gatewayUrl + '/history/bet',
  SET_BET                   : gatewayUrl + '/bidder/bet',

  // Scraper
  GET_NEWS_DATA             : gatewayUrl + '/scraper/news',
  GET_EVENTS_DATA           : gatewayUrl + '/scraper/events',

  // Websockets
  WS                        : socketsUrl + '/candles'

};

export default api;
