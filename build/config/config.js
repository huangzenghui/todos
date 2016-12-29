'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 后端基本配置
var CONFIG = new Map();
CONFIG.set('port', '' + (process.env.NODE_ENV === 'tests' ? 3001 : 3000));
CONFIG.set('viewsDir', _path2.default.join(__dirname, '..', 'views'));
CONFIG.set('staticDir', _path2.default.join(__dirname, '..'));
CONFIG.set('dbName', '' + (process.env.NODE_ENV === 'tests' ? 'tests' : 'todos'));

exports.default = CONFIG;