import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import {todoDefs} from '../models/todos';

const typeDefinitions = `
	type Query {
		todos: [Todo]
	}
	scalar Date
	type Mutation {
		addTodo (
			text: String!
		): Todo
    updateTodo (
      id: String!
      text: String!
    ): Result
    removeTodos(
      ids: [String]!
    ): Result
		changeTodosState (
			ids: [String]!
			complete: Boolean!
		): Result
	}
  type Result {
    ok: Boolean
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = [
	typeDefinitions,
  todoDefs,
];

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: { log: (e) => console.log(e) },
});

export default executableSchema