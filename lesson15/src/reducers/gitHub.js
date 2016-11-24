import * as gitHubActions from '../actions/gitHub';

//GitHub state
const defaultState = {
  keyword: '',
  loading: false,
  items: []
};

const gitHubReducer = (state = defaultState, action) => {
  switch(action.type){
    //GitHub actions
    case gitHubActions.ACTION_GITHUB_INPUT_CHANGE:
      return {
        ...state,
        keyword: action.keyword
      };
    case gitHubActions.ACTION_GITHUB_FETCH_DATA:
      return {
        ...state,
        loading: true,
        items: []
      };
    case gitHubActions.ACTION_GITHUB_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      };
    case gitHubActions.ACTION_GITHUB_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        items: action.items
      };
    //default
    default:
      return state;
  }
};

export default gitHubReducer;