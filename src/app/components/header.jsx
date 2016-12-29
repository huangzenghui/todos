import React from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import './header.less';
import TodoActions from '../actions/todos';

class Header extends React.Component {

  constructor(props){
    super(props);
    this.submitHandle = this.submitHandle.bind(this);
  }

  submitHandle(e){
    e.preventDefault();
    const {addTodo} = this.props;
    const input = ReactDOM.findDOMNode(this.refs.newTodo);
    addTodo && addTodo(input.value);
    input.value = '';
  }

  render() {
    return (
      <form className="header" onSubmit={this.submitHandle}>
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?"
         ref='newTodo' defaultValue=""/>
      </form>
    )
  }
}

Header.propTypes = {
  addTodo: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo(text){
      dispatch(TodoActions.addTodo(text))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
