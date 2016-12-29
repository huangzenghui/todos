import React from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import TodoActions from '../actions/todos';
import classnames from 'classnames';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Todo extends React.Component {

  constructor(props){
    super(props);
    this.changeState = this.changeState.bind(this);
    this.editTodoHandle = this.editTodoHandle.bind(this);
    this.remove = this.remove.bind(this);
    this.changeEditing = this.changeEditing.bind(this);
  }

  componentDidUpdate(){
    const {todo} = this.props;
    if(todo.editing){
      const input = ReactDOM.findDOMNode(this.refs.editTodo);
      input.focus();
    }
  }

  changeState(){
    const {todo: {_id, complete}, changeState} = this.props;
    changeState && changeState(_id, !complete);
  }

  remove(){
    const {todo: {_id}, remove} = this.props;
    remove && remove(_id);
  }

  changeEditing(e){
    const {todo: {_id, editing}, changeEditing} = this.props;
    changeEditing && changeEditing(_id, !editing);
  }

  editTodoHandle(e){
    const input = ReactDOM.findDOMNode(this.refs.editTodo);
    if(e.which === ENTER_KEY){
      const {updateTodo, remove, todo} = this.props;
      const value = input.value;
      if(value){
        value !== todo.text && updateTodo && updateTodo(todo._id, input.value);
      }else{
        remove && remove(todo._id);
      }
      input.blur();
    }else if(e.which === ESC_KEY){
      input.blur();
    }
  }

  render() {
    const {todo} = this.props;
    const todoClass = classnames({
      completed: todo.complete,
      editing: todo.editing,
    });
    return (
      <li className={todoClass}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.complete} onChange={this.changeState}/>
          <label onDoubleClick={this.changeEditing}>{todo.text}</label>
          <button className="destroy" onClick={this.remove}></button>
        </div>
        <input id={todo._id} className="edit" defaultValue={todo.text} ref='editTodo'
          onKeyDown={this.editTodoHandle} onBlur={this.changeEditing}/>
      </li>
    )
  }
}

Todo.propTypes = {
  todo: React.PropTypes.object,
  changeState: React.PropTypes.func,
  remove: React.PropTypes.func,
  changeEditing: React.PropTypes.func,
  updateTodo: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeState(id, complete){
      dispatch(TodoActions.changeState(id, complete))
    },
    remove(id){
      dispatch(TodoActions.remove([id]))
    },
    changeEditing(id, editing){
      dispatch(TodoActions.changeEditing(id, editing))
    },
    updateTodo(id, text){
      dispatch(TodoActions.updateTodo(id, text))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
