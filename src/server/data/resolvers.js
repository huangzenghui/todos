import { GraphQLScalarType } from 'graphql';
import {Todo} from '../models/todos';

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      if(value){
        return value.getTime(); // value sent to the client
      }else{
        return value;
      }
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    async todos(root, args, context, info){
      return await Todo.all(context);
    }
  },
  Mutation: {
    async addTodo(root, {text}, context, info){
      return await Todo.insert(context, text);
    },
    async updateTodo(root, {id, text}, context, info){
      await Todo.update(context, id, text);
      return {ok: true}
    },
    async changeTodosState(root, {ids, complete}, context, info){
      await Todo.changeManyState(context, ids, complete);
      return {ok: true};
    },
    async removeTodos(root, {ids}, context, info){
      await Todo.removeMany(context, ids);
      return {ok: true};
    }
  }
}

export default resolvers;