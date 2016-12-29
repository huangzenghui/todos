import {getTodos, addTodo, changeTodosState, removeTodos, updateTodo} from '../apis';
import ActionTypes from '../actionTypes';

const errorsAction = (errors) => {
  console.log(errors);
  return {
    type: ActionTypes.ERRORS,
    errors,
  }
}

const TodosActions = {
  async getTodos(){
    const {todos, errors} = await getTodos();
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODOS,
      todos,
    }
  },
  async addTodo(text){
    const {todo, errors} = await addTodo(text);
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODO_ADD,
      todo,
    }
  },
  async updateTodo(id, text) {
    const {errors} = await updateTodo(id, text);
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODO_UPDATE,
      id,
      text,
    }
  },
  async changeState(id, complete){
    const {errors} = await changeTodosState([id], complete);
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODO_UPDATE_STATE,
      id,
      complete,
    }
  },
  async changeAllState(ids, complete){
    const {errors} = await changeTodosState(ids, complete);
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODOS_UPDATE_STATE,
      complete,
    }
  },
  async remove(ids){
    const {errors} = await removeTodos(ids);
    if(errors){
      return errorsAction(errors);
    }
    return {
      type: ActionTypes.TODOS_REMOVE,
      ids,
    } 
  },
  changeEditing(id, editing){
    return {
      type: ActionTypes.TODO_CHANGE_EDITING,
      id,
      editing,
    }
  },
  switchStatus(status){
    return {
      type: ActionTypes.TODO_SWITCH_STATUS,
      status,
    }
  }
}

export default TodosActions;