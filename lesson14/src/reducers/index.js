import * as gitHubActions from '../actions/GitHub';

const defaultState = {
  keyword: '',
  loading: false,
  items: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case gitHubActions.ACTION_GITHUB_INPUT_CHANGE:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    case gitHubActions.ACTION_GITHUB_FETCH_DATA:
      return Object.assign({}, state, {
        loading: true,
        items: []
      });
    case gitHubActions.ACTION_GITHUB_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        items: action.items
      });
    case gitHubActions.ACTION_GITHUB_FETCH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        items: action.items
      });
    default:
      return state;
  }
};

export default reducer;