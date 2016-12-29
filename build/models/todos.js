'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = exports.todoDefs = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var todoDefs = exports.todoDefs = '\n  type Todo{\n    _id: String\n    text: String\n    complete: Boolean\n    createAt: Date\n  }\n';

var Todo = exports.Todo = {
  insert: function insert(ctx, text) {
    var _this = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var _ref, _ref$ops, todo;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ctx.mongo.collection('todos').insert({ text: text, complete: false, createAt: new Date() });

            case 2:
              _ref = _context.sent;
              _ref$ops = _slicedToArray(_ref.ops, 1);
              todo = _ref$ops[0];
              return _context.abrupt('return', todo);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  update: function update(ctx, id, text) {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return ctx.mongo.collection('todos').updateOne({ _id: (0, _mongodb.ObjectId)(id) }, { $set: { text: text } });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  changeManyState: function changeManyState(ctx, ids, complete) {
    var _this3 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var objIds;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              objIds = ids.map(function (id) {
                return new _mongodb.ObjectId(id);
              });
              _context3.next = 3;
              return ctx.mongo.collection('todos').updateMany({ _id: { $in: objIds } }, { $set: { complete: complete } });

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  removeMany: function removeMany(ctx, ids) {
    var _this4 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var objIds;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              objIds = ids.map(function (id) {
                return new _mongodb.ObjectId(id);
              });
              _context4.next = 3;
              return ctx.mongo.collection('todos').remove({ _id: { $in: objIds } });

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  all: function all(ctx) {
    var _this5 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return ctx.mongo.collection('todos').find().sort({ 'createAt': -1 }).toArray();

            case 2:
              return _context5.abrupt('return', _context5.sent);

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  }
};