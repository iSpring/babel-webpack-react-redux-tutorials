import { combineReducers } from 'redux';
import asyncLoadComponentsStatus from './asyncLoadComponentsStatus';
import gitHub from './gitHub';
import stackOverflow from './stackOverflow';

const reducer = combineReducers({
  asyncLoadComponentsStatus,
  gitHub,
  stackOverflow
});

export default reducer;