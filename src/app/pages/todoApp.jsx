import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import '../styles/common.less';
import './todoApp.less';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Todos from '../components/todos.jsx';
import TodosActions from '../actions/todos';

class TodoApp extends React.Component {

  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount(){
    this.props.getTodos();
  }

  render() {
    return (
      <section className="todoapp">
        <Header/>
        <Todos/>
        <Footer/>
      </section>
    )
  }
}

TodoApp.propTypes = {
  getTodos: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => {
      dispatch(TodosActions.getTodos())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
