require('babel-core/register');

// Load .env variables
require('dotenv').config();

const env = (process.env.NODE_ENV === 'production' ? 'production' : 'development');

if (env == 'development') {
  console.log(`server run in ${env} mode`);
  require('./server/dev');
} else {
  console.log(`server run in ${env} mode`);
  require('./server/prod');
}
