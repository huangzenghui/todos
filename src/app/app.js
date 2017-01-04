import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import asyncAwait from 'redux-async-await';
import logger from 'redux-logger'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import routes from './routes';
import reducers from './reducers';
import './styles/common.less';

const middlewares = [
  asyncAwait,
  thunk,
];

if(process.env.NODE_ENV !== 'production'){
  middlewares.push(logger())
}

const store = applyMiddleware(...middlewares)(createStore)(combineReducers({
  ...reducers,
  routing: routerReducer
}));


// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   }),
//   applyMiddleware(thunk)
// )

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
