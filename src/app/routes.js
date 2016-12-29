import React from 'react';
import {Route} from 'react-router';
import TodoApp from './pages/todoApp.jsx';

const routes = (() => {
  return (
    <Route path="/" component={TodoApp}>
    </Route>
  )
})();

export default routes;
