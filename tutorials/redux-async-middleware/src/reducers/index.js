import * as actions from '../actions';//<=> import actions from '../actions/index.js';

const defaultState = {
  keyword: '',
  loading: false,
  items: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.ACTION_INPUT_CHANGE:
      // return Object.assign({}, state, {
      //   keyword: action.keyword
      // });
      return {
        ...state,
        keyword: action.keyword
      };
    case actions.ACTION_FETCH_DATA:
      // return Object.assign({}, state, {
      //   loading: true,
      //   items: []
      // });
      return {
        ...state,
        loading: true,
        items: []
      };
    case actions.ACTION_FETCH_SUCCESS:
      // return Object.assign({}, state, {
      //   loading: false,
      //   items: action.items
      // });
      return {
        ...state,
        loading: false,
        items: action.items
      };
    case actions.ACTION_FETCH_FAILURE:
      // return Object.assign({}, state, {
      //   loading: false,
      //   items: action.items
      // });
      return {
        ...state,
        loading: false,
        items: action.items
      };
    default:
      return state;
  }
};

export default reducer;