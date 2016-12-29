import React from 'react';
import {connect} from 'react-redux';
import './todos.less';
import Todo from './todo.jsx';
import TodoActions from '../actions/todos';

class Todos extends React.Component {

  constructor(props){
    super(props);
  }

  changeAllState(completed){
    const {todos, changeAllState} = this.props;
    const ids = todos.map(todo => todo._id);
    changeAllState && changeAllState(ids, !completed);
  }

  render() {
    const {todos, status} = this.props;
    const index = todos.findIndex(todos => !todos.complete);
    const allCompleted = index === -1;
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" checked={allCompleted} onChange={this.changeAllState.bind(this, allCompleted)}/>
        <ul className="todo-list">
          {
            todos.map(todo => {
              if(status === 'all'){
                return <Todo todo={todo} key={todo._id}/>
              }else if(status === 'active'){
                return !todo.complete && <Todo todo={todo} key={todo._id}/>
              }else {
                return todo.complete && <Todo todo={todo} key={todo._id}/>
              }
            })
          }
        </ul>
      </section>
    )
  }
}

Todos.propTypes = {
  todos: React.PropTypes.array,
  changeAllState: React.PropTypes.func,
};

const mapStateToProps = ({todos: {list: todos, status}}) => {
  return {
    todos,
    status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAllState(ids, completed){
      dispatch(TodoActions.changeAllState(ids, completed))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)