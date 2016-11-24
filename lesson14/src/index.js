import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import GitHubSearch from './components/GitHubSearch';
import reducer from './reducers';
import * as gitHubActions from './actions/GitHub';
import logger from './middlewares/Logger';

var enhancer = applyMiddleware(thunk);

const store = createStore(reducer, enhancer);

const onGitHubInputChange = (keyword) => {
  var action = gitHubActions.gitHubInputChange(keyword);
  store.dispatch(action);
};

const onGitHubSearch = (keyword) => {
  //the action here is a function
  var action = gitHubActions.gitHubFetchData(keyword);
  store.dispatch(action);
};

const render = () => {
  var {keyword, loading, items} = store.getState();
  ReactDOM.render(
    <GitHubSearch keyword={keyword} loading={loading} items={items} onInputChange={onGitHubInputChange} onSearch={onGitHubSearch} />,
    document.getElementById('root')
  );
};

render();

store.subscribe(render);