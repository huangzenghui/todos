'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _todos = require('../models/todos');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolvers = {
  Date: new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: function parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize: function serialize(value) {
      if (value) {
        return value.getTime(); // value sent to the client
      } else {
        return value;
      }
    },
    parseLiteral: function parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    todos: function todos(root, args, context, info) {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _todos.Todo.all(context);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  },
  Mutation: {
    addTodo: function addTodo(root, _ref, context, info) {
      var text = _ref.text;

      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _todos.Todo.insert(context, text);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    updateTodo: function updateTodo(root, _ref2, context, info) {
      var id = _ref2.id,
          text = _ref2.text;

      var _this3 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _todos.Todo.update(context, id, text);

              case 2:
                return _context3.abrupt('return', { ok: true });

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    changeTodosState: function changeTodosState(root, _ref3, context, info) {
      var ids = _ref3.ids,
          complete = _ref3.complete;

      var _this4 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _todos.Todo.changeManyState(context, ids, complete);

              case 2:
                return _context4.abrupt('return', { ok: true });

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },
    removeTodos: function removeTodos(root, _ref4, context, info) {
      var ids = _ref4.ids;

      var _this5 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _todos.Todo.removeMany(context, ids);

              case 2:
                return _context5.abrupt('return', { ok: true });

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    }
  }
};

exports.default = resolvers;