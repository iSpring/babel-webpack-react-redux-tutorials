import * as actions from '../actions';//<=> import actions from '../actions/index.js';

const defaultState = {
  keyword: '',
  items: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.ACTION_INPUT_CHANGE:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    case actions.ACTION_SEARCH:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    default:
      return state;
  }
};

export default reducer;