import KeyMirror from 'keymirror';

const ActionTypes = KeyMirror({
  ERRORS: null,
  TODOS: null,
  TODO_ADD: null,
  TODO_UPDATE: null,
  TODO_UPDATE_STATE: null,
  TODOS_UPDATE_STATE: null,
  TODOS_REMOVE: null,
  TODO_CHANGE_EDITING: null,
  TODO_SWITCH_STATUS: null,
})

export default ActionTypes;
