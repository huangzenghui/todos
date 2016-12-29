import ActionTypes from '../actionTypes';
import Immutable from 'seamless-immutable';
import createReducer from 'redux-create-reducer-curry';

const defaultTodos = Immutable({
  list: [],
  status: 'all'
});

const todos = createReducer(defaultTodos)({
  [ActionTypes.TODOS]: (state, action) => state.set('list', action.todos),
  [ActionTypes.TODO_ADD]: (state, action) => state.set('list', [action.todo, ...state.list]),
  [ActionTypes.TODO_UPDATE]: (state, action) => {
    const todos = Immutable.asMutable(state.list);
    const index = todos.findIndex(todo => todo._id === action.id);
    if(index !== -1){
      const todo = Immutable.asMutable(todos[index]);
      todo.text = action.text;
      todos.splice(index, 1, todo);
      return state.set('list', todos);
    }
    return state;
  },
  [ActionTypes.TODO_UPDATE_STATE]: (state, action) => {
    const todos = Immutable.asMutable(state.list);
    const index = todos.findIndex(todo => todo._id === action.id);
    if(index !== -1){
      const todo = Immutable.asMutable(todos[index]);
      todo.complete = action.complete;
      todos.splice(index, 1, todo);
      return state.set('list', todos);
    }
    return state;
  },
  [ActionTypes.TODOS_UPDATE_STATE]: (state, action) => {
    const todos = Immutable.asMutable(state.list, {deep: true});
    for(const todo of todos){
      todo.complete = action.complete;
    }
    return state.set('list', todos);
  },
  [ActionTypes.TODOS_REMOVE]: (state, action) => {
    const todos = Immutable.asMutable(state.list);
    for(const id of action.ids){
      const index = todos.findIndex(todo => todo._id === id);
      index !== -1 && todos.splice(index, 1);
    }
    return state.set('list', todos);
  },
  [ActionTypes.TODO_CHANGE_EDITING]: (state, action) => {
    const todos = Immutable.asMutable(state.list);
    const index = todos.findIndex(todo => todo._id === action.id);
    if(index !== -1){
      const todo = Immutable.asMutable(todos[index]);
      todo.editing = action.editing;
      todos.splice(index, 1, todo);
      return state.set('list', todos);
    }
    return state;
  },
  [ActionTypes.TODO_SWITCH_STATUS]: (state, action) => state.set('status', action.status),
})


export default todos;