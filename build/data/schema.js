'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _todos = require('../models/todos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefinitions = '\n\ttype Query {\n\t\ttodos: [Todo]\n\t}\n\tscalar Date\n\ttype Mutation {\n\t\taddTodo (\n\t\t\ttext: String!\n\t\t): Todo\n    updateTodo (\n      id: String!\n      text: String!\n    ): Result\n    removeTodos(\n      ids: [String]!\n    ): Result\n\t\tchangeTodosState (\n\t\t\tids: [String]!\n\t\t\tcomplete: Boolean!\n\t\t): Result\n\t}\n  type Result {\n    ok: Boolean\n  }\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n';

var schema = [typeDefinitions, _todos.todoDefs];

var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: schema,
  resolvers: _resolvers2.default,
  logger: { log: function log(e) {
      return console.log(e);
    } }
});

exports.default = executableSchema;