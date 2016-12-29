const DevWebpack = require('./config/webpack.dev');
const ProdWebpack = require('./config/webpack.prod');

switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = DevWebpack;
    break;
  case 'production':
    module.exports = ProdWebpack;
    break;
  default:
    module.exports = DevWebpack;
}