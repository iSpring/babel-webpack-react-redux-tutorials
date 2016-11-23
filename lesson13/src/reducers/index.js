import * as actions from '../actions';//<=> import actions from '../actions/index.js';

const defaultState = {
  keyword: '',
  items: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.ACTION_SEARCH:
      console.log(action);
      return Object.assign({}, state, {
        keyword
      });
    default:
      return state;
  }
};

export default reducer;