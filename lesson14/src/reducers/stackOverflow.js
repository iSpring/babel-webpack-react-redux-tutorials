import * as stackOverflowActions from '../actions/stackOverflow';

//StackOverflow state
const defaultState = {
  keyword: '',
  loading: false,
  items: []
};

const stackOverflowReducer = (state = defaultState, action) => {
  switch(action.type){
    //StackOverflow actions
    case stackOverflowActions.ACTION_STACKOVERFLOW_INPUT_CHANGE:
      return {
        ...state,
        keyword: action.keyword
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_DATA:
      return {
        ...state,
        loading: true,
        items: []
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      };
    case stackOverflowActions.ACTION_STACKOVERFLOW_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        items: []
      };
    //default
    default:
      return state;
  }
};

export default stackOverflowReducer;