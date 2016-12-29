'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaMongo = require('koa-mongo');

var _koaMongo2 = _interopRequireDefault(_koaMongo);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaHistoryApiFallback = require('koa-history-api-fallback');

var _koaHistoryApiFallback2 = _interopRequireDefault(_koaHistoryApiFallback);

var _config = require('./config/config.js');

var _config2 = _interopRequireDefault(_config);

var _controllerInit = require('./controller/controllerInit');

var _controllerInit2 = _interopRequireDefault(_controllerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //使用到async await必须引入，最好在第一行


var app = new _koa2.default();

// 日志
app.use((0, _koaLogger2.default)());

app.use(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 10;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            ctx.body = {
              msg: _context.t0.msg
            };
            ctx.status = _context.t0.status || 500;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// 静态文件
var publicFiles = (0, _koaConvert2.default)((0, _koaStatic2.default)(_config2.default.get('staticDir')));
publicFiles._name = 'static';
app.use(publicFiles);

// view文件 
app.use((0, _koaViews2.default)(_config2.default.get('viewsDir')));

// mongo
app.use((0, _koaMongo2.default)({
  db: _config2.default.get('dbName')
}));

// app.use(convert(historyApiFallback()));

// 请求body解析
app.use((0, _koaBodyparser2.default)());

// 路由
app.use(_controllerInit2.default.routes()).use(_controllerInit2.default.allowedMethods());

var port = _config2.default.get('port');

app.listen(port, function () {
  console.log('serve running in http://localhost:' + port);
});

exports.app = app;