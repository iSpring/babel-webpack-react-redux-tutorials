import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import GitHubSearch from './components/GitHubSearch';
import * as gitHubActions from './actions/GitHub';
import StackOverflowSearch from './components/StackOverflowSearch';
import * as stackOverflowActions from './actions/StackOverflow';
import reducer from './reducers';
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

const onStackOverflowInputChange = (keyword) => {
  var action = stackOverflowActions.stackOverflowInputChange(keyword);
  store.dispatch(action);
};

const onStackOverflowSearch = (keyword) => {
  //the action here is a function
  var action = stackOverflowActions.stackOverflowFetchData(keyword);
  store.dispatch(action);
};

const render = () => {
  var {gitHub, stackOverflow} = store.getState();
  ReactDOM.render(
    <div>
      <GitHubSearch keyword={gitHub.keyword} loading={gitHub.loading} items={gitHub.items} onInputChange={onGitHubInputChange} onSearch={onGitHubSearch} />
      <StackOverflowSearch keyword={stackOverflow.keyword} loading={stackOverflow.loading} items={stackOverflow.items} onInputChange={onStackOverflowInputChange} onSearch={onStackOverflowSearch} />
    </div>,
    document.getElementById('root')
  );
};

render();

store.subscribe(render);