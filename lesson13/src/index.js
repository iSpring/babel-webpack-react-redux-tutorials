import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import GitHubSearch from './components/GitHubSearch';
import reducer from './reducers';
import * as actions from './actions';
import logger from './middlewares/Logger';

var enhancer = applyMiddleware(logger, thunk);

const store = createStore(reducer, enhancer);

const onInputChange = (keyword) => {
  var action = actions.inputChange(keyword);
  store.dispatch(action);
};

const onSearch = (keyword) => {
  var action = actions.search(keyword);
  store.dispatch(action);
};

const render = () => {
  var {keyword, loading, items} = store.getState();
  ReactDOM.render(
    <GitHubSearch keyword={keyword} loading={loading} items={items} onInputChange={onInputChange} onSearch={onSearch} />,
    document.getElementById('root')
  );
};

render();

store.subscribe(render);