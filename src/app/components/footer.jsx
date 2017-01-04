import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './footer.less';
import TodoActions from '../actions/todos';

class Footer extends React.Component {

  constructor(props){
    super(props);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  switchStatus(status, e){
    e.preventDefault();
    const {switchStatus} = this.props;
    switchStatus && switchStatus(status);
  }

  clearCompleted(){
    const {todos, clearCompleted} = this.props;
    const completedIds = [];
    for(const todo of todos){
      if(todo.complete){
        completedIds.push(todo._id);
      }
    }
    completedIds.length > 0 && clearCompleted && clearCompleted(completedIds);
  }

  render() {
    const {todos, status} = this.props;
    const index = todos.findIndex(todos => todos.complete);
    const hasCompleted = index !== -1;
    return (
      <footer className="footer">
        <span className="todo-count"><i>{todos.length}</i> items left</span>
        <ul className="filters">
          <li><a href="#" className={status==='all' ? 'selected' : ''} onClick={this.switchStatus.bind(this, 'all')}>All</a></li>
          <li><a href="#" className={status==='active' ? 'selected' : ''} onClick={this.switchStatus.bind(this, 'active')}>Active</a></li>
          <li><a href="#" className={status==='completed' ? 'selected' : ''} onClick={this.switchStatus.bind(this, 'completed')}>Completed</a></li>
        </ul>
        {hasCompleted && <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>}
      </footer>
    )
  }
}

Footer.propTypes = {
  todos: React.PropTypes.array,
  clearCompleted: React.PropTypes.func,
  switchStatus: React.PropTypes.func,
};

const mapStateToProps = ({todos: {list, status}}) => {
  return {
    todos: list,
    status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCompleted(ids){
      dispatch(TodoActions.remove(ids))
    },
    switchStatus(status){
      dispatch(TodoActions.switchStatus(status))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
