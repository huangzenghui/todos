'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _graphqlServerKoa = require('graphql-server-koa');

var _schema = require('../data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _indexController = require('./indexController.js');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/', _indexController2.default.index()).get('/index', _indexController2.default.index()).get('/index.html', _indexController2.default.index()).all('/graphql', (0, _graphqlServerKoa.graphqlKoa)(function (ctx) {
  return {
    schema: _schema2.default,
    context: { mongo: ctx.mongo },
    debug: true
  };
})).get('/graphiql', (0, _graphqlServerKoa.graphiqlKoa)({ endpointURL: '/graphql' }));

exports.default = router;